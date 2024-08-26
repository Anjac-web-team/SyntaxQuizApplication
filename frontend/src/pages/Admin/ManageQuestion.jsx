import React, { useEffect, useState } from "react";
import { Table, Drawer, Button, Popover } from "antd";
import { useDispatch } from "react-redux";
import { deleteQuestionByLevelNo } from "../../actions/questionActions";
import { useSelector } from "react-redux";
import { HiOutlineEye } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";

function ManageQuestion() {
    const [questions, setQuestions] = useState([])
    const fetchedQuestion = useSelector((state) => state.admin?.questions)
    const [open, setOpen] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState("")
    const [ques, setQues] = useState([])

    const dispatch=useDispatch()

    useEffect(() => {
        let lines = currentQuestion.split("\\n");
        let final = lines?.map((line) => {
            return line?.split("$#$");
        });
        setQues(final);
    }, [currentQuestion]);

    const formatAnswer = (answers) => {
        let ans = Object.values(answers)
        return (
            <div>
                {
                    ans?.map((answer, index) => {
                        return <p key={index}>{answer}</p>
                    })
                }
            </div>
        )
    }

    const handleQuestionDelete=(levelNo)=>{
        deleteQuestionByLevelNo(dispatch,levelNo)
    }

    const columns = [
        {
            title: 'Level Number',
            dataIndex: 'levelNo',
            key: 'levelNo',
        },
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
            render: (question) => <Button type="link" icon={<HiOutlineEye />} onClick={() => {
                setCurrentQuestion(question)
                setOpen(true)
            }}>Show Question</Button>
        },
        {
            title: 'Answer',
            dataIndex: 'answers',
            key: 'answers',
            render: (answers) => <Popover content={formatAnswer(answers)} title="Answers">
                <Button type="link">Hover me</Button>
            </Popover>
        },
        {
            title: "Points",
            dataIndex: "answers",
            key: "answers",
            render: (answers) => <p>{Object.keys(answers)?.length || 0}</p>
        },
        {
            title: "Action",
            dataIndex: "levelNo",
            key: "levelNo",
            render: (levelNo) => <Button type="link" icon={<FaRegTrashAlt />} danger onClick={()=>{handleQuestionDelete(levelNo)}}>Delete</Button>
        }
    ];
    const onClose = () => {
        setOpen(false)
        setCurrentQuestion("")
    }

    useEffect(()=>{
        setQuestions(fetchedQuestion)
    },[fetchedQuestion])

    return (
        <div className="w-full px-4 mb-[84px]">
            <h1 className="text-[#00f] text-[18px] pt-4 font-inter">Manage Questions</h1>
            <Table className="my-5 max-w-[100%] overflow-x-scroll" dataSource={questions} columns={columns} />
            <Drawer
                title={"Question"}
                placement="right"
                size={"large"}
                onClose={onClose}
                open={open}
            >
                <div>
                    {ques?.map((lines, i) => {
                        return (
                            <div style={{ margin: "8px auto" }} key={i}>
                                {lines?.map((piece, j) => {
                                    return (
                                        <span style={{ width: "auto" }} key={j}>
                                            {piece.startsWith("#s") ? (
                                                <input
                                                    className="border px-1"
                                                    style={{
                                                        width: `${countWidth(piece)}px`,
                                                        margin: "0px 4px",
                                                    }}
                                                    type="text"
                                                    readOnly
                                                    required
                                                />
                                            ) : piece.startsWith("@s") ? (
                                                <span
                                                    style={{ paddingRight: `${countSpace(piece)}px` }}
                                                ></span>
                                            ) : (
                                                <span>{piece}</span>
                                            )}
                                        </span>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </Drawer>
        </div>
    )
}

const countSpace = (piece) => {
    return Number(piece.split("@s")[1]) * 16;
};

const countWidth = (piece) => {
    return Number(piece.split('#s')[1]) * 16;
};

export default ManageQuestion;