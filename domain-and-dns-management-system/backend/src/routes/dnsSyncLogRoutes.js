import express from "express"
import { getDNSyncLogs } from "../controllers/dnsSyncLogController.js"
import { authenticateToken } from "../middleware/authMiddleware.js"

const router = express.Router()

router.use(authenticateToken)

// GET DNS Sync Logs (with filters)
router.get("/dns-sync-logs", getDNSyncLogs)

export default router

/*
Supported routes:

- GET /api/dns-sync-logs
- GET /api/dns-sync-logs?domain_id=1
- GET /api/dns-sync-logs?status=SUCCESS
- GET /api/dns-sync-logs?start_date=2026-04-01&end_date=2026-04-10
- GET /api/dns-sync-logs?page=2&limit=10
- GET /api/dns-sync-logs?domain_id=1&status=FAILED&page=1&limit=5

*/