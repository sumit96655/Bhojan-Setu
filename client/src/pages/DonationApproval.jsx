"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const DonationApproval = () => {
  const [pendingDonations, setPendingDonations] = useState([])

  useEffect(() => {
    fetchPendingDonations()
  }, [])

  const fetchPendingDonations = async () => {
    try {
      const response = await axios.get("/api/donations/pending")
      setPendingDonations(response.data)
    } catch (error) {
      console.error("Error fetching pending donations:", error)
    }
  }

  const handleApprove = async (donationId) => {
    try {
      await axios.put(`/api/donations/${donationId}/approve`)
      fetchPendingDonations()
    } catch (error) {
      console.error("Error approving donation:", error)
    }
  }

  const handleReject = async (donationId) => {
    try {
      await axios.put(`/api/donations/${donationId}/reject`)
      fetchPendingDonations()
    } catch (error) {
      console.error("Error rejecting donation:", error)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Donation Approval</h2>
      {pendingDonations.map((donation) => (
        <div key={donation._id} className="bg-gray-100 p-4 mb-4 rounded-lg">
          <h3 className="text-xl font-semibold">{donation.foodItem}</h3>
          <p>Quantity: {donation.quantity}</p>
          <p>Donor: {donation.donorName}</p>
          <p>Expiry: {new Date(donation.expiryDate).toLocaleDateString()}</p>
          <div className="mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => handleApprove(donation._id)}
            >
              Approve
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleReject(donation._id)}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DonationApproval

