import { createSlice } from "@reduxjs/toolkit";

export const currentQuestionSlice=createSlice({
    name:"currentQuestionSlice",
    initialState:{
        noOfLevels:0,
        question:{}
    },
    reducers:{
        setCurrentQuestionState(state,action){
            return{
                ...state,
                noOfLevels:action.payload?.noOfLevels,
                question:action.payload?.question
            }
        }
    }
})

export const{setCurrentQuestionState}=currentQuestionSlice.actions
export default currentQuestionSlice.reducer;