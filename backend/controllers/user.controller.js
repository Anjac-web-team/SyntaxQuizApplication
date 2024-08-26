import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import generateTokenAndSendCookie from '../utils/generateTokenAndSendCookie.js';


export const isUserLoggedIn = async (req, res, next) => {
    const token = req.cookies.User;

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { user } = decoded
        const newUser = await User.findById(user._id)
        console.log(newUser)
        let newToken = generateTokenAndSendCookie(newUser);
        res.status(201).cookie("User", newToken, {
            expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "none",
            secure: true
        }).json({ newUser, message: "Welcome Back" })
    } catch (err) {
        res.status(403).json({ message: "Invalid or expired user token", error: err.message });
    }
}

export const register = async (req, res) => {
    try {
        const { name, registerNo, section, createdAt } = req.body;
        if (!name || !registerNo || !section) {
            return res.status(400).json({ error: 'Some missing values are there' });
        }

        const user = await User.findOne({ registerNo });

        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({
            name,
            registerNo,
            section,
            createdAt,
            updatedAt: createdAt,
            level: 1,
            score: 0
        });

        if (newUser) {
            await newUser.save();
            const token = generateTokenAndSendCookie(newUser);
            res.status(201).cookie("User", token, {
                expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: "none",
                secure: true
            }).json({
                newUser,
                message: "Registered Successfully"
            });
        }

    } catch (error) {
        console.log(`Error in User login : ${error}`);
        res.status(400).json({ error: "Internal Server Error" });
    }
};

export const deleteAllUser = async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).json({ message: 'All users deleted successfully' });
    } catch (error) {
        console.log(`Error in deleteAllUser : ${error}`);
        res.status(400).json({ error: "Internal Server Error" });
    }
};


export const updateUser = async (user, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
        if (updatedUser) {
            const token = generateTokenAndSendCookie(updatedUser);
            res.status(201).cookie("User", token, {
                expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: "none",
                secure: true
            }).json({
                updatedUser,
                message: "Level Upgraded 🔥"
            });
        } else {
            res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        console.log(`Error in updateUser : ${error}`);
        res.status(400).json({ error: "Internal Server Error" });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length > 0) {
            return res.status(200).json({ users, message: "Users fetched" });
        } else {
            return res.status(400).json({ message: "No users Found" });
        }
    } catch (error) {
        console.error(`Error in getAllUsers : ${error}`);
        res.status(400).json({ error: "Internal Server Error" });
    }
}