
import User from '../models/user.model.js'
import generateTokenAndSendCookie from '../utils/generateTokenAndSendCookie.js';


export const register = async (req, res) => {
    try {
        const { name, registerNo, section } = req.body;
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
            submitTime: Date.now(),
            level: 1,
            score: 0
        });

        if (newUser) {
            generateTokenAndSendCookie(newUser, res);
            await newUser.save();
            res.status(201).json({
                name: newUser.name,
                registerNo: newUser.registerNo,
                section: newUser.section,
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


export const updateUser = async(user,res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
        if(updateUser){
            generateTokenAndSendCookie(user,res);
            res.status(200).json({ message: 'User updated successfully' });
        }else{
            res.status(400).json({ error: "User not found" });
        }
    }catch(error){
        console.log(`Error in updateUser : ${error}`);
        res.status(400).json({error:"Internal Server Error"});
    }
}
