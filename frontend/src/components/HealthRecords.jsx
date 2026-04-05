import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { uploadHealthRecord, getUserHealthRecords } from '../services/api';
import toast from 'react-hot-toast';
import { Upload, FileText } from 'lucide-react';

export default function HealthRecords() {
  const { user } = useStore();
  const [records, setRecords] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [recordType, setRecordType] = useState('medical_report');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (user) {
      fetchRecords();
    }
  }, [user]);

  const fetchRecords = async () => {
    try {
      const response = await getUserHealthRecords(user.id);
      setRecords(response.data);
    } catch (error) {
      console.error('Failed to fetch records:', error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', user.id);
    formData.append('record_type', recordType);
    formData.append('description', description);

    try {
      await uploadHealthRecord(formData);
      toast.success('Health record uploaded successfully!');
      setFile(null);
      setDescription('');
      fetchRecords();
    } catch (error) {
      toast.error('Failed to upload record');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Health Records</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Record</span>
          </h2>
          
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Record Type</label>
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
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
                placeholder="Brief description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">File</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full px-3 py-2 border rounded-md"
                accept=".pdf,.jpg,.png"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400"
            >
              {uploading ? 'Uploading...' : 'Upload to IPFS'}
            </button>
          </form>
        </div>

        {/* Records List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Records</h2>
          
          {records.length > 0 ? (
            <div className="space-y-3">
              {records.map((record) => (
                <div key={record.id} className="p-4 border rounded-md hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-purple-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold capitalize">{record.record_type.replace('_', ' ')}</h3>
                      <p className="text-sm text-gray-600">{record.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        IPFS: {record.ipfs_hash.substring(0, 20)}...
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No records uploaded yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
