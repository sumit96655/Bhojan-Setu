"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default function MapView({ donations, selectedDonation }) {
  const mapRef = useRef(null)
  const markersRef = useRef({})

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([20.5937, 78.9629], 5)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current)
    }

    // Add markers for all donations
    donations.forEach((donation) => {
      if (!markersRef.current[donation._id]) {
        const marker = L.marker([20.5937, 78.9629])
          .addTo(mapRef.current)
          .bindPopup(donation.donorName)
        markersRef.current[donation._id] = marker
      }
    })

    // Remove markers for donations that no longer exist
    Object.keys(markersRef.current).forEach((id) => {
      if (!donations.find((d) => d._id === id)) {
        mapRef.current.removeLayer(markersRef.current[id])
        delete markersRef.current[id]
      }
    })

    // Focus on selected donation
    if (selectedDonation) {
      mapRef.current.setView([selectedDonation.location.lat, selectedDonation.location.lng], 13)
      markersRef.current[selectedDonation._id].openPopup()
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [donations, selectedDonation])

  return <div id="map" className="h-96 rounded-lg shadow-md"></div>
}

