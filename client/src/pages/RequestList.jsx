"use client"

import { useState } from "react"
import { FaFilter } from "react-icons/fa"

export default function RequestList({ donations, onSelectDonation }) {
  const [filter, setFilter] = useState("all")

  const filteredDonations = donations.filter((donation) => {
    if (filter === "all") return true
    return donation.status === filter
  })

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Donation Requests</h2>
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="collected">Collected</option>
          </select>
          <FaFilter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="overflow-auto flex-1">
        {filteredDonations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer hover:shadow-lg transition duration-300"
            onClick={() => onSelectDonation(donation)}
          >
            <h3 className="text-lg font-semibold text-gray-800">{donation.donorName}</h3>
            <p className="text-sm text-gray-600">{donation.foodType}</p>
            <div className="flex justify-between items-center mt-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  donation.status === "pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : donation.status === "accepted"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-green-200 text-green-800"
                }`}
              >
                {donation.status}
              </span>
              <span className="text-sm text-gray-500">{new Date(donation.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

