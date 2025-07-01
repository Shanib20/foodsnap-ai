import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader, CheckCircle, AlertCircle, Zap, Target, Image as ImageIcon } from 'lucide-react';

const FoodAnalysis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [manualGrams, setManualGrams] = useState('');
  const [refinedResults, setRefinedResults] = useState(null);
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
      setResults(null);
      setRefinedResults(null);
      setManualGrams('');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert('Please select an image first!');
      return;
    }

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const BACKEND_BASE_URL = 'https://snapthefood.onrender.com';
      const response = await fetch(`${BACKEND_BASE_URL}/analyze-food`,{
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error}`);
      }

      const result = await response.json();
      setResults(result);
    } catch (error) {
      alert(`Failed to analyze food. Error: ${error.message}. Check Node.js backend server and console for details.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRefineWithGrams = () => {
    const userGrams = parseFloat(manualGrams);
    if (isNaN(userGrams) || userGrams <= 0) {
      alert('Please enter a valid positive number for grams.');
      return;
    }

    if (!results) return;

    const typicalServingSize = 100;
    const ratio = userGrams / typicalServingSize;

    const baseCalories = parseFloat(results.estimatedCalories.replace(/[^0-9.]/g, '')) || 0;
    const baseProtein = parseFloat(results.protein.replace(/[^0-9.]/g, '')) || 0;
    const baseCarbohydrates = parseFloat(results.carbohydrates.replace(/[^0-9.]/g, '')) || 0;
    const baseFat = parseFloat(results.fat.replace(/[^0-9.]/g, '')) || 0;

    setRefinedResults({
      identifiedFood: results.identifiedFood,
      estimatedCalories: `${(baseCalories * ratio).toFixed(1)} kcal`,
      protein: `${(baseProtein * ratio).toFixed(1)}g`,
      carbohydrates: `${(baseCarbohydrates * ratio).toFixed(1)}g`,
      fat: `${(baseFat * ratio).toFixed(1)}g`
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 fade-in-section">
      {/* Enhanced Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-emerald-500 to-blue-600 p-4 rounded-2xl shadow-lg">
            <Camera className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">AI Food Analysis</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Upload or capture a photo of your meal to get instant, detailed nutritional analysis powered by advanced AI
        </p>
      </div>

      {/* Enhanced Upload Section */}
      <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12 border border-gray-100">
        <div className="text-center">
          <div className={`border-3 border-dashed rounded-2xl p-16 mb-8 transition-all duration-300 ${
            imagePreview
              ? 'border-emerald-300 bg-emerald-50'
              : 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-50/50'
          }`}>
            {imagePreview ? (
              <div className="space-y-6">
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-80 mx-auto rounded-2xl shadow-xl"
                  />
                  <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-2 rounded-full">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-emerald-700 font-semibold text-lg">Image ready for analysis!</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <ImageIcon className="h-24 w-24 text-gray-400" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-gray-700 mb-2">Drop your food image here</p>
                  <p className="text-gray-500">or click to browse from your device</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Upload className="mr-3 h-6 w-6 group-hover:animate-bounce" />
              Upload from Gallery
            </button>

            <button
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.capture = 'environment';
                input.onchange = (e) => handleImageSelect(e);
                input.click();
              }}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Camera className="mr-3 h-6 w-6 group-hover:animate-pulse" />
              Take Photo
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          {selectedFile && (
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="group inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader className="mr-3 h-6 w-6 animate-spin" />
                  Analyzing Magic in Progress...
                </>
              ) : (
                <>
                  <Zap className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                  Analyze with AI
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Enhanced Results Section */}
      {results && (
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12 border border-gray-100">
          <div className="flex items-center mb-8">
            <div className="bg-emerald-100 p-3 rounded-2xl mr-4">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Analysis Complete!</h2>
              <p className="text-gray-600">Here's what we found in your food</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
                <label className="text-sm font-bold text-emerald-700 uppercase tracking-wide">Identified Food</label>
                <p className="text-2xl font-bold text-gray-900 mt-2">{results.identifiedFood}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <label className="text-sm font-bold text-blue-700 uppercase tracking-wide">Estimated Calories</label>
                <p className="text-3xl font-bold text-blue-700 mt-2">{results.estimatedCalories}</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Macronutrients Breakdown</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <span className="font-semibold text-gray-700">Protein</span>
                  <span className="font-bold text-purple-600 text-xl">{results.protein}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                  <span className="font-semibold text-gray-700">Carbohydrates</span>
                  <span className="font-bold text-orange-600 text-xl">{results.carbohydrates}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
                  <span className="font-semibold text-gray-700">Fat</span>
                  <span className="font-bold text-yellow-600 text-xl">{results.fat}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Manual Grams Input */}
          <div className="mt-12 p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-indigo-600 mr-3" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Get Precise Results</h3>
                <p className="text-gray-600">Know the exact weight? Enter it for ultra-accurate calculations</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="number"
                placeholder="Enter weight in grams (e.g., 250)"
                value={manualGrams}
                onChange={(e) => setManualGrams(e.target.value)}
                className="flex-1 px-6 py-4 border-2 border-indigo-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg"
              />
              <button
                onClick={handleRefineWithGrams}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Calculate Precisely
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Refined Results */}
      {refinedResults && (
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <div className="flex items-center mb-8">
            <div className="bg-purple-100 p-3 rounded-2xl mr-4">
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Precision Results</h2>
              <p className="text-gray-600">Calculated for {manualGrams}g of {refinedResults.identifiedFood}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                <label className="text-sm font-bold text-purple-700 uppercase tracking-wide">Food Item</label>
                <p className="text-2xl font-bold text-gray-900 mt-2">{refinedResults.identifiedFood}</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <label className="text-sm font-bold text-green-700 uppercase tracking-wide">Precise Calories</label>
                <p className="text-3xl font-bold text-green-700 mt-2">{refinedResults.estimatedCalories}</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Refined Macronutrients</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <span className="font-semibold text-gray-700">Protein</span>
                  <span className="font-bold text-blue-600 text-xl">{refinedResults.protein}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <span className="font-semibold text-gray-700">Carbohydrates</span>
                  <span className="font-bold text-amber-600 text-xl">{refinedResults.carbohydrates}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-200">
                  <span className="font-semibold text-gray-700">Fat</span>
                  <span className="font-bold text-rose-600 text-xl">{refinedResults.fat}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-yellow-800 mb-1">Precision Enhancement Applied</p>
                <p className="text-sm text-yellow-700">
                  Results refined based on your provided weight ({manualGrams}g).
                  Our AI initial estimate was calibrated for a standard serving size.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodAnalysis;