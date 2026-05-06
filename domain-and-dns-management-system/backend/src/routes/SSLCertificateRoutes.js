import express from "express"

import {
  createSSLCertificate,
  getAllSSLCertificates,
  getSSLCertificateById,
  updateSSLCertificate,
  deleteSSLCertificate,
  getSSLCertificateTimeline,
  getActiveSSLPerDomain
} from "../controllers/SSLCertificateController.js"

import { authenticateToken } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.use(authenticateToken)

router.post("/ssl-certificates", allowRoles("ADMIN"), createSSLCertificate)

router.get("/ssl-certificates", allowRoles("ADMIN","MANAGER"), getAllSSLCertificates)

router.get("/ssl-certificates/domain/:domainId/active", allowRoles("ADMIN","MANAGER"), getActiveSSLPerDomain )

router.get("/ssl-certificates/:id", allowRoles("ADMIN","MANAGER"), getSSLCertificateById)

router.get("/ssl-certificates/:id/timeline",allowRoles("ADMIN","MANAGER"), getSSLCertificateTimeline)

router.put("/ssl-certificates/:id", allowRoles("ADMIN"), updateSSLCertificate)

router.patch("/ssl-certificates/:id", allowRoles("ADMIN"), deleteSSLCertificate)

// renewal
// router.post("/ssl-certificates/:id/renew", allowRoles("ADMIN"), renewSSLCertificate)

export default router