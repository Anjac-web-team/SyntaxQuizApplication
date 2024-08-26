import express from 'express';
import { deleteAllUser, register,isUserLoggedIn ,getAllUsers} from '../controllers/user.controller.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.get('/',isUserLoggedIn)

router.post("/register", register);

router.delete("/delete-all-user",protectRoute, deleteAllUser);

router.get('/getallusers',protectRoute,getAllUsers)

export default router;