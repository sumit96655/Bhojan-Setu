import DonationModel from "../models/Donation.js";
import RequestModel from "../models/Request.js";
import NgoModel from "../models/NgoDetail.js";


const getAvailableDonations = async (req, res) => {
    try {
        // Find donations that are pending and not assigned
        const donations = await DonationModel.find({
            status: "pending",
            assignedNGO: null
        }).populate('donorId', 'name contact address');

        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Create request for donation
const createRequest = async (req, res) => {
    try {
        const { donationId } = req.body;

        // Debug logs
        console.log('User:', req.user);
        console.log('DonationId:', donationId);

        // Validate if user exists and has _id
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "User not authenticated properly" });
        }

        // Check if donation exists and is available
        const donation = await DonationModel.findById(donationId);
        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        if (donation.status !== "pending") {
            return res.status(400).json({ message: "Donation is not available" });
        }

        // Create new request with explicit fields
        const newRequest = new RequestModel({
            donationId: donation._id,
            ngoId: req.user._id,
            requestStatus: 'requested',
            createdAt: new Date()  // Add explicit timestamp
        });

        console.log('New Request before save:', newRequest);

        await newRequest.save();

        // Update donation status
        donation.status = "approved";
        donation.assignedNGO = req.user._id;
        await donation.save();

        res.status(201).json({
            message: "Request created successfully",
            request: newRequest
        });
    } catch (error) {
        console.error('Detailed error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get NGO's active requests
const getActiveRequests = async (req, res) => {
    try {
        const requests = await RequestModel.find({
            ngoId: req.user.id,
            requestStatus: { $in: ['requested', 'approved', 'in-transit'] }
        }).populate('donationId');

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update request status
const updateRequestStatus = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { status } = req.body;

        if (!['requested', 'approved', 'in-transit', 'completed'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const request = await RequestModel.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        // Verify the NGO owns this request
        if (request.ngoId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        request.requestStatus = status;
        await request.save();

        // Update donation status if request is completed
        if (status === 'completed') {
            await DonationModel.findByIdAndUpdate(request.donationId, {
                status: 'delivered'
            });
        }

        res.status(200).json({
            message: "Request status updated successfully",
            request
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export {
    getAvailableDonations,
    createRequest,
    getActiveRequests,
    updateRequestStatus
};
