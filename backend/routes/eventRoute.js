import express from "express"
import authMiddleware  from "../middleware/authMiddleware.js"
import { createEvent, getEvents } from "../controller/eventController.js";
const router =  express.Router();
router.get("/",getEvents);
router.post("/",authMiddleware,createEvent);

export default router;
