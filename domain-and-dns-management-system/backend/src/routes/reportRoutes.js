import express from "express"

import {
  getDomainExpiryReport,
  getSslExpiryReport,
  getDnsSyncReport,
  getOverviewReport,
  exportDomainExpiryCsv,
  exportSslExpiryCsv,
} from "../controllers/reportController.js"

import { authenticateToken } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"
const router = express.Router()
router.use(authenticateToken)
router.get("/domain-expiry", allowRoles("ADMIN","MANAGER"), getDomainExpiryReport )

router.get( "/ssl-expiry", allowRoles("ADMIN","MANAGER"), getSslExpiryReport
)

router.get ( "/dns-sync", allowRoles("ADMIN","MANAGER"), getDnsSyncReport )

router.get( "/overview", allowRoles("ADMIN","MANAGER"), getOverviewReport )

router.get( "/domain-expiry/export", allowRoles("ADMIN","MANAGER"), exportDomainExpiryCsv )

router.get( "/ssl-expiry/export", allowRoles("ADMIN","MANAGER"), exportSslExpiryCsv )

export default router