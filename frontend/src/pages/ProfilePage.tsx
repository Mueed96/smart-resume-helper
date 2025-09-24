import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Edit, Save, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

// --- THE FIX: Create a clean base URL constant from the environment variable ---
const API_BASE_URL = import.meta.env.VITE_API_URL;

export function ProfilePage() {
  const { user, token, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!token || !user || editedName === user.name) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      // --- THE FIX: Use the new base URL constant ---
      const response = await axios.patch(
        `${API_BASE_URL}/auth/profile`,
        { name: editedName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      login(response.data.access_token);
      toast.success('Name updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update name. Please try again.');
      setEditedName(user.name);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedName(user?.name || '');
    setIsEditing(false);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white via-blue-50/30 to-white">
      <div className="w-full max-w-2xl">
        <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-8">
            <User className="h-8 w-8 text-text-subtle" />
            <h1 className="text-3xl font-extrabold text-text-heading">My Profile</h1>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between min-h-[68px]">
              <div>
                <label className="text-sm font-medium text-text-subtle">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-background border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                ) : (
                  <p className="text-lg font-semibold text-text-heading">{user?.name}</p>
                )}
              </div>
              {isEditing ? (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleCancel} 
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-text-secondary text-sm font-medium rounded-xl shadow-sm border border-gray-200 hover:bg-gray-100 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <X size={16} /> Cancel
                  </button>
                  <button 
                    onClick={handleSave} 
                    disabled={isLoading || editedName === user?.name} 
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-emerald-500 text-white text-sm font-bold rounded-xl shadow-sm hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 disabled:bg-gray-300 disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Save size={16} /> {isLoading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="p-2 border border-primary text-primary rounded-full hover:bg-primary/10 transition-all duration-200"
                >
                  <Edit size={20} />
                </button>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="text-sm font-medium text-text-subtle">Email Address</label>
              <p className="text-lg text-text-body flex items-center gap-2"><Mail size={16} /> {user?.email}</p>
            </div>

            {/* Date Joined Field */}
            <div>
              <label className="text-sm font-medium text-text-subtle">Date Joined</label>
              <p className="text-lg text-text-body flex items-center gap-2">
                <Calendar size={16} /> 
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}