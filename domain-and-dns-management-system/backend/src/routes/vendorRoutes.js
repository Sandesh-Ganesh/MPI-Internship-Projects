import express from "express"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"
import { createVendor, getAllVendors, getVendorById, updateVendor, deleteVendor} from "../controllers/vendorController.js"

const router = express.Router()

router.use(authenticateToken)
router.post("/", allowRoles("ADMIN"),createVendor)
router.get("/:id", getVendorById)
router.get("/", getAllVendors)
router.put("/:id", allowRoles("ADMIN","MANAGER"), updateVendor)
router.delete("/:id",allowRoles("ADMIN"), deleteVendor)

export default router;