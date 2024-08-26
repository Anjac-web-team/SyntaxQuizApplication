import React from "react";
import {Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectRoute({ children }) {
    const{isAdmin}=useSelector((state)=>state.auth)
    const{user}=useSelector((state)=>state.auth)
    if(isAdmin)
        return children
    else if(user!=null)
        return children
    else
        return <Navigate to={"/"}/>
}

export default ProtectRoute;