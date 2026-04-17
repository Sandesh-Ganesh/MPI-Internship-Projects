import express from "express"

import {
  createSSLCertificate,
  getAllSSLCertificates,
  getSSLCertificateById,
  updateSSLCertificate,
  deleteSSLCertificate,
  renewSSLCertificate
} from "../controllers/SSLCertificateController.js"

import { authenticateToken } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.use(authenticateToken)

router.post("/ssl-certificates", allowRoles("ADMIN"), createSSLCertificate)

router.get("/ssl-certificates", getAllSSLCertificates)

router.get("/ssl-certificates/:id", getSSLCertificateById)

router.put("/ssl-certificates/:id", allowRoles("ADMIN"), updateSSLCertificate)

router.patch("/ssl-certificates/:id", allowRoles("ADMIN"), deleteSSLCertificate)

// 🔥 renewal
router.post("/ssl-certificates/:id/renew", allowRoles("ADMIN"), renewSSLCertificate)

export default router