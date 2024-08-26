import axios from "axios";
import { message } from "antd";
import {setEventResetState,setEventStatusState,setEventTimerState} from '../slices/GameSlice'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const getGameStatus=async(dispatch)=>{
    try{
        await axios.get(`${BACKEND_URL}/api/settings/`).then((res)=>{
            const {isStart,timer}=res.data?.result
            dispatch(setEventStatusState(isStart))
            dispatch(setEventTimerState(timer))
        })
    }catch(err){
        console.log(err)
    }
}

export const updateStatus=async(dispatch,data)=>{
    try{
        await axios.put(`${BACKEND_URL}/api/settings/updatestatus`,{isStart:data},{withCredentials:true}).then((res)=>{
            dispatch(setEventStatusState(data))
            message.success("Quiz status updated..🔥")
        })
    }catch(err){
        console.log(err)
    }
}

export const updateTimer=async(dispatch,data)=>{
    try{
        await axios.put(`${BACKEND_URL}/api/settings/updatetimer`,{timer:data},{withCredentials:true}).then((res)=>{
            dispatch(setEventTimerState(data))
            message.success("Timer updated..🔥")
        })
    }catch(err){
        console.log(err)
    }
}