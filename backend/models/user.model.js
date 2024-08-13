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
    },
    section: {
        type: String,
        required: true,
    },
    levelNo: {
        type: Number,
        default: 1,
    },
    submitTime: {
        type: String,
        default: Date.now,

    },
    score: {
        type: Number,
        default: 0,
    }
},{timestamps:true});

const User = mongoose.model("User",userSchema);
export default User;