import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  registerController,
  loginController,
  currentUserController,
  getNotificationsController,
markAllNotificationsController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get(
  "/current-user",
  authMiddleware,
  currentUserController
);


router.get(
  "/notifications",
  authMiddleware,
  getNotificationsController
);

router.post(
  "/mark-all-notifications",
  authMiddleware,
  markAllNotificationsController
);



export default router;