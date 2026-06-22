import express from "express"

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../controllers/notificationController.js"

import { authenticateToken } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"
const router = express.Router()

router.use(authenticateToken)
router.get("/", allowRoles("ADMIN"), getNotifications )

router.patch( "/:id/read", allowRoles("ADMIN"),  markNotificationRead )

router.patch( "/read-all", allowRoles("ADMIN"),  markAllNotificationsRead )

export default router