import express from 'express';
import { deleteAllUser, register } from '../controllers/user.controller.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post("/register", register);

router.delete("/delete-all-user",protectRoute, deleteAllUser);

export default router;