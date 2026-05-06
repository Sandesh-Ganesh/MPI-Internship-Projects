import express from 'express'
import {getDashboardSummary, getRecentActivities, getDashboardAlerts} from '../controllers/dashboardController.js'
import {authenticateToken} from '../middleware/authMiddleware.js'
import {allowRoles } from '../middleware/roleMiddleware.js'
const router = express.Router()
router.use(authenticateToken)

router.get('/summary',  allowRoles("ADMIN", "MANAGER", "USER"), getDashboardSummary)
router.get('/recent-activities',  allowRoles("ADMIN", "MANAGER"),getRecentActivities)
router.get('/alerts', allowRoles("ADMIN", "MANAGER"), getDashboardAlerts)

export default router