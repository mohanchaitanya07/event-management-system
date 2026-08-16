import express from "express";
import {
  getProfiles,
  createProfile,
  updateProfileTimezone,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/", getProfiles);
router.post("/", createProfile);
router.patch("/:id", updateProfileTimezone);

export default router;
