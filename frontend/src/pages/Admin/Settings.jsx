import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TimePicker, Switch, Button, message, Popconfirm } from "antd";
import { updateStatus, updateTimer } from '../../actions/settingsActions'
import { deleteAllQuestions } from "../../actions/questionActions";
import { deleteAllUsers } from "../../actions/userActions";

function Settings() {
    const isStart = useSelector((state) => state.gameStatus.isStart)
    const timer = useSelector((state) => state.gameStatus.timer)
    const [newIsStart, setNewIsStart] = useState(isStart)
    const [newTimer, setNewTimer] = useState("")
    useEffect(() => {
        setNewIsStart(isStart)
    }, [isStart])

    useEffect(() => {
        setNewTimer(timer)
    }, [timer])

    const dispatch = useDispatch()
    const handleUpdateStatus = async () => {
        if (newIsStart != isStart) {
            updateStatus(dispatch, newIsStart)
            setNewIsStart("")
        }
        else {
            message.error("Everything is up-to-date ✅")
        }
    }
    const handleUpdateTimer = async () => {
        console.log(newTimer)
        if (newTimer != timer) {
            updateTimer(dispatch, newTimer)
            setNewTimer("")
        }
        else
            message.error("Everything is up-to-date ✅")
    }
    const confirmDeleteUsers = (e) => {
        deleteAllUsers(dispatch)
      };
      const confirmDeleteQuestions = (e) => {
        deleteAllQuestions(dispatch)
      };
      const cancel = (e) => {
        message.error('Action Stopped');
      };
    return (
        <div className="w-full px-4 mb-[84px]">
            <h1 className="text-[#00f] text-[18px] pt-4 font-inter">Settings</h1>
            <div className="py-5 flex flex-wrap gap-12">
                <div className="relative px-4 py-4 w-[300px] h-[150px] bg-[#eff6ff] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Quiz Status</h1>
                    <p className="my-1 text-xs font-inter">Turn on to start the quiz</p>
                    <Switch className="my-3" checkedChildren="On" unCheckedChildren="Off" value={newIsStart} onChange={(checked) => {
                        setNewIsStart(checked)
                    }} />
                    <Button className="absolute bottom-5 right-5" type="primary" size="small" onClick={handleUpdateStatus}>Update</Button>
                </div>
                <div className="relative px-4 py-4 w-[300px] h-[150px] bg-[#eff6ff] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Timer</h1>
                    <p className="my-1 text-xs font-inter">Set timer for auto submit when quiz ends</p>
                    <TimePicker className="my-3" placeholder={newTimer != null ? milliSecondsToDuration(newTimer) : "00:00:00"} onChange={(date, dateString) => {
                        setNewTimer(durationToMilliSeconds(dateString))
                    }} />
                    <Button className="absolute bottom-5 right-5" type="primary" size="small" onClick={handleUpdateTimer}>Update</Button>
                </div>
            </div>
            <h1 className="text-[#00f] text-[18px] pt-4 font-inter">Danger Zone</h1>
            <div className="py-5 flex flex-wrap gap-12">
                <div className="relative px-4 py-4 w-[300px] h-[140px] bg-[#fef2f2] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px] text-[#b91c1c]">Reset Users</h1>
                    <p className="my-1 text-xs font-inter">All current users will be deleted</p>
                    <Popconfirm
                        title="Delete the users"
                        description="Are you sure to delete the users?"
                        onConfirm={confirmDeleteUsers}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="mt-4" type="primary" danger>Delete</Button>
                    </Popconfirm>
                </div>
                <div className="relative px-4 py-4 w-[300px] h-[140px] bg-[#fef2f2] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px] text-[#b91c1c]">Reset Questions</h1>
                    <p className="my-1 text-xs font-inter">All current questions will be deleted</p>
                    <Popconfirm
                        title="Delete the questions"
                        description="Are you sure to delete the questions?"
                        onConfirm={confirmDeleteQuestions}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="mt-4" type="primary" danger>Delete</Button>
                    </Popconfirm>
                </div>
            </div>
        </div>
    )
}

export default Settings;

const durationToMilliSeconds = (dateString) => {
    let arr = dateString.split(":")
    let hrs = Number(arr[0]) * 60 * 60 * 1000
    let mins = Number(arr[1]) * 60 * 1000
    let sec = Number(arr[2]) * 1000
    return hrs + mins + sec
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
    return (`${hrs ? formartter(hrs) : "00"}:${mins ? formartter(mins) : "00"}:${sec ? formartter(sec) : "00"}`)
}

const formartter = (value) => {
    if (String(value).length == 1)
        return `0${value}`
    else
        return value
}