import express from "express"
import {
  getAllDNSChangeLogs,
  getDNSChangeLogsByDomain
} from "../controllers/dnsChangeLogController.js"

import { authenticateToken } from "../middleware/authMiddleware.js"

const router = express.Router()

router.use(authenticateToken)

router.get("/", getAllDNSChangeLogs)
router.get("/domain/:domainId", getDNSChangeLogsByDomain)

export default router