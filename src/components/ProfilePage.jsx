import React, { useState, useEffect, useRef } from 'react';
import { Camera, Edit3, Save, X, ArrowLeft, User, Mail, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserDetailApi, UpdateUserProfileApi } from '../services/Api';
import { isAuthenticated } from '../services/Auth';

export default function ProfilePage() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    
    const [user, setUser] = useState({
        name: "",
        email: "",
        avatar: "",
        createdAt: ""
    });
    
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({
        displayName: "",
        photoUrl: ""
    });
    
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setSaving] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }
        
        fetchUserData();
    }, [navigate]);

    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            const response = await UserDetailApi();
            const userData = response.data.users[0];
            
            setUser({
                name: userData.displayName || '',
                email: userData.email || '',
                avatar: userData.photoUrl || '',
                createdAt: userData.createdAt || ''
            });
            
            setEditData({
                displayName: userData.displayName || '',
                photoUrl: userData.photoUrl || ''
            });
            
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Failed to load profile data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditToggle = () => {
        if (editMode) {
            // Cancel edit - reset edit data
            setEditData({
                displayName: user.name,
                photoUrl: user.avatar
            });
            setError('');
            setSuccess('');
        }
        setEditMode(!editMode);
    };

    const handleSave = async () => {
        if (!editData.displayName.trim()) {
            setError('Name cannot be empty');
            return;
        }

        try {
            setSaving(true);
            setError('');
            
            const updateData = {
                displayName: editData.displayName.trim(),
                photoUrl: editData.photoUrl
            };
            
            await UpdateUserProfileApi(updateData);
            
            // Update local state
            setUser(prevUser => ({
                ...prevUser,
                name: updateData.displayName,
                avatar: updateData.photoUrl
            }));
            
            setEditMode(false);
            setSuccess('Profile updated successfully!');
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(''), 3000);
            
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleImageClick = () => {
        if (editMode) {
            fileInputRef.current?.click();
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
                return;
            }

            // Validate file size (max 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                setError('File size must be less than 5MB');
                return;
            }

            setIsUploadingImage(true);
            setError('');

            // Convert file to base64 URL
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                setEditData(prev => ({
                    ...prev,
                    photoUrl: imageUrl
                }));
                setIsUploadingImage(false);
            };

            reader.onerror = () => {
                setIsUploadingImage(false);
                setError('Error reading file. Please try again.');
            };

            reader.readAsDataURL(file);
        }
        
        // Reset the input value
        event.target.value = '';
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                    <p className="text-white">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back
                    </button>
                    
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        My Profile
                    </h1>
                    
                    <button
                        onClick={handleEditToggle}
                        className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                        {editMode ? (
                            <>
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </>
                        ) : (
                            <>
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit Profile
                            </>
                        )}
                    </button>
                </div>

                {/* Alert Messages */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-red-400">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <p className="text-green-400">{success}</p>
                    </div>
                )}

                {/* Profile Card */}
                <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-xl">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                        
                        {/* Profile Image */}
                        <div className="relative">
                            <div 
                                className={`relative ${editMode ? 'cursor-pointer group' : ''}`}
                                onClick={handleImageClick}
                            >
                                <img
                                    className="w-32 h-32 rounded-full object-cover border-4 border-purple-400 shadow-lg"
                                    src={editMode ? editData.photoUrl : user.avatar || '/api/placeholder/128/128'}
                                    alt={user.name}
                                />
                                
                                {isUploadingImage && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                    </div>
                                )}
                                
                                {editMode && !isUploadingImage && (
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full flex items-center justify-center transition-all duration-200">
                                        <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                )}
                            </div>
                            
                            {editMode && (
                                <div className="absolute -bottom-2 -right-2 bg-purple-600 p-2 rounded-full shadow-lg">
                                    <Camera className="w-4 h-4 text-white" />
                                </div>
                            )}
                        </div>

                        {/* Profile Information */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="space-y-6">
                                
                                {/* Name Field */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                                        <User className="w-4 h-4 mr-2" />
                                        Display Name
                                    </label>
                                    {editMode ? (
                                        <input
                                            type="text"
                                            value={editData.displayName}
                                            onChange={(e) => setEditData(prev => ({
                                                ...prev,
                                                displayName: e.target.value
                                            }))}
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Enter your name"
                                        />
                                    ) : (
                                        <p className="text-2xl font-bold text-white">{user.name || 'No name set'}</p>
                                    )}
                                </div>

                                {/* Email Field (Read-only) */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Email Address
                                    </label>
                                    <p className="text-lg text-gray-300 bg-slate-700/30 px-4 py-3 rounded-lg border border-white/5">
                                        {user.email}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                                </div>

                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                                        <User className="w-4 h-4 mr-2" />
                                        PhotoUrl
                                    </label>
                                    {editMode ? (
                                        <input
                                            type="text"
                                            value={editData.photoUrl}
                                            onChange={(e) => setEditData(prev => ({
                                                ...prev,
                                                photoUrl: e.target.value
                                            }))}
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Enter your name"
                                        />
                                    ) : (
                                        <p className="text-lg text-gray-300">{'Picture_URL' || 'No name set'}</p>
                                    )}
                                </div>
                                {/* Member Since */}
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Member Since
                                    </label>
                                    <p className="text-lg text-gray-300">
                                        {formatDate(user.createdAt)}
                                    </p>
                                </div>

                                {/* Save Button */}
                                {editMode && (
                                    <div className="flex space-x-4 pt-4">
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white rounded-lg transition-colors font-medium"
                                        >
                                            {isSaving ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-5 h-5 mr-2" />
                                                    Save Changes
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Profile Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-2">Profile Completion</h3>
                        <div className="flex items-center">
                            <div className="flex-1 bg-slate-700 rounded-full h-2 mr-3">
                                <div 
                                    className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${user.name && user.avatar ? '100' : user.name || user.avatar ? '75' : '50'}%` }}
                                ></div>
                            </div>
                            <span className="text-sm text-gray-300">
                                {user.name && user.avatar ? '100' : user.name || user.avatar ? '75' : '50'}%
                            </span>
                        </div>
                    </div>

                    <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-2">Account Status</h3>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            <span className="text-green-400 font-medium">Active</span>
                        </div>
                    </div>

                    <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-2">Security</h3>
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            <span className="text-green-400 font-medium">Verified</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                style={{ display: 'none' }}
            />
        </div>
    );
}