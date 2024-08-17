import {createSlice} from '@reduxjs/toolkit'

export const AuthSlice=createSlice({
    name:"auth",
    initialState:{
        isAdmin:false,
        user:null
    },
    reducers:{
        setAdminAuthState:(state)=>{
            return{
                ...state,
                isAdmin:true,
            }
        },
        setAuthState:(state,action)=>{
            return{
                ...state,
                isAdmin:false,
                user:action.payload
            }
        },
        resetAuthState:(state)=>{
            return{
                isAdmin:false,
                user:null
            }
        }
    }
})

export default AuthSlice.reducer
export const {setAdminAuthState,setAuthState,resetAuthState}=AuthSlice.actions