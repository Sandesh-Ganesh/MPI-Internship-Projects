import express from "express";
import { fetchDnsRecords } from "../controllers/dnsController.js";
import { getDnsRecordsByDomain } from "../controllers/dnsController.js"
import { authenticateToken } from "../middleware/authMiddleware.js"

const router = express.Router()

router.use(authenticateToken)
router.get("/dns-records/:domain_id", getDnsRecordsByDomain)
router.get("/records", fetchDnsRecords);

export default router;