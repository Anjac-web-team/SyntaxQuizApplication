import {configureStore, Tuple} from '@reduxjs/toolkit'
import AuthSlice from './slices/AuthSlice'
import GameSlice from './slices/GameSlice'
import AdminSlice from './slices/AdminSlice'
import CurrentQuestionSlice from './slices/CurrentQuestionSlice'
import { thunk } from 'redux-thunk'
export default configureStore({
    reducer:{
        auth:AuthSlice,
        gameStatus:GameSlice,
        admin:AdminSlice,
        currentQuestion:CurrentQuestionSlice
    },
    middleware:()=>new Tuple(thunk)
})