import DonationModel from '../models/Donation.js'
import VolunteerModel from '../models/Volunteer.js'
import UserModel from '../models/user.js'

export const getActiveDeliveries = async (req, res) => {
    try {
        const deliveries = await DonationModel.find({
            status: { $in: ['approved', 'in_transit'] }
        }).populate('donorId', 'name contact address')
            .populate('assignedNGO', 'name contact')

        res.status(200).json(deliveries)
    } catch (error) {
        console.error('Error fetching active deliveries:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

export const getAvailableVolunteers = async (req, res) => {
    try {
        const volunteers = await VolunteerModel.find({
            availability: true,
            'assignedDonations.0': { $exists: false } // No current assignments
        }).populate('userId', 'name contact')

        res.status(200).json(volunteers)
    } catch (error) {
        console.error('Error fetching available volunteers:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

export const assignVolunteer = async (req, res) => {
    try {
        const { volunteerId, donationId } = req.body

        const volunteer = await VolunteerModel.findById(volunteerId)
        const donation = await DonationModel.findById(donationId)

        if (!volunteer || !donation) {
            return res.status(404).json({ message: 'Volunteer or donation not found' })
        }

        // Update volunteer
        volunteer.assignedDonations.push(donationId)
        await volunteer.save()

        // Update donation status
        donation.status = 'in_transit'
        await donation.save()

        res.status(200).json({ message: 'Volunteer assigned successfully' })
    } catch (error) {
        console.error('Error assigning volunteer:', error)
        res.status(500).json({ message: 'Server error' })
    }
} 