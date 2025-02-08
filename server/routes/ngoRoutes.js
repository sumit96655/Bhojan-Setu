import express from 'express';
import {
    getAvailableDonations,
    createRequest,
    getActiveRequests,
    updateRequestStatus
} from '../controllers/ngoController.js';
import { isNgo } from '../middleware/verifyToken.js';

const ngoRoutes = express.Router();

ngoRoutes.use(isNgo);

ngoRoutes.get('/donations/available', getAvailableDonations);
ngoRoutes.post('/requests', isNgo, createRequest);
ngoRoutes.get('/requests/active', isNgo,getActiveRequests);
ngoRoutes.patch('/requests/:requestId/status', isNgo, updateRequestStatus);

export default ngoRoutes;
