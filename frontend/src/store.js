import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from './slices/AuthSlice'
import GameSlice from './slices/GameSlice'
export default configureStore({
    reducer:{
        auth:AuthSlice,
        gameStatus:GameSlice
    }
})