import express from 'express'
// const { createDonation, getDonations, updateDonationStatus } = require("../controllers/donationController");
// const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");
import {createDonation, getDonations, updateDonationStatus} from '../controllers/donationController.js'
import {isDonor,IsUser} from '../middleware/verifyToken.js'

const donationRoutes = express.Router();

donationRoutes.post("/", isDonor, createDonation);
donationRoutes.get("/", IsUser, getDonations);
donationRoutes.patch("/:id/status", IsUser, isDonor, updateDonationStatus);

export default donationRoutes;