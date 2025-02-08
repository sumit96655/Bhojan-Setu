import VolunteerModel from '../models/Volunteer.js';
import DonationModel from '../models/Donation.js';
import UserModel from '../models/user.js';
import bcryptjs from 'bcryptjs'


const registerVolunteer = async (req, res) => {
    try {
        const { name, email, password, contact, currentLocation } = req.body;

        const existingUser = await UserModel.findOne({ email });
        let userId;

        if (existingUser) {
            const existingVolunteer = await VolunteerModel.findOne({ userId: existingUser._id });
            if (existingVolunteer) {
                return res.status(400).json({ message: "Volunteer profile already exists" });
            }

            existingUser.role = 'volunteer';
            await existingUser.save();
            userId = existingUser._id;
        } else {
            const hasepassword = await bcryptjs.hashSync(password, 10)
            const newUser = new UserModel({
                name,
                email,
                password: hasepassword,
                contact,
                role: 'volunteer',
            });
            await newUser.save();
            userId = newUser._id;

        }

    
        const newVolunteer = new VolunteerModel({
            userId,
            currentLocation: currentLocation || null
        });

        await newVolunteer.save();

        res.status(201).json({
            success: true,
            message: "Volunteer registered successfully",
            volunteer: newVolunteer
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const updateAvailability = async (req, res) => {
    try {
        const { availability } = req.body;

        const volunteer = await VolunteerModel.findOne({ userId: req.user._id });
        if (!volunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }

        volunteer.availability = availability;
        await volunteer.save();

        res.status(200).json({
            success: true,
            message: "Availability updated successfully",
            volunteer
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateLocation = async (req, res) => {
    try {
        const { lat, lng } = req.body;

        const volunteer = await VolunteerModel.findOne({ userId: req.user._id });
        if (!volunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }

        volunteer.currentLocation = { lat, lng };
        await volunteer.save();

        res.status(200).json({
            success: true,
            message: "Location updated successfully",
            volunteer
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getAssignedDonations = async (req, res) => {
    try {
        const volunteer = await VolunteerModel.findOne({ userId: req.user._id })
            .populate({
                path: 'assignedDonations',
                populate: {
                    path: 'donorId',
                    select: 'name contact address'
                }
            });

        if (!volunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }

        res.status(200).json({
            success: true,
            donations: volunteer.assignedDonations
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const updateDonationStatus = async (req, res) => {
    try {
        const { donationId, status } = req.body;

        const volunteer = await VolunteerModel.findOne({ userId: req.user._id });
        if (!volunteer) {
            return res.status(404).json({ message: "Volunteer not found" });
        }


        if (!volunteer.assignedDonations.includes(donationId)) {
            return res.status(403).json({ message: "Not authorized to update this donation" });
        }

        const donation = await DonationModel.findById(donationId);
        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        donation.status = status;
        await donation.save();


        if (status === 'delivered') {
            volunteer.totalTrips += 1;

            volunteer.assignedDonations = volunteer.assignedDonations.filter(
                id => id.toString() !== donationId
            );
            await volunteer.save();
        }

        res.status(200).json({
            success: true,
            message: "Donation status updated successfully",
            donation
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export {
    registerVolunteer,
    updateAvailability,
    updateLocation,
    getAssignedDonations,
    updateDonationStatus
};