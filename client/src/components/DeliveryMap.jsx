import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { getRouteOptimization, calculateETA } from '../services/mapService'

const DeliveryMap = ({ deliveries, volunteers, selectedDelivery }) => {
    const mapRef = useRef(null)
    const mapInstance = useRef(null)
    const defaultCenter = [12.9716, 77.5946] // Bangalore center

    useEffect(() => {
        // Initialize map only if it doesn't exist
        if (!mapInstance.current && mapRef.current) {
            mapInstance.current = L.map(mapRef.current).setView(defaultCenter, 13)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(mapInstance.current)

            // Fix default icon issue
            let DefaultIcon = L.icon({
                iconUrl: icon,
                shadowUrl: iconShadow,
                iconSize: [25, 41],
                iconAnchor: [12, 41]
            })
            L.Marker.prototype.options.icon = DefaultIcon
        }

        // Cleanup on unmount
        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove()
                mapInstance.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (selectedDelivery) {
            fetchOptimizedRoute(selectedDelivery)
        }
    }, [selectedDelivery])

    const fetchOptimizedRoute = async (delivery) => {
        try {
            const route = await getRouteOptimization(delivery)
            setRoutes([route])
        } catch (error) {
            console.error('Error fetching route:', error)
        }
    }

    // Update markers when deliveries or selected delivery changes
    useEffect(() => {
        if (!mapInstance.current) return

        // Clear existing markers
        mapInstance.current.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                mapInstance.current.removeLayer(layer)
            }
        })

        // Add markers for deliveries
        deliveries.forEach((delivery) => {
            // Use default coordinates if none provided
            const lat = delivery.location?.coordinates?.[1] || defaultCenter[0]
            const lng = delivery.location?.coordinates?.[0] || defaultCenter[1]

            const marker = L.marker([lat, lng])
                .addTo(mapInstance.current)
                .bindPopup(`
                    <b>${delivery.foodType}</b><br>
                    Status: ${delivery.status}<br>
                    Quantity: ${delivery.quantity}
                `)

            if (selectedDelivery && selectedDelivery._id === delivery._id) {
                marker.openPopup()
                mapInstance.current.setView([lat, lng], 15)
            }
        })

        // Add markers for volunteers
        volunteers.forEach((volunteer) => {
            if (volunteer.location) {
                const lat = volunteer.location.coordinates?.[1] || defaultCenter[0]
                const lng = volunteer.location.coordinates?.[0] || defaultCenter[1]

                L.marker([lat, lng], {
                    icon: L.divIcon({
                        className: 'volunteer-marker',
                        html: '🚗',
                        iconSize: [25, 25]
                    })
                })
                    .addTo(mapInstance.current)
                    .bindPopup(`Volunteer: ${volunteer.name}`)
            }
        })
    }, [mapInstance, deliveries, selectedDelivery, volunteers])

    return <div id="map" ref={mapRef} style={{ height: '500px', width: '100%' }} />
}

export default DeliveryMap 