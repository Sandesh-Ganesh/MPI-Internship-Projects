import express from "express"
import {
  getAllUsers,
  getUsersDropdown,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"
const router = express.Router()

router.use(authenticateToken)
router.get("/", allowRoles("ADMIN"), getAllUsers)
router.get("/dropdown", authenticateToken, getUsersDropdown)
router.get("/:id", allowRoles("ADMIN"), getUserById)
router.put("/:id", allowRoles("ADMIN"), updateUser)
router.delete("/:id", allowRoles("ADMIN"), deleteUser)

export default router
