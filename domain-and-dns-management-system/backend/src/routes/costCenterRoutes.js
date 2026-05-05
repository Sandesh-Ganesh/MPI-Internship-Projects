import express from "express"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"
import { createCostCenter, getAllCostCenters, getCostCenterById, updateCostCenter, deleteCostCenter} from "../controllers/costCenterController.js"

const router = express.Router()

router.use(authenticateToken)
router.post("/", allowRoles("ADMIN"),createCostCenter)
router.get("/:id", getCostCenterById)
router.get("/", getAllCostCenters)
router.put("/:id", allowRoles("ADMIN","MANAGER"), updateCostCenter)
// Soft delete
router.delete("/:id",allowRoles("ADMIN"), deleteCostCenter)

export default router;