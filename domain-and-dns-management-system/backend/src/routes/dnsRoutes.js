import express from "express";
import { fetchDnsRecords, syncAllDomains,syncDomain, getDnsRecordsByDomain, getAllDnsRecords } from "../controllers/dnsController.js"
import { authenticateToken } from "../middleware/authMiddleware.js"


const router = express.Router()
router.use(authenticateToken)
router.get("/fetch/:domainId", fetchDnsRecords)
router.get("/dns-records", getAllDnsRecords)
router.get("/dns-records/:domainId", getDnsRecordsByDomain)
router.get("/sync-all",syncAllDomains)
router.get("/sync/:domainId",syncDomain)

export default router;