import express from "express"
import authMiddleware  from "../middleware/authMiddleware.js"
import { createEvent, deleteEvent, getEvents, getEvetById, updateEvent } from "../controller/eventController.js";
const router =  express.Router();
router.get("/",getEvents);
router.get("/:id",getEvetById);
router.post("/",authMiddleware,createEvent);
router.put("/:id",authMiddleware,updateEvent);
router.delete("/:id",authMiddleware,deleteEvent);

export default router;
