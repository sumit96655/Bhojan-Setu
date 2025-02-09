import { useState, useEffect } from 'react'
import { get } from '../services/ApiEndpoint'
import { Line, Pie, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const AnalyticsPanel = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonations: 0,
    statusCounts: {},
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await get('/api/admin/analytics')
      setStats(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching analytics:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  const donationStatusData = {
    labels: Object.keys(stats.statusCounts),
    datasets: [
      {
        data: Object.values(stats.statusCounts),
        backgroundColor: [
          '#4CAF50', // pending
          '#2196F3', // approved
          '#F44336', // rejected
          '#FFC107', // collected
          '#9C27B0'  // requested
        ]
      }
    ]
  }

  const userActivityData = {
    labels: stats.userActivity?.map(item => item.date) || [],
    datasets: [
      {
        label: 'New Users',
        data: stats.userActivity?.map(item => item.count) || [],
        fill: false,
        borderColor: '#2196F3',
        tension: 0.1
      }
    ]
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Donations</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalDonations}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Active NGOs</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.activeNGOs}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Donation Status Distribution</h3>
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <Pie data={donationStatusData} options={{ responsive: true }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">User Activity Trend</h3>
          <Line data={userActivityData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Recent Activity Log */}
      {/* <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentActivity.map((activity, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {activity.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  )
}

export default AnalyticsPanel

