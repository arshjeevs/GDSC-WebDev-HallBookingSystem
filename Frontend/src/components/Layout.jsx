import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Calendar, ClipboardList, Settings } from 'lucide-react';

export default function Layout({ children }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Calendar className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Hall Booking</span>
              </div>
              {auth.user && (
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <button
                    onClick={() => navigate('/request')}
                    className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
                  >
                    <ClipboardList className="h-5 w-5 mr-1" />
                    Book Slot
                  </button>
                  <button
                    onClick={() => navigate('/schedules')}
                    className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
                  >
                    <Calendar className="h-5 w-5 mr-1" />
                    Schedules
                  </button>
                  {auth.user.role === 'admin' && (
                    <button
                      onClick={() => navigate('/admin')}
                      className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
                    >
                      <Settings className="h-5 w-5 mr-1" />
                      Admin
                    </button>
                  )}
                </div>
              )}
            </div>
            {auth.user ? (
              <div className="flex items-center">
                <span className="mr-4 text-sm font-medium text-gray-900">
                  {auth.user.username}
                </span>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}