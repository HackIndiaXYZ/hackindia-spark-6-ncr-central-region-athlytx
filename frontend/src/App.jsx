import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Dashboard';
import DietTracker from './components/DietTracker';
import HealthRecords from './components/HealthRecords';
import Credentials from './components/Credentials';
import VerifyPage from './components/VerifyPage';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/health" element={<HealthRecords />} />
        <Route path="/diet" element={<DietTracker />} />
        <Route path="/credentials" element={<Credentials />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
