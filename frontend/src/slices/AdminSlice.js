import { createSlice } from "@reduxjs/toolkit";

export const AdminSlice=createSlice({
    name:"admin",
    initialState:{
        "questions":[],
        "users":[]
    },
    reducers:{
        setQuestionState:(state,action)=>{
            return{
                ...state,
                questions:action.payload
            }
        },
        setUserState:(state,action)=>{
            return{
                ...state,
                users:action.payload
            }
        },setResetUserState:(state)=>{
            return{
                ...state,
                users:[]
            }
        },
        setResetQuestionState:(state)=>{
            return{
                ...state,
                questions:[]
            }
        }
    }
})

export default AdminSlice.reducer;
export const{setQuestionState,setUserState,setResetQuestionState,setResetUserState}=AdminSlice.actions