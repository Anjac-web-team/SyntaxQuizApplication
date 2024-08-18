import React, { useEffect, useState } from "react";
import { Input, Button, Drawer, Space, Form, message, Divider, Image } from 'antd'
import QuestionView from "../components/QuestionView";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { HiOutlineDocumentAdd } from "react-icons/hi";

import { addQuestion } from "../../actions/questionActions";

const { TextArea } = Input

function AddQuestion({ setKey }) {
    const [level, setLevel] = useState("")
    const [description, setDescription] = useState("")
    const [output, setOutput] = useState("")
    const [open, setOpen] = useState(false)
    const [question, setQuestion] = useState('')
    const [newLine, setNewLine] = useState("\\n$#$")
    const [openMenu, setOpenMenu] = useState("")
    const [tab, setTab] = useState("")
    const [input, setInput] = useState("")
    const [text, setText] = useState("")
    const [quesLine, setQuesLine] = useState([])
    const [answer, setAnswer] = useState({})
    const onClose = () => {
        setOpen(false)
        setNewLine("\\n$#$")
        setOpenMenu("")
        setTab("")
        setInput("")
        setText("")
        setQuesLine("")
    }
    const handleReset = () => {
        setLevel("")
        setDescription("")
        setOutput("")
        setOpen(false)
        setQuestion("")
        setNewLine("\\n$#$")
        setOpenMenu("")
        setTab("")
        setInput("")
        setText("")
        setQuesLine([])
    }
    const handleSubmit = () => {
        if (level != "" && question != "" && answer != {} && output != "") {
            const data = { levelNo: level, question, answers: answer, description, output }
            const res = addQuestion(data)
            if (res) {
                handleReset()
                setKey("1")
            }
        }
        else
            message.warning("Please provide all details")

    }
    useEffect(() => {
        setQuesLine(newLine.split("$#$"));
    }, [newLine])
    return (
        <div className="w-full px-4 mb-[84px]">
            <h1 className="text-[#00f] text-[18px] pt-4 font-inter">Add New Question</h1>
            <div className="my-6 flex flex-wrap gap-5">
                <Input className="w-[200px] h-fit" placeholder="Level Number" type="number" min={1} value={level} onChange={(e) => { setLevel(e.target.value) }} />
                <label className="flex gap-2 items-center p-2 rounded-md border border-[#1677ff] h-fit" htmlFor="outputImg">
                    <AiOutlineCloudUpload className="text-lg text-[#1677ff]" />
                    <span className="text-[#1677ff]">Upload Output</span>
                </label>
                <input type="file" id="outputImg" accept="image/*" hidden onChange={(e) => {
                    imgToBase64(e.target.files[0], (res) => {
                        setOutput(res)
                    })
                }} />
                {
                    output && (
                        <Image width={120} src={output} />
                    )
                }
                <Button type="primary" icon={<IoMdAddCircleOutline />} onClick={() => { setOpen(true) }}>Add new line</Button>
                <TextArea placeholder="Descrition (If Any)" onChange={(e) => {
                    setDescription(e.target.value)
                }} />
            </div>
            <QuestionView question={question} answers={answer} setAnswers={setAnswer} output={output} />
            <Drawer
                title="Create an new line"
                width={720}
                onClose={onClose}
                open={open}
                maskClosable={false}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={() => {
                            setQuestion(question + newLine)
                            setNewLine("")
                            message.success("New line added...")
                            onClose()
                        }} type="primary">
                            Add
                        </Button>
                    </Space>
                }
            >
                <div className="w-full flex gap-5">
                    <Button type="primary" onClick={() => { setOpenMenu("tab") }}>Add Tab</Button>
                    <Button type="primary" onClick={() => { setOpenMenu("input") }}>Add Input</Button>
                    <Button type="primary" onClick={() => { setOpenMenu("text") }}>Add Text</Button>
                </div>
                <div className="py-12">
                    {
                        openMenu == "tab" ?
                            <Form>
                                <Input placeholder="Enter No. of Tabs : " type="number" min={0} onChange={(e) => {
                                    setTab(e.target.value.trim())
                                }} required />
                                <div className="w-full flex justify-end mt-3">
                                    <Button type="primary" onClick={() => {
                                        if (tab) {
                                            let temp = `@s${tab}$#$`;
                                            setNewLine(newLine + temp);
                                            setTab("")
                                            setOpenMenu("")
                                        }
                                        else
                                            message.warning("Please enter number of tabs")
                                    }}>Submit</Button>
                                </div>
                            </Form>
                            :
                            openMenu == "input" ?
                                <Form>
                                    <Input placeholder="Enter No. of Characters : " type="number" min={0} onChange={(e) => {
                                        setInput(e.target.value.trim())
                                    }} required />
                                    <div className="w-full flex justify-end mt-3">
                                        <Button type="primary" onClick={() => {
                                            if (input) {
                                                let temp = `#s${input}$#$`;
                                                setNewLine(newLine + temp);
                                                setInput("")
                                                setOpenMenu("")
                                            }
                                            else
                                                message.warning("Please enter number of characters")
                                        }}>Submit</Button>
                                    </div>
                                </Form>
                                :
                                openMenu == "text" ?
                                    <Form>
                                        <Input placeholder="Enter the text : " type="text" onChange={(e) => {
                                            setText(e.target.value)
                                        }} required />
                                        <div className="w-full flex justify-end mt-3">
                                            <Button type="primary" onClick={() => {
                                                if (text) {
                                                    let temp = `${text}$#$`;
                                                    setNewLine(newLine + temp);
                                                    setText("")
                                                    setOpenMenu("")
                                                }
                                                else
                                                    message.warning("Please enter the text")
                                            }}>Submit</Button>
                                        </div>
                                    </Form>
                                    :
                                    ""
                    }
                </div>
                <Divider />
                <p className="font-inter font-bold">Preview</p>
                <div style={{ margin: "8px auto" }}>
                    {quesLine != "" && quesLine.map((piece, j) => {
                        return (
                            <span style={{ width: "auto" }} key={j}>
                                {piece.startsWith("#s") ? (
                                    <input
                                        className="border border-[#ccc] px-1"
                                        style={{
                                            width: `${countWidth(piece)}px`,
                                            margin: "0px 4px",
                                        }}
                                        type="text"
                                        required
                                    />
                                ) : piece.startsWith("@s") ? (
                                    <span
                                        className="bg-[#f1f5f9]"
                                        style={{ paddingRight: `${countSpace(piece)}px` }}
                                    ></span>
                                ) : (
                                    <span>{piece}</span>
                                )}
                            </span>
                        );
                    })}
                </div>
            </Drawer>
            <div className="w-full fixed bg-white left-0 bottom-0 border-t py-5 px-4 flex justify-end gap-5">
                <Button type="primary" icon={<GrPowerReset />} danger onClick={handleReset}>Reset</Button>
                <Button type="primary" icon={<HiOutlineDocumentAdd />} onClick={handleSubmit}>Add Question</Button>
            </div>
        </div>
    )
}

const countSpace = (piece) => {
    return Number(piece.split("@s")[1]) * 16;
};

const countWidth = (piece) => {
    return Number(piece.split('#s')[1]) * 16;
};

const imgToBase64 = (file, callback) => {
    var reader = new FileReader();
    reader.onloadend = function () {
        callback(reader.result)
    };
    reader.readAsDataURL(file);
}


export default AddQuestion;