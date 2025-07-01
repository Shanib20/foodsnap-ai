// src/HealthCheck.jsx
import React, { useState, useRef } from 'react';
import { Smile, Frown, AlertTriangle, Loader, Camera, Upload, CheckCircle } from 'lucide-react';

const HealthCheck = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [healthResult, setHealthResult] = useState(null); // Stores { assessment: string, note: string }
  const fileInputRef = useRef(null);

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result);
      };
      reader.readAsDataURL(file);
      setHealthResult(null); // Reset results on new image selection
    }
  };

  const handleAnalyzeHealth = async () => {
    if (!selectedFile) {
      alert('Please select a selfie image first!');
      return;
    }

    setIsAnalyzing(true);
    setHealthResult(null); // Clear previous results
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const BACKEND_BASE_URL = 'https://snapthefood.onrender.com';
       const response = await fetch(`${BACKEND_BASE_URL}/health-check`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error}`);
      }

      const result = await response.json();
      setHealthResult(result); // Set the health assessment result

    } catch (error) {
      console.error('Error during health analysis:', error.message);
      alert(`Failed to perform health check. Error: ${error.message}. Please ensure the backend server is running and check its console for details.`);
      setHealthResult({ assessment: 'Error', note: 'Could not perform health check.' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Determine icon and styling based on assessment
  const getResultIcon = (assessment) => {
    switch (assessment) {
      case 'Healthy':
        return <Smile className="h-10 w-10 text-emerald-600" />;
      case 'Unhealthy':
        return <Frown className="h-10 w-10 text-red-600" />;
      case 'Needs Improvement':
        return <AlertTriangle className="h-10 w-10 text-yellow-600" />;
      default:
        return <AlertTriangle className="h-10 w-10 text-gray-500" />;
    }
  };

  const getResultClasses = (assessment) => {
    switch (assessment) {
      case 'Healthy':
        return 'bg-emerald-50 border-emerald-300';
      case 'Unhealthy':
        return 'bg-red-50 border-red-300';
      case 'Needs Improvement':
        return 'bg-yellow-50 border-yellow-300';
      default:
        return 'bg-gray-50 border-gray-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 fade-in-section">
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-4 rounded-2xl shadow-lg">
            <Smile className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">AI Health Snapshot</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Upload a selfie to get a general, non-medical assessment of your visual appearance based on AI perception.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12 border border-gray-100">
        <div className="text-center">
          <div className={`border-3 border-dashed rounded-2xl p-16 mb-8 transition-all duration-300 ${
            imagePreview
              ? 'border-purple-300 bg-purple-50'
              : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50/50'
          }`}>
            {imagePreview ? (
              <div className="space-y-6">
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Selfie Preview"
                    className="max-w-full mx-auto rounded-2xl shadow-xl object-cover"
                    style={{ maxHeight: '320px', maxWidth: '320px' }} // Adjusted for selfie aspect ratio
                  />
                  <div className="absolute -top-2 -right-2 bg-purple-500 text-white p-2 rounded-full">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-purple-700 font-semibold text-lg">Selfie ready for analysis!</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <Camera className="h-24 w-24 text-gray-400" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-gray-700 mb-2">Upload your selfie</p>
                  <p className="text-gray-500">or use your camera for a quick check</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-4"> {/* Adjusted margin-bottom */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Upload className="mr-3 h-6 w-6 group-hover:animate-bounce" />
              Upload Photo
            </button>

            <button
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.capture = 'user'; // 'user' for front camera
                input.onchange = (e) => handleImageSelect(e);
                input.click();
              }}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold rounded-2xl hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Camera className="mr-3 h-6 w-6 group-hover:animate-pulse" />
              Take Selfie
            </button>
          </div>

          {/* NEW: Informational note for camera behavior */}
          <p className="text-sm text-gray-500 mb-8 max-w-lg mx-auto">
            * On desktop, 'Take Selfie' might open a file picker. For direct camera access, please use a mobile device.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          {selectedFile && (
            <button
              onClick={handleAnalyzeHealth}
              disabled={isAnalyzing}
              className="group inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader className="mr-3 h-6 w-6 animate-spin" />
                  Analyzing Your Vibe...
                </>
              ) : (
                <>
                  <Smile className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                  Get My Health Snapshot
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {healthResult && (
        <div className={`bg-white rounded-3xl shadow-2xl p-10 border ${getResultClasses(healthResult.assessment)}`}>
          <div className="flex items-center mb-8">
            <div className={`p-3 rounded-2xl mr-4 ${getResultClasses(healthResult.assessment)}`}>
              {getResultIcon(healthResult.assessment)}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                AI's Visual Health Assessment:
              </h2>
              <p className="text-gray-600">Based on your selfie's visual cues.</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className={`text-5xl font-bold ${healthResult.assessment === 'Healthy' ? 'text-emerald-600' : healthResult.assessment === 'Unhealthy' ? 'text-red-600' : 'text-yellow-600'}`}>
              {healthResult.assessment}
            </p>
            <p className="text-xl text-gray-700 mt-4 leading-relaxed">
              "{healthResult.note}"
            </p>
          </div>

          <div className="mt-8 p-6 bg-yellow-50 rounded-2xl border border-yellow-200 text-yellow-800">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-2">Important Disclaimer:</p>
                <p className="text-sm leading-relaxed">
                  This "Health Snapshot" is based purely on AI's visual interpretation for demonstration purposes and is NOT a medical diagnosis, health advice, or a substitute for professional medical consultation. Your actual health status can only be determined by a qualified healthcare provider. Do not make any health decisions based on this analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthCheck;
