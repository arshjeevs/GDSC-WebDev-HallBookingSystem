import { useState } from 'react';
import Button from '../components/Button';

const MOCK_PENDING_REQUESTS = [
  {
    id: '1',
    hallName: 'Aryabhatta',
    date: '2024-03-20',
    startTime: '10:00',
    endTime: '12:00',
    bookedBy: 'John Doe',
    status: 'pending'
  },
  {
    id: '2',
    hallName: 'Bhaskara',
    date: '2024-03-21',
    startTime: '14:00',
    endTime: '16:00',
    bookedBy: 'Jane Smith',
    status: 'pending'
  }
];

export default function Admin() {
  const [requests, setRequests] = useState(MOCK_PENDING_REQUESTS);
  const [loading, setLoading] = useState<(null);

  const handleAction = async (id, action) => {
    setLoading(id);
    
    // Simulated API call
    setTimeout(() => {
      setRequests(requests.filter(req => req.id !== id));
      setLoading(null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Requests</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested By
                </th>
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.bookedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.hallName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.startTime} - {request.endTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleAction(request.id, 'approve')}
                        isLoading={loading === request.id}
                        disabled={loading !== null}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleAction(request.id, 'reject')}
                        isLoading={loading === request.id}
                        disabled={loading !== null}
                      >
                        Reject
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {requests.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No pending requests.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}