import express from 'express'
import { updateQuizStatus,updateTimer,getGameStatus } from '../controllers/settings.controller.js'
import protectRoute from '../middleware/protectRoute.js'

const router=express.Router()

router.get('/',getGameStatus)
router.put('/updatestatus',protectRoute,updateQuizStatus)
router.put('/updatetimer',protectRoute,updateTimer)


export default router;