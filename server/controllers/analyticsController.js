import DonationModel from '../models/Donation.js'
import UserModel from '../models/user.js'
import AuditLogModel from '../models/AuditLog.js'

const getAnalytics = async (req, res) => {
    try {
        // Get total users count
        const totalUsers = await UserModel.countDocuments()

        // Get total donations count
        const totalDonations = await DonationModel.countDocuments()

        // Get active NGOs (NGOs with at least one approved donation)
        const activeNGOs = await DonationModel.distinct('assignedNGO', {
            status: { $ne: 'pending' }
        }).then(ngos => ngos.length)

        // Get donation status distribution
        const statusCounts = await DonationModel.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]).then(results => {
            return results.reduce((acc, curr) => {
                acc[curr._id] = curr.count
                return acc
            }, {})
        })

        // Get recent activity from audit logs
        const recentActivity = await AuditLogModel
            .find()
            .sort({ timestamp: -1 })
            .limit(10)

        // Get user activity trend (last 7 days)
        const userActivity = await UserModel.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: -1 } },
            { $limit: 7 }
        ]).then(results => results.map(item => ({
            date: item._id,
            count: item.count
        })))

        res.json({
            totalUsers,
            totalDonations,
            activeNGOs,
            statusCounts,
            recentActivity,
            userActivity
        })
    } catch (error) {
        console.error('Analytics error:', error)
        res.status(500).json({ message: 'Error fetching analytics data' })
    }
}

export { getAnalytics } 