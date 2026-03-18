import express from "express";
import { fetchDnsRecords } from "../controllers/dnsController.js";
// import { getDnsRecordsByDomain } from "../controllers/dnsController.js"
import { authenticateToken } from "../middleware/authMiddleware.js"

const router = express.Router()
router.use(authenticateToken)

router.get("/",(req,res)=>{
    res.status(200).json({"message":"i am here"})
})
router.get("/fetch/:domainId", fetchDnsRecords)
// router.get("/dns-records/:domainId", getDnsRecordsByDomain);

export default router;