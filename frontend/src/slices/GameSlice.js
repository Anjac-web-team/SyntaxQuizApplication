import {createSlice} from '@reduxjs/toolkit'

export const GameSlice=createSlice({
    name:"game",
    initialState:{
        isStart:false,
        isEnd:false,
        message:""
    },
    reducers:{
        setEventSuccessState:(state)=>{
            return{
                ...state,
                isStart:true
            }
        },
        setEventFailureState:(state,action)=>{
            return{
                ...state,
                isStart:false,
                message:action.payload
            }
        },
        setEventEndState:(state)=>{
            return{
                ...state,
                isEnd:true
            }
        },
        setEventResetState:(state)=>{
            return{
                ...state,
                isStart:false,
                message:""
            }
        }
    }
})

export default GameSlice.reducer
export const{setEventFailureState,setEventResetState,setEventSuccessState,setEventEndState}=GameSlice.actions