import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { get, put } from '../services/ApiEndpoint'
import { Truck, Clock, Users, BarChart2, MapPin } from 'lucide-react'
import DeliveryMap from '../components/DeliveryMap'
import ActiveDeliveries from '../components/ActiveDeliveries'
// import AssignmentPanel from '../components/AssignmentPanel'
// import AnalyticsPanel from '../components/AnalyticsPanel'

const LogisticsHub = () => {
    const [activeDeliveries, setActiveDeliveries] = useState([])
    const [availableVolunteers, setAvailableVolunteers] = useState([])
    const [selectedDelivery, setSelectedDelivery] = useState(null)
    const [view, setView] = useState('map') // map, analytics, assignment

    useEffect(() => {
        fetchActiveDeliveries()
        fetchAvailableVolunteers()
        // Set up periodic updates
        const interval = setInterval(fetchActiveDeliveries, 30000)
        return () => clearInterval(interval)
    }, [])

    const fetchActiveDeliveries = async () => {
        try {
            const response = await get('/api/donations')
            setActiveDeliveries(response.data || [])
        } catch (error) {
            toast.error('Failed to fetch active deliveries')
        }
    }

    const fetchAvailableVolunteers = async () => {
        try {
            const response = await get('/api/volunteer/available')
            setAvailableVolunteers(response.data || [])
        } catch (error) {
            toast.error('Failed to fetch volunteers')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex space-x-8">
                            <button
                                onClick={() => setView('map')}
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${view === 'map'
                                    ? 'border-blue-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <MapPin className="w-4 h-4 mr-2" />
                                Live Tracking
                            </button>
                            <button
                                onClick={() => setView('list')}
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${view === 'list'
                                    ? 'border-blue-500 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Truck className="w-4 h-4 mr-2" />
                                Deliveries List
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Panel - Active Deliveries */}
                    <div className="lg:col-span-1">
                        <ActiveDeliveries
                            deliveries={activeDeliveries}
                            onSelectDelivery={setSelectedDelivery}
                            selectedDelivery={selectedDelivery}
                        />
                    </div>

                    {/* Right Panel - Map or List View */}
                    <div className="lg:col-span-2">
                        {view === 'map' ? (
                            <DeliveryMap
                                deliveries={activeDeliveries}
                                volunteers={availableVolunteers}
                                selectedDelivery={selectedDelivery}
                            />
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold mb-4">All Active Deliveries</h2>
                                <div className="space-y-4">
                                    {activeDeliveries.map((delivery) => (
                                        <div
                                            key={delivery._id}
                                            className="border-b pb-4 last:border-b-0 last:pb-0"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium">{delivery.foodType}</h3>
                                                    <p className="text-sm text-gray-500">
                                                        {delivery.pickupAddress}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${delivery.status === 'in_transit'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-green-100 text-green-800'
                                                        }`}
                                                >
                                                    {delivery.status}
                                                </span>
                                            </div>
                                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                                <Clock className="w-4 h-4 mr-1" />
                                                ETA: {delivery.eta}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogisticsHub