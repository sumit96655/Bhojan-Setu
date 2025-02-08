import express from 'express'
import { Getuser, deletUser, approveRequest } from '../controllers/Admin.js'
import { isAdmin } from '../middleware/verifyToken.js'




const AdminRoutes=express.Router()
 AdminRoutes.get('/getuser',isAdmin,Getuser)
 AdminRoutes.delete('/delet/:id',isAdmin,deletUser)
 AdminRoutes.put('/approve',isAdmin,approveRequest)

export default AdminRoutes
