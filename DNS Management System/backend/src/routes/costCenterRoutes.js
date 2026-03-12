import express from "express"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"
import { createCostCenter, getAllCostCenters, getCostCenterById, updateCostCenter, deleteCostCenter} from "../controllers/costCenterController.js"

const router = express.Router()

router.use(authenticateToken)
router.post("/costCenters", allowRoles("ADMIN"),createCostCenter)
router.get("/costCenters/:id", getCostCenterById)
router.get("/costCenters", getAllCostCenters)
router.put("/costCenters/:id", allowRoles("ADMIN","MANAGER"), updateCostCenter)
// Soft delete
router.patch("/costCenters/:id",allowRoles("ADMIN"), deleteCostCenter)

export default router;