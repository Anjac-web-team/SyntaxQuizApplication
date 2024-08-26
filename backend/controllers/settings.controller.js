import Settings from '../models/settings.model.js';

export const getGameStatus=async(req,res,next)=>{
    try{
        let result=await Settings.findOne({settingsId:1})
        if(result==null){
            result=await Settings.create({settingsId:1})
        }
        res.status(200).json({result,message:"Game status fetched"}) 
    }catch(err){
        res.status(500).json({
            message:"Failed to get game status"
        })
    }
}

export const updateQuizStatus=async(req,res,next)=>{
    const{isStart}=req.body
    try{
        const result=await Settings.updateOne({settingsId:1},{isStart},{upsert:true})
        res.status(200).json({
            message:"Quiz Status Updated"
        })
    }
    catch(error){
        res.status(500).json({
            message:error
        })
    }      
}

export const updateTimer=async(req,res,next)=>{
    const{timer}=req.body
    try{
        const result=await Settings.updateOne({settingsId:1},{timer},{upsert:true})
        res.status(200).json({
            message:"Timer Updated"
        })
    }
    catch(error){
        res.status(500).json({
            message:error
        })
    }      
}
