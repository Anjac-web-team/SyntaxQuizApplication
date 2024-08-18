import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getQuestions } from '../../actions/questionActions'

function ManageQuestion() {
    const [questions, setQuestions] = useState([])
    const columns = [
        {
            title: 'Level Number',
            dataIndex: 'levelNo',
            key: 'levelNo',
        },
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question'
        },
        {
            title: 'Answer',
            dataIndex: 'answers',
            key: 'answers',
        },
        {
            title: "Action",
            dataIndex: "levelNo",
            key: "levelNo"
        }
    ];
    useEffect(() => {
        fetchQuestion()
    }, [])
    useEffect(() => {
        console.log(questions)
    }, [questions])
    const fetchQuestion = async () => {
        const res = await getQuestions()
        setQuestions(res)
    }
    return (
        <div className="w-full px-4 mb-[84px]">
            <h1 className="text-[#00f] text-[18px] pt-4 font-inter">Manage Questions</h1>
        </div>
    )
}

export default ManageQuestion;