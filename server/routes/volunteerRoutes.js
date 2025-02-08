import express from 'express';
import { isVolunteer } from '../middleware/verifyToken.js';
import {
    registerVolunteer,
    updateAvailability,
    updateLocation,
    getAssignedDonations,
    updateDonationStatus
} from '../controllers/volunteerController.js';

const volunteerRoutes = express.Router();

volunteerRoutes.post('/register', registerVolunteer);

volunteerRoutes.patch('/availability', isVolunteer, updateAvailability);

volunteerRoutes.patch('/location', isVolunteer, updateLocation);

volunteerRoutes.get('/donations', isVolunteer, getAssignedDonations);

volunteerRoutes.patch('/donations/status', isVolunteer, updateDonationStatus);

export default volunteerRoutes;
