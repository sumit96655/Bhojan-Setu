"use client"

import { useState, useEffect } from "react"
import { get, post } from "../services/ApiEndpoint"
import { toast } from "react-hot-toast"
import RequestList from "./RequestList"
import MapView from "./MapView"
import DonationDetails from "./DonationDetails"

export default function NGODashboard() {
  const [selectedDonation, setSelectedDonation] = useState(null)
  const [donations, setDonations] = useState([])
  const [myRequests, setMyRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState('available') // 'available' or 'myRequests'

  useEffect(() => {
    if (viewMode === 'available') {
      fetchAvailableDonations()
    } else {
      fetchMyRequests()
    }
  }, [viewMode])

  const fetchAvailableDonations = async () => {
    try {
      setLoading(true)
      const response = await get("/api/ngo/donations/available")
      setDonations(response.data)
    } catch (error) {
      console.error("Error fetching donations:", error)
      toast.error("Failed to fetch available donations")
    } finally {
      setLoading(false)
    }
  }

  const fetchMyRequests = async () => {
    try {
      setLoading(true)
      const [approvedRes, completedRes, requestedRes] = await Promise.all([
        get("/api/ngo/donations/approved"),
        get("/api/ngo/donations/completed"),
        get("/api/ngo/donations/requested")
      ])
      setMyRequests([...approvedRes.data, ...completedRes.data, ...requestedRes.data])
    } catch (error) {
      console.error("Error fetching requests:", error)
      toast.error("Failed to fetch your requests")
    } finally {
      setLoading(false)
    }
  }

  const handleDonationRequest = async (donationId) => {
    try {
      await post("/api/ngo/requests", { donationId })
      setDonations(donations.filter(donation => donation._id !== donationId))
      setSelectedDonation(null)
      toast.success("Request sent successfully")
    } catch (error) {
      console.error("Error requesting donation:", error)
      toast.error("Failed to request donation")
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-auto">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">NGO Dashboard</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => setViewMode('available')}
                  className={`px-4 py-2 rounded-md ${viewMode === 'available'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  Available Donations
                </button>
                <button
                  onClick={() => setViewMode('myRequests')}
                  className={`px-4 py-2 rounded-md ${viewMode === 'myRequests'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  My Requests
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 flex">
          <div className="w-1/3 bg-white p-6 overflow-auto">
            <RequestList
              donations={viewMode === 'available' ? donations : myRequests}
              onSelectDonation={setSelectedDonation}
              onRequestDonation={handleDonationRequest}
              loading={loading}
              showRequestButton={viewMode === 'available'}
            />
          </div>
          <div className="w-2/3 p-6 flex flex-col">
            <MapView
              donations={viewMode === 'available' ? donations : myRequests}
              selectedDonation={selectedDonation}
            />
            {selectedDonation && (
              <DonationDetails
                donation={selectedDonation}
                onClose={() => setSelectedDonation(null)}
                onRequestAccepted={(donationId) => {
                  setDonations(prevDonations =>
                    prevDonations.filter(donation => donation._id !== donationId)
                  )
                }}
                showRequestButton={viewMode === 'available'}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

