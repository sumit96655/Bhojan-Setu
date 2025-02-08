import express from 'express'
import { Getuser, deletUser, approveRequest, rejectRequest } from '../controllers/Admin.js'
import { isAdmin } from '../middleware/verifyToken.js'
import { getAnalytics } from '../controllers/analyticsController.js'

const AdminRoutes = express.Router()
AdminRoutes.get('/getuser', isAdmin, Getuser)
AdminRoutes.delete('/delet/:id', isAdmin, deletUser)
AdminRoutes.put('/approve', isAdmin, approveRequest)
AdminRoutes.put('/reject', isAdmin, rejectRequest)
AdminRoutes.get('/analytics', isAdmin, getAnalytics)

export default AdminRoutes
