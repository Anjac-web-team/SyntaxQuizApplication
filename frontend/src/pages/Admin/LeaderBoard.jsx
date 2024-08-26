import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";

function LeaderBoard(){
    const{users}=useSelector((state)=>state.admin)
    const[data,setData]=useState([])
    useEffect(()=>{
        setData(users)
    },[users])
    const columns = [
        {
            title: 'Rank',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Roll Number',
            dataIndex: 'registerNo',
            key: 'registerNo',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Class',
            dataIndex: 'section',
            key: 'section',
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Level',
            dataIndex: 'levelNo',
            key: 'levelNo',
        },
        {
            title: 'Finished Time',
            dataIndex: 'duration',
            key: 'duration',
        },
    ];
    return(
        <div className="w-full px-4 mb-[84px]">
            <h1 className="text-[#00f] text-[18px] pt-4 font-inter">Leaderboard</h1>
            <Table className="my-5 max-w-[100%] overflow-x-scroll" dataSource={data} columns={columns} />
        </div>
    )
}
export default LeaderBoard;

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