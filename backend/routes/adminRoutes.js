import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getAllDoctorsController,
  approveDoctorController,
} from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/get-all-doctors",
  authMiddleware,
  adminMiddleware,
  getAllDoctorsController
);


router.put(
  "/approve-doctor/:doctorId",
  authMiddleware,
  adminMiddleware,
  approveDoctorController
);

export default router;