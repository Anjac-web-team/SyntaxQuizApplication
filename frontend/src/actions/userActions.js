import axios from 'axios'
import { message } from 'antd'
import { setUserAuthState } from '../slices/AuthSlice'
import { setUserState,setResetUserState } from '../slices/AdminSlice'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const registerUser = async (dispatch, navigate, data) => {
    await axios.post(`${BACKEND_URL}/api/auth/register`, data, { withCredentials: true }).then((res) => {
        message.success(`${res.data.message} 🥳`)
        dispatch(setUserAuthState(res.data?.newUser))
        navigate('/quiz')
    }).catch((err) => {
        console.log(err)
        message.error(`${err.response.data.error} 🥱`)
    })
}

export const isUserLoggedIn = async (dispatch, navigate) => {
    await axios.get(`${BACKEND_URL}/api/auth/`, { withCredentials: true }).then((res) => {
        message.success(`${res.data.message} 🥳`)
        dispatch(setUserAuthState(res.data?.newUser))
        navigate('/quiz')
    }).catch((err) => {
        console.log(err)
    })
}

export const getAllUsers = async (dispatch) => {
    let data = []
    await axios.get(`${BACKEND_URL}/api/auth/getallusers`, { withCredentials: true }).then((res) => {
        message.success(`${res.data.message} 🥳`)
        data = res.data.users
        data=data.sort((user1,user2)=>{
            return user2.score-user1.score || user2.updatedAt-user1.updatedAt
        })
        data = data.map((user,index) => {
            return { ...user, key: index+1,duration:milliSecondsToDuration(user?.updatedAt-user?.createdAt) }
        })
    }).catch((err) => {
        message.error(`${err.response.data.message} 🥱`)
    })
    dispatch(setUserState(data))
}

export const deleteAllUsers=async(dispatch)=>{
    await axios.delete(`${BACKEND_URL}/api/auth/delete-all-user`, { withCredentials: true }).then((res) => {
        message.success(`${res.data.message} 🥳`)
        dispatch(setResetUserState())
    }).catch((err) => {
        message.error(`${err.response.data.message} 🥱`)
    })
}

const milliSecondsToDuration = (milliseconds) => {
    if (milliseconds >= 3600000) {
        var hrs = Math.floor(milliseconds / 3600000);
        milliseconds = milliseconds % 3600000
    }
    if (milliseconds >= 60000) {
        var mins = Math.floor(milliseconds / 60000)
        milliseconds = milliseconds % 60000
    }
    const sec = Math.floor(milliseconds / 1000)
    return(`${hrs?formartter(hrs):"00"}:${mins?formartter(mins):"00"}:${sec?formartter(sec):"00"}`)
}

const formartter=(value)=>{
    if(String(value).length==1)
        return `0${value}`
    else
        return value
}