import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Dashboard';
import DietTracker from './components/DietTracker';
import HealthRecords from './components/HealthRecords';
import Credentials from './components/Credentials';
import VerifyPage from './components/VerifyPage';
import LandingPage from './components/LandingPage';
import { useStore } from './store/useStore';

function App() {
  const { user } = useStore();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">ATHLYX</h1>
            <nav className="flex space-x-4">
              <a href="/" className="text-gray-600 hover:text-blue-600">Dashboard</a>
              <a href="/health" className="text-gray-600 hover:text-blue-600">Health Records</a>
              <a href="/diet" className="text-gray-600 hover:text-blue-600">Diet Tracker</a>
              <a href="/credentials" className="text-gray-600 hover:text-blue-600">Credentials</a>
              <a href="/verify" className="text-gray-600 hover:text-blue-600">Verify</a>
            </nav>
          </div>
        </header>

        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/health" element={<HealthRecords />} />
            <Route path="/diet" element={<DietTracker />} />
            <Route path="/credentials" element={<Credentials />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
