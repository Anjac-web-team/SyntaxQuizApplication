import React, { useEffect, useState } from "react";
import { message, Tabs } from 'antd'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import AddQuestion from "./Admin/AddQuestion";
import ManageQuestion from "./Admin/ManageQuestion";
import Settings from "./Admin/Settings";
import Dashboard from "./Admin/Dashboard";
import LeaderBoard from "./Admin/LeaderBoard";
import { logoutAdmin } from "../actions/adminActions";
import { getQuestions } from "../actions/questionActions";
import { getGameStatus } from "../actions/settingsActions";
import {getAllUsers} from '../actions/userActions'
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { AiFillFileAdd } from "react-icons/ai";
import { MdManageHistory } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { TbSettings2 } from "react-icons/tb";
import { PiCertificate } from "react-icons/pi";
function AdminDashboard() {
    const [messageApi, ContextHolder] = message.useMessage()
    const[active,setActive]=useState("6")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function fetchData(){
        await getQuestions(dispatch)
        await getGameStatus(dispatch)
        await getAllUsers(dispatch)
    }
    useEffect(()=>{
        fetchData()
    },[])
    const handleLogout = () => {
        logoutAdmin(dispatch, navigate)
    }
    const onTabChange=(key)=>{
        setActive(key)
    }
    const tabItems = [
        {
            key: "1",
            label: "Dashboard",
            children: <Dashboard/>,
            icon:<MdDashboard/>
        },
        {
            key: "2",
            label: "Add Question",
            children: <AddQuestion setKey={setActive}/>,
            icon:<AiFillFileAdd/>
        },
        {
            key: "3",
            label: "Manage Question",
            children: <ManageQuestion key={active}/>,
            icon:<MdManageHistory/>
        },
        {
            key: "4",
            label: "Leaderboard",
            children: <LeaderBoard/>,
            icon:<MdLeaderboard/>
        },
        {
            key: "5",
            label: "Certificate",
            children: <h1>Certificate</h1>,
            icon:<PiCertificate/>
        },
        {
            key: "6",
            label: "Settings",
            children: <Settings/>,
            icon:<TbSettings2/>
        }
    ]
    return (
        <div className="w-full">
            {ContextHolder}
            <div className="w-full px-8 py-5 bg-[#151515] flex justify-between items-center">
                {/* <h1 className="text-xl font-inter font-bold text-[#0284c7]">Hello Admin 👋</h1>
                    <p className="text-white font-inter text-xs mt-1">Have a great day ahead. 🤓</p> */}
                <h1 className="text-4xl font-primary text-[#0284c7]">Syntax Cracker</h1>
                <div className="bg-[#0284c7] p-2 rounded-2xl hover:bg-[#f00]" onClick={handleLogout}>
                    <IoLogOut className="text-white text-xl" />
                </div>
            </div>
            <div className="w-full px-5 mt-5">
                <Tabs activeKey={active} items={tabItems} onChange={onTabChange} />
            </div>
        </div>
    )
}

export default AdminDashboard;