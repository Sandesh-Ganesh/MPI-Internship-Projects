import express from "express"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"
const router = express.Router()

router.get("/dashboard", authenticateToken, allowRoles("ADMIN"), (req, res) => {

  res.json({
    message: "Welcome to dashboard",
    user: req.user
  });

});

export default router;