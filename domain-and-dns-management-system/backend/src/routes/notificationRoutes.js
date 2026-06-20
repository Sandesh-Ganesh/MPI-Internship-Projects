import express from "express"

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../controllers/notificationController.js"

import { authenticateToken } from "../middleware/authMiddleware.js"
const router = express.Router()

router.use(authenticateToken)

router.get("/", getNotifications)

router.patch(
  "/:id/read",
  markNotificationRead
)

router.patch(
  "/read-all",
  markAllNotificationsRead
)

export default router