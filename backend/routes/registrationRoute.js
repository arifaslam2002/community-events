import express from "express";
import {
  cancelRegistration,
  getAttedees,
  MyRegistrations,
  registerEvent,
} from "../controller/registrationController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/", authMiddleware, registerEvent);
router.get("/my", authMiddleware, MyRegistrations);
router.delete("/:id", authMiddleware, cancelRegistration);
router.get("/event/:eventId/attendees", authMiddleware, getAttedees);

export default router;
