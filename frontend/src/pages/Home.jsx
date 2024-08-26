import React, { useEffect, useState } from "react";
import { message } from 'antd'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { loginAdmin, isAdminLoggedIn } from '../actions/adminActions'
import { registerUser, isUserLoggedIn } from '../actions/userActions'
import { getGameStatus } from "../actions/settingsActions";
import background from '../assets/background.jpg'


function Home() {
    const [name, setName] = useState("")
    const [registerNo, setRegisterNo] = useState("")
    const [section, setSection] = useState("1")

    const { isStart } = useSelector((state) => state.gameStatus)

    const [messageApi, ContextHolder] = message.useMessage()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleAdminLogin = () => {
        let username = prompt("Enter your username : ")
        let password = prompt("Enter your password : ")
        if (username != "" && password != "")
            loginAdmin(dispatch, navigate, { username, password })
        else
            message.warning("Please provide username and password")
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (name != "" && registerNo != "" && section != "1") {
            registerUser(dispatch, navigate, { name, registerNo, section, createdAt: Date.now() })
        }
        else
            message.error("Please provide all details")
    }
    useEffect(() => {
        isAdminLoggedIn(dispatch, navigate)
        isUserLoggedIn(dispatch, navigate)
        getGameStatus(dispatch)
    }, [])
    return (
        <div className="w-100 h-[100%]" style={{ backgroundImage: `url(${background})` }}>
            <div className="w-100 h-[100%] backdrop-blur-sm backdrop-brightness-50 md:flex px-5 md:px-10 py-5">
                {ContextHolder}
                <p className="absolute text-[#facc15] left-[50%] translate-x-[-50%] text-xs font-inter font-medium select-none" onDoubleClick={handleAdminLogin}>🤘 Double click here for admin login 🤘</p>
                <div className="md:w-[50%] w-[100%] md:h-[100%] h-[auto] flex gap-4 flex-col justify-center py-10">
                    <h1 className="text-6xl md:text-8xl font-primary text-[#0284c7] ">Syntax Cracker .🧑‍💻</h1>
                    <p className="text-xl text-[#65a30d] font-inter font-medium">Unlease The Power of Code !</p>
                    <span className="font-inter font-medium text-sm text-[#facc15] mt-2">
                        <span className="text-[#facc15]"> Crafted with 💻 and ☕ by : </span>
                        <a className="text-[#fff]" href="https://github.com/ThareefAhamed" target="_blank">Thareef</a>
                        <span> & </span>
                        <a className="text-[#fff]" href="https://github.com/BHS-Harish" target="_blank">BHS</a>
                        <span> 👻</span>
                    </span>
                </div>
                <div className="md:w-[50%] w-[100%] md:h-[100%] h-[auto] flex flex-col items-center justify-center py-10">
                    {
                        isStart ?
                            <form className="md:w-[80%] w-full" onSubmit={handleSubmit}>
                                <p className="text-3xl my-3 font-primary text-[#facc15] text-center"> 👉 Register to crack 👈</p>
                                <input className="my-2 rounded px-4 py-2 w-full outline-none border border-[#0284c7] hover:border-dashed b-none bg-[#151515] text-white" type="text" placeholder="Enter your rollno" value={registerNo} onChange={(e) => {
                                    setRegisterNo(e.target.value.trim().toUpperCase())
                                }} required />
                                <input className="my-4 rounded  px-4 py-2 w-full outline-none border border-[#0284c7] hover:border-dashed b-none bg-[#151515] text-white" type="text" placeholder="Enter your name" value={name} onChange={(e) => {
                                    setName(e.target.value)
                                }} required />
                                <select className="my-2 rounded  px-4 py-2 w-full outline-none border border-[#0284c7] hover:border-dashed b-none bg-[#151515] text-white" value={section} onChange={(e) => {
                                    setSection(e.target.value)
                                }}>
                                    <option value="1">Select your class</option>
                                    <option value="I-BCA-A">I-BCA 'A'</option>
                                    <option value="I-BCA-B">I-BCA 'B'</option>
                                    <option value="II-BCA-A">II-BCA 'A'</option>
                                    <option value="II-BCA-B">II-BCA 'B'</option>
                                    <option value="III-BCA-A">III-BCA 'A'</option>
                                    <option value="III-BCA-B">III-BCA 'B'</option>
                                    <option value="I-MCA">I-MCA</option>
                                    <option value="II-MCA">II-MCA</option>
                                </select>
                                <button className="w-full py-2 mt-4 rounded-md bg-[#0284c7] text-white trasition ease-in-out duration-300 hover:bg-[#0344c7]">Register</button>
                            </form>
                            :
                            <h1 className="text-[#fff] text-xl font-inter">Quiz not started yet 🤫🕐</h1>
                    }
                </div>
                <p className="absolute text-[#fff] bottom-[20px] left-[50%] translate-x-[-50%] text-xs font-inter font-medium">Copyright &copy; {new Date().getFullYear()} Syntax Cracker</p>
            </div>
        </div>
    )
}

export default Home;