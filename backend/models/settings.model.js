import mongoose from "mongoose";

const settingsSchema=new mongoose.Schema({
    settingsId:{
        type:Number,
        default:1,
        unique:true
    },
    isStart:{
        type:Boolean,
        default:false
    },
    timer:{
        type:Number,
        default:""
    }

})

const Settings=mongoose.model("Settings",settingsSchema)

export default Settings