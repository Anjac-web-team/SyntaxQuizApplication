import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Dashboard() {
    const { questions, users } = useSelector((state) => state.admin)
    const{isStart,timer}=useSelector((state)=>state.gameStatus)
    const[points,setPoints]=useState(0)
    const[finishers,setFinishers]=useState(0)
    useEffect(()=>{
        setFinishers(users?.filter((user)=>{return user?.levelNo-1==questions.length}).length)
    },[users])
    useEffect(()=>{
        let point=0
        questions?.map((question)=>{
            point=point+Object.values(question?.answers).length
        })
        setPoints(point)
    },[questions])
    return (
        <div className="w-full px-4 mb-[84px]">
            <h1 className="text-[#00f] text-[18px] pt-4 font-inter">Dashboard</h1>
            <div className="py-5 w-100 flex flex-wrap gap-8 justify-center sm:justify-start border-b">
                <div className="relative px-4 py-4 w-[200px] h-[100px] bg-[#eff6ff] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Total Levels</h1>
                    <p className="my-1 text-lg font-inter text-right pe-5 pt-2">{questions?.length}</p>
                </div>
                <div className="relative px-4 py-4 w-[200px] h-[100px] bg-[#ccfbf1] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Total Points</h1>
                    <p className="my-1 text-lg font-inter text-right pe-5 pt-2">{points}</p>
                </div>
                <div className="relative px-4 py-4 w-[200px] h-[100px] bg-[#ffe4e6] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Registered Users</h1>
                    <p className="my-1 text-lg font-inter text-right pe-5 pt-2">{users?.length}</p>
                </div>
                <div className="relative px-4 py-4 w-[200px] h-[100px] bg-[#f3e8ff] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Finishers</h1>
                    <p className="my-1 text-lg font-inter text-right pe-5 pt-2">{finishers}</p>
                </div>
                <div className="relative px-4 py-4 w-[200px] h-[100px] bg-[#d1fae5] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Cracking Users</h1>
                    <p className="my-1 text-lg font-inter text-right pe-5 pt-2">{users?.length-finishers}</p>
                </div>
            </div>
            <div className="py-5 w-100 flex flex-wrap gap-8 justify-center sm:justify-start">
                <div className="relative px-4 py-4 w-[200px] h-[100px] bg-[#dcfce7] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Event Status</h1>
                    <p className="my-1 text-lg font-inter text-right pe-5 pt-2">{isStart?"Started":"Not started"}</p>
                </div>
                <div className="relative px-4 py-4 w-[200px] h-[100px] bg-[#dcfce7] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Duration</h1>
                    <p className="my-1 text-lg font-inter text-right pe-5 pt-2">{milliSecondsToDuration(timer)}</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

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

