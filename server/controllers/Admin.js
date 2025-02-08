import DonationModel from "../models/Donation.js"
import UserModel from "../models/user.js"

const Getuser = async (req, res) => {
    try {
        const users = await UserModel.find()

        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ message: "intenral server error" })
        console.log(error)
    }
}

const deletUser = async (req, res) => {
    try {
        const userId = req.params.id
        const checkAdmin = await UserModel.findById(userId)

        if (checkAdmin.role == 'admin') {
            return res.status(409).json({ message: "you can not delet youselfe" })
        }
        const user = await UserModel.findByIdAndDelete(userId)
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        res.status(200).json({ message: "user delet successfully ", user })
    } catch (error) {
        res.status(500).json({ message: "intenral server error" })
        console.log(error)
    }
}
const approveRequest = async (req, res) => {
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

        // if (donation.status !== "requested") {
        //     return res.status(400).json({ message: "Donation is not available" });
        // }

        // Create new request with explicit fields
        donation.status = "approved";
        donation.assignedNGO = donation.requestedNGO;
        await donation.save();



        // Update donation status
        // donation.status = "approved";
        // donation.assignedNGO = req.user._id;
        // donation.requestedNGO = req.user._id;
        // await donation.save();


        res.status(201).json({
            message: "approved successfully",
            // request: newRequest
        });
    } catch (error) {
        console.error('Detailed error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export { Getuser, deletUser, approveRequest }