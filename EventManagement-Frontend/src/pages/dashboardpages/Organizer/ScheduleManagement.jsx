import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ScheduleManagement = () => {
    const [expos, setExpos] = useState([]);
    const [selectedExpo, setSelectedExpo] = useState('');
    const [selectedExpoData, setSelectedExpoData] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        speaker: '',
        location: '',
    });

    // ✅ Fetch expos from API on component mount
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/expos")
            .then((res) => {
                setExpos(res.data);
            })
            .catch((err) => {
                console.error("Error fetching expos:", err);
            });
    }, []);

    const handleChange = (event) => {
        setSelectedExpo(event.target.value);
    };

    const handleSearch = () => {
        if (selectedExpo) {
            const expo = expos.find(expo => expo._id === selectedExpo);
            setSelectedExpoData(expo);
            setFormData({
                title: expo.title,
                date: expo.date.split('T')[0],
                time: expo.time,
                speaker: expo.speaker,
                location: expo.location,
            });
        } else {
            console.log("No expo selected");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // ✅ Update expo via API
    const handleUpdate = () => {
        if (!selectedExpo) {
            console.error("No expo selected for update.");
            return;
        }

        axios
            .post(`http://localhost:3000/api/expos/schedule/${selectedExpoData._id}`, formData)
            .then((res) => {
                toast.success(res.data.message || "Expo details updated successfully!");
                // reset state
                setSelectedExpoData(null);
                setSelectedExpo('');
            })
            .catch((err) => {
                console.error("Error updating expo:", err);
                toast.error(
                    err.response?.data?.message || "Failed to update expo details."
                );
            });
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">Expo Schedule Management</h1>
                    <div className="w-32 h-1 bg-blue-500 mx-auto rounded-full"></div>
                    <p className="text-gray-600 mt-4">Search and update expo schedules efficiently</p>
                </div>

                {/* Search Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg border border-blue-100">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Search Expo</h2>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select an Expo
                            </label>
                            <select
                                value={selectedExpo}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 transition-all duration-200"
                            >
                                <option value="" disabled>Choose an expo to manage...</option>
                                {expos.map(expo => (
                                    <option key={expo._id} value={expo._id}>
                                        {expo.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="lg:w-auto">
                            <label className="block text-sm font-medium text-gray-700 mb-2 lg:invisible">
                                Action
                            </label>
                            <button
                                onClick={handleSearch}
                                disabled={!selectedExpo}
                                className="w-full lg:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                            >
                                Search Expo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Update Form */}
                {selectedExpoData && (
                    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                                <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                    ✓
                                </span>
                                Update Expo Details
                            </h2>
                            <p className="text-gray-600 mt-1">Modify the expo information below</p>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Event Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        placeholder="Enter event title"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Event Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        min={new Date().toISOString().split("T")[0]}   // ✅ restrict past dates
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    />

                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Start Time
                                    </label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Speaker Name
                                    </label>
                                    <input
                                        type="text"
                                        name="speaker"
                                        value={formData.speaker}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        placeholder="Enter speaker name"
                                    />
                                </div>

                                <div className="lg:col-span-2 space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Venue Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        placeholder="Enter venue location"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleUpdate}
                                    className="flex-1 px-8 py-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    💾 Update Expo Details
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedExpoData(null);
                                        setSelectedExpo('');
                                    }}
                                    className="sm:w-auto px-8 py-4 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Info Panel */}
                {!selectedExpoData && (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                        <div className="text-6xl text-gray-400 mb-4">📅</div>
                        <h3 className="text-xl font-medium text-gray-600 mb-2">No Expo Selected</h3>
                        <p className="text-gray-500">Select an expo from the dropdown above to view and edit its details</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScheduleManagement;
