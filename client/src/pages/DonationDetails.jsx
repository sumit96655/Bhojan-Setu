import { FaTimes, FaCheck, FaTruck } from "react-icons/fa"
import { post,put } from "../services/ApiEndpoint"
import { toast } from "react-hot-toast"
import { useState } from "react"

export default function DonationDetails({ donation, onClose, onRequestAccepted }) {
  const [loading, setLoading] = useState(false)

  const handleAccept = async () => {
    try {
      setLoading(true)
      await post("/api/ngo/requests", { donationId: donation._id })
      toast.success("Request sent successfully")
      // Update the parent component's state through a new prop
      onRequestAccepted(donation._id)
      onClose()
    } catch (error) {
      console.error("Error requesting donation:", error)
      toast.error(error.response?.data?.message || "Failed to request donation")
    } finally {
      setLoading(false)
    }
  }

  const handleCollect = async () => {
    try {
      setLoading(true)
      console.log(donation._id)
      await put(`/api/ngo/donations/${donation._id}/status`, { status: "collected" })
      toast.success("Donation marked as collected")
      onRequestAccepted(donation._id)
      onClose()

    } catch (error) {
      console.error("Error updating donation status:", error)
      toast.error(error.response?.data?.message || "Failed to update donation status")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">{donation.donorName}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FaTimes />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Food Type</p>
          <p className="font-semibold">{donation.foodType}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Quantity</p>
          <p className="font-semibold">{donation.quantity} kg</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Expiry</p>
          <p className="font-semibold">{new Date(donation.expiryDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Status</p>
          <p
            className={`font-semibold ${donation.status === "pending"
              ? "text-yellow-600"
              : donation.status === "accepted"
                ? "text-blue-600"
                : "text-green-600"
              }`}
          >
            {donation.status}
          </p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Address</p>
        <p className="text-gray-800">{donation.address}</p>
      </div>
      <div className="h-48 bg-gray-200 rounded-lg mb-4">
        {/* Embed a mini map here */}
        <p className="text-center pt-20 text-gray-500">Mini Map Placeholder</p>
      </div>
      <div className="flex justify-end space-x-4">
        {donation.status === "pending" && (
          <button
            onClick={handleAccept}
            disabled={loading}
            className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            <FaCheck className="mr-2" />
            {loading ? 'Requesting...' : 'Request'}
          </button>
        )}
        {donation.status === "approved" && (
          <button
            onClick={handleCollect}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
          >
            <FaTruck className="mr-2" /> Mark as Collected
          </button>
        )}
      </div>
    </div>
  )
}

