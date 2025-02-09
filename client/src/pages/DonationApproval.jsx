"use client"

import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { get, post, put } from "../services/ApiEndpoint"
import { Clock, MapPin, User, Package, CheckCircle, XCircle } from 'lucide-react'

const DonationApproval = () => {
  const [pendingDonations, setPendingDonations] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchPendingDonations()
  }, [])

  const fetchPendingDonations = async () => {
    try {
      setLoading(true)
      const response = await get("/api/donations?status=requested")
      setPendingDonations(response.data)
    } catch (error) {
      console.error("Error fetching pending donations:", error)
      toast.error("Failed to fetch pending donations")
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (donationId) => {
    try {
      setLoading(true)
      await put("/api/admin/approve", { donationId })
      toast.success("Donation approved successfully")
      fetchPendingDonations()
    } catch (error) {
      console.error("Error approving donation:", error)
      toast.error(error.response?.data?.message || "Failed to approve donation")
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async (donationId) => {
    const isConfirmed = window.confirm("Are you sure you want to reject this donation request?")
    if (!isConfirmed) return

    try {
      setLoading(true)
      await put("/api/admin/reject", { donationId })
      toast.success("Donation rejected successfully")
      fetchPendingDonations()
    } catch (error) {
      console.error("Error rejecting donation:", error)
      toast.error(error.response?.data?.message || "Failed to reject donation")
    } finally {
      setLoading(false)
    }
  }

  const filteredDonations = pendingDonations.filter(donation =>
    donation.foodType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.status?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    const colors = {
      requested: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="p-6">
      {/* Header and Stats */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Donation Approval</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500">Pending Approvals</div>
            <div className="text-2xl font-bold">{pendingDonations.length}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500">Today's Requests</div>
            <div className="text-2xl font-bold">
              {pendingDonations.filter(d =>
                new Date(d.createdAt).toDateString() === new Date().toDateString()
              ).length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-gray-500">Total Food Quantity</div>
            <div className="text-2xl font-bold">
              {pendingDonations.reduce((sum, d) => sum + Number(d.quantity), 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by food type or status..."
          className="w-full md:w-64 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((donation) => (
            <div key={donation._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{donation.foodType}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(donation.status)}`}>
                      {donation.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-semibold">{donation.quantity}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span>Expiry: {new Date(donation.expiry).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-4 flex space-x-3">
                  <button
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                    onClick={() => handleApprove(donation._id)}
                    disabled={loading}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                    onClick={() => handleReject(donation._id)}
                    disabled={loading}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredDonations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {searchTerm ? 'No donations found matching your search' : 'No pending donations available'}
        </div>
      )}
    </div>
  )
}

export default DonationApproval

