import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { uploadHealthRecord, getUserHealthRecords } from '../services/api';
import toast from 'react-hot-toast';

export default function HealthRecords() {
  const { user } = useStore();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form states
  const [recordType, setRecordType] = useState('medical_report');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (user) {
      fetchRecords();
    }
  }, [user]);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await getUserHealthRecords(user.id);
      setRecords(response.data);
    } catch (error) {
      toast.error('Failed to fetch records');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('record_type', recordType);
    if (description) formData.append('description', description);
    formData.append('file', selectedFile);

    try {
      await uploadHealthRecord(formData);
      toast.success('Record uploaded & encrypted successfully via IPFS');
      setSelectedFile(null);
      setDescription('');
      fetchRecords();
    } catch (error) {
      toast.error('Failed to upload record');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Medical Health Records</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Upload New Record</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Record Type</label>
              <select
                value={recordType}
                onChange={(e) => setRecordType(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="medical_report">Medical Report</option>
                <option value="fitness_test">Fitness Test</option>
                <option value="injury_report">Injury Report</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description (Optional)</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">File</label>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {uploading ? 'Encrypting & Uploading...' : 'Upload Record'}
            </button>
          </form>
        </div>

        {/* Records List */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Your Encrypted Records</h2>
          
          {loading ? (
            <p className="text-gray-500">Loading records...</p>
          ) : records.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Type</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Description</th>
                    <th className="py-2">IPFS Hash (Encrypted)</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 capitalize">{record.record_type.replace('_', ' ')}</td>
                      <td className="py-3">{new Date(record.uploaded_at).toLocaleDateString()}</td>
                      <td className="py-3">{record.description || '-'}</td>
                      <td className="py-3">
                        <a 
                          href={`https://gateway.pinata.cloud/ipfs/${record.ipfs_hash}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline truncate inline-block max-w-[150px]"
                        >
                          {record.ipfs_hash}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No health records uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
