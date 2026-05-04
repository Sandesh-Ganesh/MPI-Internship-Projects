import express from "express"
import { createControlPanel, getAllControlPanels, getControlPanelById, updateControlPanel, deleteControlPanel} from "../controllers/controlPanelController.js"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"

const Router = express.Router()

Router.use(authenticateToken)

Router.post("/", allowRoles("ADMIN"), createControlPanel)

Router.get("/", getAllControlPanels)

Router.get("/:id", getControlPanelById)

Router.put("/:id", allowRoles("ADMIN"), updateControlPanel)

Router.delete("/:id", allowRoles("ADMIN"), deleteControlPanel)

export default Router