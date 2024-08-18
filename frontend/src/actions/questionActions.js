import axios from 'axios'
import { message } from 'antd'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const addQuestion = async (data) => {
    let status = false
    await axios.post(`${BACKEND_URL}/api/questions/addquestion`, data, { withCredentials: true }).then((res) => {
        message.success(`${res.data.message} 🥳`)
        status = true
    }).catch((err) => {
        message.error(`${err.response.data.message} 🥱`)
        status = false
    })
    return status
}

export const getQuestions = async () => {
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
    return data
}