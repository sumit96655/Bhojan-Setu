// TaskManagement.js
import React, { useState } from 'react';
import { Calendar, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TaskManagement = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'calendar', or 'analytics'
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const tasks = [
    {
      id: 1,
      date: '2024-02-08',
      completed: 3,
      total: 5,
      timeSlots: [
        { time: '10:00 AM', status: 'completed' },
        { time: '2:00 PM', status: 'in_progress' },
        { time: '4:00 PM', status: 'pending' }
      ]
    },
    {
      id: 2,
      date: '2024-02-09',
      completed: 2,
      total: 4,
      timeSlots: [
        { time: '11:00 AM', status: 'pending' },
        { time: '3:00 PM', status: 'pending' }
      ]
    }
  ];

  // Analytics data
  const analyticsData = [
    { name: 'Mon', completed: 4, pending: 2 },
    { name: 'Tue', completed: 3, pending: 3 },
    { name: 'Wed', completed: 5, pending: 1 },
    { name: 'Thu', completed: 2, pending: 4 },
    { name: 'Fri', completed: 4, pending: 2 },
    { name: 'Sat', completed: 3, pending: 1 },
    { name: 'Sun', completed: 1, pending: 3 }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDay };
  };

  const { daysInMonth, firstDay } = getDaysInMonth(currentMonth);

  const renderCalendarDays = () => {
    const days = [];
    const monthTasks = tasks.reduce((acc, task) => {
      const date = new Date(task.date).getDate();
      acc[date] = task;
      return acc;
    }, {});

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const task = monthTasks[day];
      days.push(
        <div key={day} className="h-24 border border-gray-200 p-2">
          <div className="font-medium">{day}</div>
          {task && (
            <div className="mt-1 text-xs">
              <div className="bg-blue-100 text-blue-800 rounded px-1 py-0.5 mb-1">
                {task.completed}/{task.total} Tasks
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const renderListView = () => (
    <div className="space-y-6">
      {tasks.map(task => (
        <div key={task.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {new Date(task.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
            <div className="text-sm text-gray-600">
              {task.completed}/{task.total} Tasks Completed
            </div>
          </div>

          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${(task.completed / task.total) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            {task.timeSlots.map((slot, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <span className="font-medium">{slot.time}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  slot.status === 'completed' ? 'bg-green-100 text-green-800' :
                  slot.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {slot.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderCalendarView = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <button 
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-px">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium py-2">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );

  const renderAnalyticsView = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-6">Weekly Task Analytics</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completed" fill="#059669" name="Completed Tasks" />
            <Bar dataKey="pending" fill="#EAB308" name="Pending Tasks" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Task Management</h2>
        <div className="flex space-x-4">
          <button 
            onClick={() => setCurrentView('list')}
            className={`flex items-center px-4 py-2 rounded-md hover:bg-gray-50 ${
              currentView === 'list' ? 'bg-blue-50 text-blue-600' : 'bg-white border'
            }`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            List View
          </button>
          <button 
            onClick={() => setCurrentView('calendar')}
            className={`flex items-center px-4 py-2 rounded-md hover:bg-gray-50 ${
              currentView === 'calendar' ? 'bg-blue-50 text-blue-600' : 'bg-white border'
            }`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Calendar
          </button>
          <button 
            onClick={() => setCurrentView('analytics')}
            className={`flex items-center px-4 py-2 rounded-md hover:bg-gray-50 ${
              currentView === 'analytics' ? 'bg-blue-50 text-blue-600' : 'bg-white border'
            }`}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </button>
        </div>
      </div>

      {currentView === 'list' && renderListView()}
      {currentView === 'calendar' && renderCalendarView()}
      {currentView === 'analytics' && renderAnalyticsView()}
    </div>
  );
};

export default TaskManagement;