import React, { useEffect, useState } from "react";
import QuestionView from "./components/QuestionView";
import { Button, message } from "antd";
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getQuestionByLevel, evaluateQuestion } from '../actions/questionActions';
import {logoutAdmin} from '../actions/adminActions'
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { PiCoinVerticalFill } from "react-icons/pi";

function UserMain() {
    const [timerRemaining, setTimerRemaining] = useState("00:00:00")
    const [finished, setFinished] = useState(false)
    const { user } = useSelector((state) => state.auth)
    const { timer } = useSelector((state) => state.gameStatus)
    const { question, noOfLevels } = useSelector((state) => state.currentQuestion)
    const [answers, setAnswers] = useState({})
    const dispatch = useDispatch()
    const navigate=useNavigate()
    useEffect(() => {
        setInterval(() => {
            let value=milliSecondsToDuration((Number(user?.createdAt) - Date.now()) + timer)
            setTimerRemaining(value)
            if(value=="00:30:00")
                message.info("30 Minutes more...")
            if(value=="00:05:00")
                message.warning("Hurry up..! 5 Minutes left")
            if(value=="00:01:00")
                message.warning("Auto submit in 1 Minute")
            if(value=="00:00:00"){
                handleSubmit()
                handleLogout()
            }
        }, 1000)
    }, [user])
    useEffect(() => {
        getQuestionByLevel(dispatch, user?.levelNo)
    }, [user])
    useEffect(() => {
        if (noOfLevels != 0 && noOfLevels == user?.levelNo - 1)
            setFinished(true)
    }, [noOfLevels, user])

    const handleSubmit = async () => {
        if (Object.values(answers).length == question?.points) {
            const data = { levelNo: question?.levelNo, answers, updatedAt: Date.now() }
            const res = await evaluateQuestion(dispatch, data)
            if (res) {
                getQuestionByLevel(dispatch, user?.levelNo)
                setAnswers({})
            }
        }
        else
            message.error("Please fill all fields")
    }
    const handleLogout=()=>{
        logoutAdmin(dispatch,navigate)
    }
    return (
        <div className="w-full relative" style={{ height: "100vh" }}>
            {
                !finished ?
                    <div>
                        <div className="w-full py-5 flex items-center flex-wrap gap-4 justify-evenly border-b">
                            <h1 className="text-lg font-inter text-[#00f]">Hello {user?.name} 👋</h1>
                            <h1 className="border px-7 py-2 rounded-md border-[#2563eb] text-[#2563eb] bg-[#eff6ff] font-inter">Level {user?.levelNo}</h1>
                            <h1 className="border px-7 py-2 rounded-md border-[#3f6212] text-[#16a34a] bg-[#dcfce7] font-inter">{timerRemaining}</h1>
                            <div className="py-2 rounded-xl px-4 bg-[#000aff] flex items-center gap-2">
                                <PiCoinVerticalFill className="text-[#facc15] text-xl"/>
                                <p className="text-[#fff] font-inter font-medium">{user?.score}</p>
                            </div>
                        </div>
                        <div className="sm:px-12 px-4 py-3 flex justify-between font-inter">
                            <h1>Fill the missing part of code</h1>
                            <h1>Points : {question?.points || 0}</h1>
                        </div>
                        <div className="sm:px-12 px-4 border-b pb-4">
                            <p className="text-[#64748b] text-sm font-inter font-medium">{question?.description}</p>
                        </div>
                        <div className="sm:px-12 px-4 mb-[80px]">
                            <QuestionView setAnswers={setAnswers} answers={answers} output={question?.output} question={question?.question} />
                        </div>
                        <div className="absolute bottom-0 sm:px-12 px-4 py-5 border-t w-full gap-4 flex justify-end">
                            <Button type="primary" onClick={handleSubmit}>Submit</Button>
                        </div>
                    </div>
                    :
                    <div className="w-100 h-[100%] flex justify-center items-center">
                        <div className="sm:w-[600px] rounded-2xl gap-8 w-[300px] drop-shadow-md bg-[#ecfeff] py-16 flex flex-col items-center">
                            <IoCheckmarkDoneOutline className="text-5xl text-[#2563eb]" />
                            <h1 className="text-2xl font-inter font-bold text-[#2563eb]">Thanks for Submitting ! 😇</h1>
                            <h1 className="font-inter">Your answers were recorded !</h1>
                            <Button type="primary" onClick={handleLogout}>Go Home</Button>
                        </div>
                    </div>
            }
        </div>
    )
}
export default UserMain;

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
    return (`${hrs ? formartter(hrs) : "00"}:${mins ? formartter(mins) : "00"}:${sec ? formartter(sec) : "00"}`)
}

const formartter = (value) => {
    if (String(value).length == 1)
        return `0${value}`
    else
        return value
}