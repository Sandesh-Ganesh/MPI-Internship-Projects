import express from "express"
import { getActivityLogs } from "../controllers/activityLogController.js"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"
const router = express.Router()

router.use(authenticateToken)
router.get("/", allowRoles("ADMIN","MANAGER"), getActivityLogs)

export default router

//Sample Supported Routes
/*
 - GET /api/activity-logs
 - GET /api/activity-logs?user_id=1
 - GET /api/activity-logs?entity_id=2
 - GET /api/activity-logs?log_type=DOMAIN
 - GET /api/activity-logs?action=CREATE 
 - GET /api/activity-logs?entity_id=12&log_type=DOMAIN
 - GET /api/activity-logs?start_date=2026-04-01&end_date=2026-04-10
 - GET /api/activity-logs?page=2&limit=10
 - GET /api/activity-logs?user_id=1&entity_id=2&log_type=DOMAIN&action=CREATE&start_date=2024-01-01&end_date=2024-12-31&page=1&limit=20

*/