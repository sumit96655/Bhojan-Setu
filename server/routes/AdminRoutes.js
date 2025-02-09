import express from 'express'
import { Getuser, deletUser, approveRequest, rejectRequest, updateUser } from '../controllers/Admin.js'
import { isAdmin } from '../middleware/verifyToken.js'
import { getAnalytics } from '../controllers/analyticsController.js'

const AdminRoutes = express.Router()
AdminRoutes.get('/getuser', isAdmin, Getuser)
AdminRoutes.delete('/delet/:id', isAdmin, deletUser)
AdminRoutes.put('/approve', isAdmin, approveRequest)
AdminRoutes.put('/reject', isAdmin, rejectRequest)
AdminRoutes.get('/analytics', isAdmin, getAnalytics)
AdminRoutes.put('/users/:id', isAdmin, updateUser)

export default AdminRoutes
