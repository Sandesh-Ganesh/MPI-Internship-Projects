import express from "express"
import { createControlPanel, getAllControlPanels, getControlPanelById, updateControlPanel, deleteControlPanel} from "../controllers/controlPanelController.js"
import { authenticateToken } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"

const Router = express.Router()

Router.use(authenticateToken)

Router.post("/control-panels", allowRoles("ADMIN"), createControlPanel)

Router.get("/control-panels", getAllControlPanels)

Router.get("/control-panels/:id", getControlPanelById)

Router.put("/control-panels/:id", allowRoles("ADMIN"), updateControlPanel)

Router.patch("/control-panels/:id", allowRoles("ADMIN"), deleteControlPanel)

export default Router