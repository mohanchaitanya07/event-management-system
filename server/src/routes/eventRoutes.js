import express from "express";
import {
  getEvents,
  createEvent,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.patch("/:id", updateEvent);

export default router;
