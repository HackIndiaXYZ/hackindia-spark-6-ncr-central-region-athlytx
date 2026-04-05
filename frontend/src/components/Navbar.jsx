import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { LogOut, Activity } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-600">ATHLYX</span>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md">
              Dashboard
            </Link>
            <Link to="/health" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md">
              Health Records
            </Link>
            <Link to="/diet" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md">
              Diet Tracker
            </Link>
            <Link to="/credentials" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md">
              Credentials
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{user?.name || 'Athlete'}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
