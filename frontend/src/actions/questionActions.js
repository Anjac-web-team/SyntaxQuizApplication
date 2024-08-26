import axios from 'axios'
import { message } from 'antd'
import {setQuestionState,setResetQuestionState} from '../slices/AdminSlice'
import {setCurrentQuestionState} from '../slices/CurrentQuestionSlice'
import {setUserAuthState} from '../slices/AuthSlice'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const addQuestion = async (dispatch,data) => {
    let status = false
    await axios.post(`${BACKEND_URL}/api/questions/addquestion`, data, { withCredentials: true }).then((res) => {
        message.success(`${res.data.message} 🥳`)
        getQuestions(dispatch)
        status = true
    }).catch((err) => {
        message.error(`${err.response.data.message} 🥱`)
        status = false
    })
    return status
}

export const getQuestions = async (dispatch) => {
    let data = []
    await axios.get(`${BACKEND_URL}/api/questions/get-all-questions`, { withCredentials: true }).then((res) => {
        message.success(`${res.data.message} 🥳`)
        data = res.data.questions
        data=data.map((que)=>{
            return {...que,key:que.levelNo}
        })
    }).catch((err) => {
        message.error(`${err.response.data.message} 🥱`)
    })
    dispatch(setQuestionState(data))
}

export const deleteQuestionByLevelNo = async (dispatch,levelNo) => {
    await axios.delete(`${BACKEND_URL}/api/questions/deletequestion/?id=${levelNo}`, { withCredentials: true }).then((res) => {
        message.success(`${res.data.message} 🥳`)
        getQuestions(dispatch)
    }).catch((err) => {
        message.error(`${err.response.data.message} 🥱`)
    })
}

export const deleteAllQuestions=async(dispatch)=>{
    await axios.delete(`${BACKEND_URL}/api/questions/delete-all-questions`, { withCredentials: true }).then((res) => {
        message.success(`${res.data.message} 🥳`)
        dispatch(setResetQuestionState())
    }).catch((err) => {
        message.error(`${err.response.data.message} 🥱`)
    })
}

export const getQuestionByLevel=async(dispatch,levelNo)=>{
    await axios.get(`${BACKEND_URL}/api/questions/getquestion?id=${levelNo}`, { withCredentials: true }).then((res) => {
        dispatch(setCurrentQuestionState(res.data))
    }).catch((err) => {
        message.error(`${err.response.data.error} 🥱`)
    })
}

export const evaluateQuestion=async(dispatch,data)=>{
    await axios.post(`${BACKEND_URL}/api/questions/evaluate-question`,data, { withCredentials: true }).then((res) => {
        message.success(`${res.data.message}`)
        dispatch(setUserAuthState(res.data?.updatedUser))
        return true
    }).catch((err) => {
        message.error(`${err.response.data.error} 🥱`)
        return false
    })
}
