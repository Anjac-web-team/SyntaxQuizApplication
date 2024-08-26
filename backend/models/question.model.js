import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    levelNo:{
        type:Number,
        required:true,
        unique:true,
    },
    description:{
        type:String
    },
    question:{
        type:String,
        required:true,
    },
    answers:{
        type:Object,
        required:true,
    },
    output:{
        type:String,
        required:true
    }
});

const Questions = mongoose.model("Questions",questionSchema);

export default Questions;