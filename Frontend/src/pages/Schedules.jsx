import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

const MOCK_BOOKINGS = [
  {
    id: '1',
    hallName: 'Aryabhatta',
    date: '2024-03-20',
    startTime: '10:00',
    endTime: '12:00',
    bookedBy: 'John Doe',
    status: 'approved'
  },
  {
    id: '2',
    hallName: 'Bhaskara',
    date: '2024-03-21',
    startTime: '14:00',
    endTime: '16:00',
    bookedBy: 'Jane Smith',
    status: 'approved'
  }
];

export default function Schedules() {
  const [selectedHall, setSelectedHall] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const filteredBookings = MOCK_BOOKINGS.filter(booking => {
    if (selectedHall && booking.hallName !== selectedHall) return false;
    if (selectedDate && booking.date !== selectedDate) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Approved Schedules</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="hallFilter" className="block text-sm font-medium text-gray-700">
              Filter by Hall
            </label>
            <select
              id="hallFilter"
              value={selectedHall}
              onChange={(e) => setSelectedHall(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Halls</option>
              <option value="Aryabhatta">Aryabhatta</option>
              <option value="Bhaskara">Bhaskara</option>
              <option value="Ramanujan">Ramanujan</option>
              <option value="Newton">Newton</option>
            </select>
          </div>

          <div>
            <label htmlFor="dateFilter" className="block text-sm font-medium text-gray-700">
              Filter by Date
            </label>
            <input
              type="date"
              id="dateFilter"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hall
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booked By
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.hallName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {booking.date}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {booking.startTime} - {booking.endTime}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.bookedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredBookings.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No bookings found for the selected filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}