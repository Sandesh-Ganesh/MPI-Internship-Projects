import express from "express"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"
import { createVendor, getAllVendors, getVendorById, updateVendor, deleteVendor} from "../controllers/vendorController.js"

const router = express.Router()

router.use(authenticateToken)
router.post("/vendors", allowRoles("ADMIN"),createVendor)
router.get("/vendors/:id", getVendorById)
router.get("/vendors", getAllVendors)
router.put("/vendors/:id", allowRoles("ADMIN","MANAGER"), updateVendor)
router.delete("/vendors/:id",allowRoles("ADMIN"), deleteVendor)

export default router;