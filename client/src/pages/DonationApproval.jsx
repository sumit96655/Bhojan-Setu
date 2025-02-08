"use client"

import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { get, post, put } from "../services/ApiEndpoint"

const DonationApproval = () => {
  const [pendingDonations, setPendingDonations] = useState([])
  const [loading, setLoading] = useState(false)

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
      console.log(donationId);

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
    // Show confirmation alert
    const isConfirmed = window.confirm("Are you sure you want to reject this donation request?");

    if (!isConfirmed) {
      return; // If user clicks Cancel, don't proceed
    }

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Donation Approval</h2>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {pendingDonations.map((donation) => (
            <div key={donation._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{donation.foodType}</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <p>Quantity: {donation.quantity}</p>
                <p>Status: {donation.status}</p>
                <p>Expiry: {new Date(donation.expiry).toLocaleDateString()}</p>
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                  onClick={() => handleApprove(donation._id)}
                  disabled={loading}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                  onClick={() => handleReject(donation._id)}
                  disabled={loading}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DonationApproval

