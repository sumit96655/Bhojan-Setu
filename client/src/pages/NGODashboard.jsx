// "use client"

// import { useState, useEffect } from "react"
// import RequestList from "./RequestList"
// import MapView from "./MapView"
// import DonationDetails from "./DonationDetails"
// import io from "socket.io-client"

// const socket = io("http://localhost:5000") // Adjust the URL as needed

// export default function NGODashboard() {
//   const [selectedDonation, setSelectedDonation] = useState(null)
//   const [donations, setDonations] = useState([])

//   useEffect(() => {
//     // Fetch initial donations data
//     fetchDonations()

//     // Listen for real-time updates
//     socket.on("newDonation", (donation) => {
//       setDonations((prevDonations) => [...prevDonations, donation])
//     })

//     return () => {
//       socket.off("newDonation")
//     }
//   }, [])

//   const fetchDonations = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/donations")
//       const data = await response.json()
//       setDonations(data)
//     } catch (error) {
//       console.error("Error fetching donations:", error)
//     }
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="bg-white shadow-md">
//           <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//             <h1 className="text-3xl font-bold text-gray-900">NGO Dashboard</h1>
//           </div>
//         </header>
//         <main className="flex-1 flex">
//           <div className="w-1/3 bg-white p-6 overflow-auto">
//             <RequestList donations={donations} onSelectDonation={setSelectedDonation} />
//           </div>
//           <div className="w-2/3 p-6 flex flex-col">
//             <MapView donations={donations} selectedDonation={selectedDonation} />
//             {selectedDonation && (
//               <DonationDetails donation={selectedDonation} onClose={() => setSelectedDonation(null)} />
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import RequestList from "./RequestList"
import MapView from "./MapView"
import DonationDetails from "./DonationDetails"

// Mock data for demonstration
const mockDonations = [
  {
    _id: "1",
    donorName: "Restaurant A",
    foodType: "Cooked Meals",
    quantity: 50,
    status: "pending",
    createdAt: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
    address: "123 Main St, Mumbai, India",
    location: { lat: 19.076, lng: 72.8777 },
  },
  {
    _id: "2",
    donorName: "Grocery Store B",
    foodType: "Fresh Produce",
    quantity: 100,
    status: "accepted",
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    expiryDate: new Date(Date.now() + 172800000).toISOString(), // 48 hours from now
    address: "456 Park Ave, Delhi, India",
    location: { lat: 28.6139, lng: 77.209 },
  },
  {
    _id: "3",
    donorName: "Bakery C",
    foodType: "Bread and Pastries",
    quantity: 30,
    status: "collected",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 24 hours ago
    expiryDate: new Date(Date.now() + 43200000).toISOString(), // 12 hours from now
    address: "789 Baker St, Bangalore, India",
    location: { lat: 12.9716, lng: 77.5946 },
  },
]

export default function NGODashboard() {
  const [selectedDonation, setSelectedDonation] = useState(null)
  const [donations, setDonations] = useState([])

  useEffect(() => {
    // Simulate fetching data
    const fetchDonations = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setDonations(mockDonations)
      } catch (error) {
        console.error("Error fetching donations:", error)
      }
    }

    fetchDonations()

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newDonation = {
        _id: Date.now().toString(),
        donorName: `New Donor ${Math.floor(Math.random() * 100)}`,
        foodType: "Mixed Items",
        quantity: Math.floor(Math.random() * 50) + 10,
        status: "pending",
        createdAt: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 86400000).toISOString(),
        address: `${Math.floor(Math.random() * 1000)} Random St, India`,
        location: {
          lat: 20.5937 + (Math.random() - 0.5) * 10,
          lng: 78.9629 + (Math.random() - 0.5) * 10,
        },
      }
      setDonations((prevDonations) => [...prevDonations, newDonation])
    }, 30000) // Add a new donation every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">NGO Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 flex">
          <div className="w-1/3 bg-white p-6 overflow-auto">
            <RequestList donations={donations} onSelectDonation={setSelectedDonation} />
          </div>
          <div className="w-2/3 p-6 flex flex-col">
            <MapView donations={donations} selectedDonation={selectedDonation} />
            {selectedDonation && (
              <DonationDetails donation={selectedDonation} onClose={() => setSelectedDonation(null)} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

