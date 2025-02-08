"use client"

import { useState } from "react"
import UserManagement from "./UserManagement.jsx"
import DonationApproval from "./DonationApproval.jsx"
import AnalyticsPanel from "./AnalyticsPanel.jsx"

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-green-600 p-4">
        <h1 className="text-white text-2xl font-bold">FoodBridge Admin</h1>
      </nav>
      <div className="container mx-auto mt-8">
        <div className="flex mb-4">
          <button
            className={`mr-4 px-4 py-2 rounded ${activeTab === "users" ? "bg-green-500 text-white" : "bg-white"}`}
            onClick={() => setActiveTab("users")}
          >
            User Management
          </button>
          <button
            className={`mr-4 px-4 py-2 rounded ${activeTab === "donations" ? "bg-green-500 text-white" : "bg-white"}`}
            onClick={() => setActiveTab("donations")}
          >
            Donation Approval
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "analytics" ? "bg-green-500 text-white" : "bg-white"}`}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === "users" && <UserManagement />}
          {activeTab === "donations" && <DonationApproval />}
          {activeTab === "analytics" && <AnalyticsPanel />}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

