import Admin from "../models/admin.model.js";
import bcrypt from 'bcrypt';
import generateTokenAndSendCookie from "../utils/generateTokenAndSendCookie.js";

export const adminSignup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (admin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            username,
            password:hashPassword
        });

        if (newAdmin) {
            await newAdmin.save();
            res.status(200).json({ message: "Admin created Successfully" })
        }

    } catch (err) {
        console.log(`Error in Admin SignUp : ${err}`);
        res.status(400).json({ error: "Internal Server Error." })
    }
};


export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(400).json({ message: "Admin not found" });
        }

        const validPassword = await bcrypt.compare(password, admin.password);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const payload = {
            id: admin._id,
            username: admin.username,
            role: 'admin'
        }
        generateTokenAndSendCookie(payload,res);
        res.status(200).json({ message: "Admin logged in Successfully" })

    } catch (err) {
        console.log(`Error in Admin Login : ${err}`);
        res.status(400).json({ error: "Internal Server Error." })
    }
};


export const adminLogout = async (req, res) => {
    try {
        res.cookie("User","",{maxAge: 0});
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        res.status(400).json({ error: "Internal Server Error" });
        console.log("Error in admin logout controller", error.message);
    }
}