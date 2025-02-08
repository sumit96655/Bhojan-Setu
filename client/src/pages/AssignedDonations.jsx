// AssignedDonations.js
import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, Truck } from 'lucide-react';

const AssignedDonations = () => {
  const [donations, setDonations] = useState([
    {
      id: 1,
      donorName: 'Taj Restaurant',
      address: '123 MG Road, Bangalore',
      foodType: 'Cooked meals',
      quantity: '50 meals',
      pickupTime: '2024-02-08T14:00',
      status: 'pending',
      contact: '+91 9876543210',
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    {
      id: 2,
      donorName: 'Fresh Mart Grocery',
      address: '45 Church Street, Bangalore',
      foodType: 'Fresh produce',
      quantity: '25 kg',
      pickupTime: '2024-02-08T15:30',
      status: 'in_transit',
      contact: '+91 9876543211',
      coordinates: { lat: 12.9716, lng: 77.5946 }
    }
  ]);

  const updateStatus = (id, newStatus) => {
    setDonations(donations.map(donation =>
      donation.id === id ? { ...donation, status: newStatus } : donation
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Assigned Donations</h2>
      <div className="space-y-4">
        {donations.map(donation => (
          <div key={donation.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{donation.donorName}</h3>
                <div className="flex items-center text-gray-600 mt-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{donation.address}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(donation.status)}`}>
                {donation.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-600">Food Type</p>
                <p className="font-medium">{donation.foodType}</p>
              </div>
              <div>
                <p className="text-gray-600">Quantity</p>
                <p className="font-medium">{donation.quantity}</p>
              </div>
              <div>
                <p className="text-gray-600">Contact</p>
                <p className="font-medium">{donation.contact}</p>
              </div>
              <div>
                <p className="text-gray-600">Pickup Time</p>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <p className="font-medium">
                    {new Date(donation.pickupTime).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              {donation.status === 'pending' && (
                <button
                  onClick={() => updateStatus(donation.id, 'in_transit')}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Start Pickup
                </button>
              )}
              {donation.status === 'in_transit' && (
                <button
                  onClick={() => updateStatus(donation.id, 'completed')}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedDonations;