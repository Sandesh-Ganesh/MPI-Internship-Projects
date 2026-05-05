import express from "express"

import {
createDomain,
getAllDomains,
getDomainById,
updateDomain,
deleteDomain,
getDomainsByCompany,
} from "../controllers/domainController.js"

import { authenticateToken } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.use(authenticateToken)

router.post("/domains", allowRoles("ADMIN"), createDomain)

router.get("/domains", getAllDomains)

router.get("/domains/:id", getDomainById)

router.get("/domains/company/:companyId", getDomainsByCompany)

router.put("/domains/:id", allowRoles("ADMIN"), updateDomain)

router.patch("/domains/:id", allowRoles("ADMIN"), deleteDomain)

export default router