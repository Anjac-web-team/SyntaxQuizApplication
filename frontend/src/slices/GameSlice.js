import {createSlice} from '@reduxjs/toolkit'

export const GameSlice=createSlice({
    name:"game",
    initialState:{
        isStart:false,
        timer:"",
    },
    reducers:{
        setEventStatusState:(state,action)=>{
            return{
                ...state,
                isStart:action.payload
            }
        },
        setEventTimerState:(state,action)=>{
            return{
                ...state,
                timer:action.payload
            }
        },
        setEventResetState:(state)=>{
            return{
                ...state,
                isStart:false,
                timer:""
            }
        }
    }
})

export default GameSlice.reducer
export const{setEventResetState,setEventStatusState,setEventTimerState}=GameSlice.actions