import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Dashboard';
import DietTracker from './components/DietTracker';
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
              <a href="/diet" className="text-gray-600 hover:text-blue-600">Diet Tracker</a>
            </nav>
          </div>
        </header>

        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/diet" element={<DietTracker />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
