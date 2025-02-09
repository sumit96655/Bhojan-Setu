import { Clock, Truck, MapPin } from 'lucide-react'

const ActiveDeliveries = ({ deliveries, onSelectDelivery, selectedDelivery }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Active Deliveries</h2>
            </div>
            <div className="overflow-y-auto max-h-[550px]">
                {deliveries.map((delivery) => (
                    <div
                        key={delivery._id}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedDelivery?._id === delivery._id ? 'bg-blue-50' : ''
                            }`}
                        onClick={() => onSelectDelivery(delivery)}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-medium text-gray-900">{delivery.foodType}</h3>
                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {delivery.pickupAddress}
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${delivery.status === 'in_transit'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                {delivery.status}
                            </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                ETA: {delivery.eta}
                            </div>
                            <div className="flex items-center">
                                <Truck className="w-4 h-4 mr-1" />
                                {delivery.volunteerName}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ActiveDeliveries 