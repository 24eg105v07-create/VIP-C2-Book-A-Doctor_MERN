import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  applyDoctorController,
  getDoctorInfoController,
  getAllApprovedDoctorsController,
  getDoctorByIdController,
} from "../controllers/doctorController.js";

const router = express.Router();

// Apply Doctor
router.post(
  "/apply-doctor",
  authMiddleware,
  applyDoctorController
);

// Get Logged-In Doctor Info
router.get(
  "/get-doctor-info",
  authMiddleware,
  getDoctorInfoController
);

// Get All Approved Doctors
router.get(
  "/get-all-doctors",
  authMiddleware,
  getAllApprovedDoctorsController
);


router.get(
  "/:id",
  authMiddleware,
  getDoctorByIdController
);

export default router;