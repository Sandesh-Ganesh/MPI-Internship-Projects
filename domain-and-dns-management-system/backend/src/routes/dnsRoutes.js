import express from "express";
import { fetchDnsRecords } from "../controllers/dnsController.js";

const router = express.Router();

router.get("/records", fetchDnsRecords);

export default router;