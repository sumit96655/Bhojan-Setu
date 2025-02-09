import express from 'express'
import { IsUser } from '../middleware/verifyToken.js'
import { getActiveDeliveries, getAvailableVolunteers, assignVolunteer } from '../controllers/logisticsController.js'

const router = express.Router()

router.get('/active-deliveries', IsUser, getActiveDeliveries)
router.get('/available-volunteers', IsUser, getAvailableVolunteers)
router.post('/assign-volunteer', IsUser, assignVolunteer)

export default router 