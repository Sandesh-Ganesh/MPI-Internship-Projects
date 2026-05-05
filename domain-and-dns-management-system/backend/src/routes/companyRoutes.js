import express from "express"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"
import { createCompany,getAllCompanies,getCompanyById,updateCompany,deleteCompany} from "../controllers/companyController.js"

const router = express.Router()

router.use(authenticateToken)
router.post("/", allowRoles("ADMIN"),createCompany)
router.get("/", getAllCompanies)
router.get("/:id", getCompanyById)
router.put("/:id", allowRoles("ADMIN","MANAGER"), updateCompany)
router.delete("/:id",allowRoles("ADMIN"), deleteCompany)

export default router;