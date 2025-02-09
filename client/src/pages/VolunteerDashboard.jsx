// VolunteerDashboard.js
import React, { useState } from 'react';
import {
  Trophy,
  CalendarCheck,
  Users,
  Clock,
  TrendingUp,
  Bell,
  Search,
  User,
  LogOut
} from 'lucide-react';
import AssignedDonations from './AssignedDonations';
import TaskManagement from './TaskManagement';

const VolunteerDashboard = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New donation pickup request nearby",
      time: "10 minutes ago"
    },
    {
      id: 2,
      message: "Completed your monthly goal!",
      time: "2 hours ago"
    }
  ]);

  const stats = {
    totalPickups: 145,
    monthlyPickups: 23,
    peopleImpacted: 890,
    completionRate: 98.5
  };

  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Pickups</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalPickups}</h3>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Trophy className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-green-600 text-sm">↑ 12% increase</span>
          <span className="text-gray-500 text-sm"> from last month</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Monthly Pickups</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.monthlyPickups}</h3>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <CalendarCheck className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-gray-500 text-sm">7 pickups this week</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">People Impacted</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.peopleImpacted}</h3>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-purple-600 text-sm">Making a difference</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Completion Rate</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.completionRate}%</h3>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full">
            <TrendingUp className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-green-600 text-sm">↑ 2.3% increase</span>
          <span className="text-gray-500 text-sm"> from last week</span>
        </div>
      </div>
    </div>
  );

  //   const renderHeader = () => (
  //     <div className="bg-white shadow-sm mb-8">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="flex items-center justify-between h-16">
  //           <div className="flex items-center">
  //             <div className="flex-shrink-0">
  //               <img className="h-8 w-8" src="/api/placeholder/32/32" alt="Logo" />
  //             </div>
  //             {/* <div className="hidden md:block">
  //               <div className="ml-10 flex items-baseline space-x-4">
  //                 <a href="#" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
  //                 <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Schedule</a>
  //                 <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">History</a>
  //                 <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Resources</a>
  //               </div>
  //             </div> */}
  //           </div>
  //           <div className="flex items-center space-x-4">
  //             <div className="relative">
  //               <input
  //                 type="text"
  //                 placeholder="Search..."
  //                 className="w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
  //               />
  //               <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
  //             </div>
  //             <div className="relative">
  //               <button className="p-2 rounded-full hover:bg-gray-100">
  //                 <Bell className="h-6 w-6 text-gray-500" />
  //                 <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
  //               </button>
  //             </div>
  //             <div className="flex items-center space-x-2">
  //               <img className="h-8 w-8 rounded-full" src="/api/placeholder/32/32" alt="Profile" />
  //               <span className="text-sm font-medium text-gray-700">John Doe</span>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );

  const renderNotifications = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Notifications</h2>
        <button className="text-blue-600 text-sm hover:text-blue-700">View all</button>
      </div>
      <div className="space-y-4">
        {notifications.map(notification => (
          <div key={notification.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-2 rounded-full">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* {renderHeader()} */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Volunteer Dashboard</h1>
            <p className="mt-2 text-gray-600">Track and manage your food pickup assignments</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            View Schedule
          </button>
        </div>

        {renderStats()}
        {renderNotifications()}

        <div className="grid grid-cols-1 gap-8">
          <AssignedDonations />
          <TaskManagement />
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;