import express from "express"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"
import { createCompany,getAllCompanies,getCompanyById,updateCompany,deleteCompany} from "../controllers/companyController.js"

const router = express.Router()

router.use(authenticateToken)
router.post("/companies", allowRoles("ADMIN"),createCompany)
router.get("/companies", getAllCompanies)
router.get("/companies/:id", getCompanyById)
router.put("/companies/:id", allowRoles("ADMIN","MANAGER"), updateCompany)
router.delete("/companies/:id",allowRoles("ADMIN"), deleteCompany)

export default router;