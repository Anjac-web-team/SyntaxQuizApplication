import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    registerNo: {
        type: String,
        unique: true,
        required: true,
        uppercase:true
    },
    section: {
        type: String,
        required: true,
    },
    levelNo: {
        type: Number,
        default: 1,
    },
    createdAt: {
        type: Number
    },
    score: {
        type: Number,
        default: 0,
    },
    updatedAt:{
        type:Number
    }
});

const User = mongoose.model("User",userSchema);
export default User;