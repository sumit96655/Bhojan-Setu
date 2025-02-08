import express from 'express';
import {
    getAvailableDonations,
    createRequest,
    getActiveRequests,
    updateRequestStatus,
    getRequestedDonations,
    getApprovedDonations,
    getCompletedDonations
} from '../controllers/ngoController.js';
import { isNgo } from '../middleware/verifyToken.js';

const ngoRoutes = express.Router();

ngoRoutes.use(isNgo);

ngoRoutes.get('/donations/available', getAvailableDonations);
ngoRoutes.post('/requests', isNgo, createRequest);
ngoRoutes.get('/requests/active', isNgo, getActiveRequests);
ngoRoutes.patch('/donations/:donationId/status', updateRequestStatus);

ngoRoutes.get('/donations/requested', getRequestedDonations);
ngoRoutes.get('/donations/approved', getApprovedDonations);
ngoRoutes.get('/donations/completed', getCompletedDonations);

export default ngoRoutes;
