import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { adminLogin, adminSignup, adminLogout,isAdminLoggedIn } from '../controllers/admin.controller.js';
const router = express.Router();

router.get('/',protectRoute,isAdminLoggedIn)

router.post("/signup", adminSignup);

router.post("/login", adminLogin);

router.get("/logout", adminLogout);

export default router;