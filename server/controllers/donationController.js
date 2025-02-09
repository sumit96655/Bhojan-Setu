// const Donation = require("../models/Donation");
// const User = require("../models/user");
import DonationModel from "../models/Donation.js";
import UserModel from '../models/user.js'

const createDonation = async (req, res) => {
    try {
        const { foodType, quantity, expiry, imageURL, location } = req.body;

        if (!foodType || !quantity || !expiry || !location) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newDonation = new DonationModel({
            donorId: req.user.id,
            foodType,
            quantity,
            expiry,
            imageURL,
            location,
            status: "pending",
        });

        await newDonation.save();
        res.status(201).json({ message: "Donation created successfully", donation: newDonation });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getDonations = async (req, res) => {
    try {
        let query = {};

        if (req.user.role === "donor") {
            query.donorId = req.user.id;
        }

        if (req.user.role === "ngo") {
            query.assignedNGO = req.user.id;
        }

        if (req.query.status) query.status = req.query.status;
        if (req.query.location) query.location = req.query.location;

        const donations = await DonationModel.find(query).sort({ createdAt: -1 });
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateDonationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["approved", "rejected", "collected", "delivered"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const donation = await DonationModel.findById(id);
        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        donation.status = status;
        await donation.save();

        res.status(200).json({ message: "Donation status updated successfully", donation });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export { createDonation, getDonations, updateDonationStatus };
