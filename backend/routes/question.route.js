import express from 'express';
import protectRoute from '../middleware/protectRoute.js'
import { addQuestion, deleteAllQuestions, deleteQuestionByLevelNo, evaluateQuestion, getAllQuestions, getQuestionByLevelNo } from '../controllers/question.controller.js';

const router = express.Router();

router.get("/getquestion", getQuestionByLevelNo);

router.get("/get-all-questions", protectRoute, getAllQuestions);

router.post("/addquestion", protectRoute, addQuestion);

router.delete("/deletequestion", protectRoute, deleteQuestionByLevelNo);

router.delete("/delete-all-questions", protectRoute, deleteAllQuestions);

router.post("/evaluate-question", evaluateQuestion);

export default router;