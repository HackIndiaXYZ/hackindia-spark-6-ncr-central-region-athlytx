import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useStore } from './store/useStore';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import HealthRecords from './components/HealthRecords';
import DietTracker from './components/DietTracker';
import Credentials from './components/Credentials';
import VerifyPage from './components/VerifyPage';
import Navbar from './components/Navbar';

function App() {
  const { isAuthenticated } = useStore();

  return (
    <Router>
      <div className="min-h-screen">
        <Toaster position="top-right" />
        
        {isAuthenticated && <Navbar />}
        
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/health" element={isAuthenticated ? <HealthRecords /> : <Navigate to="/login" />} />
          <Route path="/diet" element={isAuthenticated ? <DietTracker /> : <Navigate to="/login" />} />
          <Route path="/credentials" element={isAuthenticated ? <Credentials /> : <Navigate to="/login" />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
