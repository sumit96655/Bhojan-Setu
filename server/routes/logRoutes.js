import express from 'express';
import { createLog, getLogs, getUserLogs } from '../controllers/logController.js';
import { isAdmin, IsUser } from '../middleware/verifyToken.js';

const logRoutes = express.Router();

logRoutes.post('/', IsUser, createLog);

logRoutes.get('/admin', isAdmin, getLogs);

logRoutes.get('/user/:userId', IsUser, getUserLogs);

export default logRoutes; 