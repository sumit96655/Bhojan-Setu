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

const rejectRequest = async (req, res) => {
    try {
        const { donationId } = req.body;

        // Debug logs
        console.log('User:', req.user);
        console.log('DonationId:', donationId);

        // Validate if user exists and has _id
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "User not authenticated properly" });
        }

        // Check if donation exists
        const donation = await DonationModel.findById(donationId);
        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }

        // Update donation status and remove NGO
        donation.status = "pending";  // Reset to pending
        donation.requestedNGO = null; // Remove the NGO request
        await donation.save();

        res.status(200).json({
            message: "Request rejected successfully",
            donation
        });
    } catch (error) {
        console.error('Detailed error:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, contact, role } = req.body;

        // Validate if user exists
        const userExists = await UserModel.findById(id);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if email is being changed and if it's already taken by another user
        if (email !== userExists.email) {
            const emailExists = await UserModel.findOne({ email, _id: { $ne: id } });
            if (emailExists) {
                return res.status(400).json({ message: "Email already in use by another user" });
            }
        }

        // Validate role
        const validRoles = ['user', 'ngo', 'donor', 'volunteer'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role specified" });
        }

        // Update user
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            {
                name,
                email,
                contact,
                role
            },
            {
                new: true,
                runValidators: true,
                select: '-password' // Exclude password from the returned object
            }
        );

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error('Update user error:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: "Validation error",
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export { Getuser, deletUser, approveRequest, rejectRequest, updateUser }