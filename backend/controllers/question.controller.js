import Questions from "../models/question.model.js";
import jwt from 'jsonwebtoken';
import { updateUser } from "./user.controller.js";

export const addQuestion = async (req, res) => {
    try {
        const { levelNo, question, answers,output,description } = req.body;
        if (!levelNo || !question || !answers||!output) {
            return res.status(400).json({ message: "Please fill in all fields." });
        }

        const existingQues = await Questions.findOne({ levelNo });
        if (existingQues) {
            return res.status(400).json({ message: "Question already exists for this level." });
        }

        const newQuestion = new Questions({
            levelNo,
            question,
            answers,
            output,
            description
        });

        if (newQuestion) {
            await newQuestion.save();
            return res.status(201).json({ message: "Question added successfully." });
        }

    } catch (error) {
        console.error(`Error in addQuestion : ${error}`);
        res.status(400).json({ error: "Internal Server Error" });
    }
};


export const getQuestionByLevelNo = async (req, res) => {
    try {
        const levelNo = req.query.id;
        const question = await Questions.findOne({ levelNo });
        if (!question) {
            return res.status(404).json({ message: "Question not found for this level." });
        }

        return res.status(200).json(question);

    } catch (error) {
        console.error(`Error in getQuestionByLevelNo : ${error}`);
        res.status(400).json({ error: "Internal Server Error." })
    }
};

export const getAllQuestions = async (req, res) => {
    try {
        const questions = await Questions.find({}).sort({ levelNo: 1 });
        if (questions.length > 0) {
            return res.status(200).json({questions,message:"Questions fetched"});
        } else {
            return res.status(400).json({ message: "No questions Found" });
        }
    } catch (error) {
        console.error(`Error in getAllQuestions : ${error}`);
        res.status(400).json({ error: "Internal Server Error" });
    }
};

export const deleteQuestionByLevelNo = async (req, res) => {
    try {
        const levelNo = req.query.id;
        console.log(levelNo);
        const question = await Questions.deleteOne({ levelNo });
        if (!question) {
            return res.status(404).json({ message: "Question not found for this level." });
        }

        return res.status(200).json({ message: "Question Deleted Successfully" });

    } catch (error) {
        console.error(`Error in deleteQuestionByLevelNo : ${error}`);
        res.status(400).json({ error: "Internal Server Error." })
    }
};

export const deleteAllQuestions = async (req, res) => {
    try {
        const result = await Questions.deleteMany({});
        if (result) {
            return res.status(200).json({ message: `${result.deletedCount} questions are Deleted.` });
        } else {
            return res.status(400).json({ message: "No questions Found" });
        }
    } catch (error) {
        console.error(`Error in getAllQuestions : ${error}`);
        res.status(400).json({ error: "Internal Server Error" });
    }
};

export const evaluateQuestion = async (req, res) => {
    try {

        const token = req.cookies.User;
        if (!token) {
            return res.status(400).json({ error: "No such user found" })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        console.log(decoded);
        decoded.user.levelNo = decoded.user.levelNo + 1;
        decoded.user.score = decoded.user.score + 1;
        decoded.user.submitTime = getCurrentTime();
        
        updateUser(decoded.user,res);

    } catch (error) {
        console.error(`Error in evaluateQuestion : ${error}`);
        res.status(400).json({ message: "Internal Server Error." })
    }
};


function getCurrentTime() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    return `${hours}:${minutes}:${seconds}`
}