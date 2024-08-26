import axios from 'axios'
import { message } from 'antd'
import { setAdminAuthState, resetAuthState } from '../slices/AuthSlice'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const isAdminLoggedIn = async (dispatch, navigate) => {
    await axios.get(`${BACKEND_URL}/api/admin/`, { withCredentials: true }).then((res) => {
        message.success(`${res.data.message} 🥳`)
        dispatch(setAdminAuthState())
        navigate('/admin')
    }).catch((err) => {

    })
}

export const loginAdmin = async (dispatch, navigate, data) => {
    await axios.post(`${BACKEND_URL}/api/admin/login`, data, { withCredentials: true }).then((res) => {
        message.success(`${res.data.message} 🥳`)
        dispatch(setAdminAuthState())
        navigate('/admin')
    }).catch((err) => {
        message.error(`${err.response.data.message} 🥱`)
    })
}

export const logoutAdmin = async (dispatch, navigate) => {
    await axios.get(`${BACKEND_URL}/api/admin/logout`, { withCredentials: true }).then((res) => {
        message.success(`${res.data.message} 🥳`)
        dispatch(resetAuthState())
        navigate('/')
    }).catch((err) => {
        message.error(`${err.response.data.message} 🥱`)
    })
}