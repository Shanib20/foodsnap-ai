import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Loader, Info, Sparkles, TrendingUp } from 'lucide-react';

const FoodSearch = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null); // Removed <any>

  // Get search query from URL parameters
  useEffect(() => {
    const queryFromUrl = searchParams.get('q');
    if (queryFromUrl) {
      setSearchTerm(queryFromUrl);
      // Auto-trigger search if we have a query from URL
      if (!quantity) {
        setQuantity('1 serving'); // Default quantity
      }
      // Small delay to ensure state is set, then call handleSearch
      setTimeout(() => {
        handleSearch(queryFromUrl, '1 serving'); // Pass overrides directly
      }, 100);
    }
  }, [searchParams, quantity]); // Added quantity to dependencies to ensure effect re-runs if quantity changes after initial load

  // Removed type annotations for searchTermOverride and quantityOverride
  const handleSearch = async (searchTermOverride, quantityOverride) => {
    const termToSearch = searchTermOverride || searchTerm.trim();
    const quantityToSearch = quantityOverride || quantity.trim();

    if (!termToSearch) {
      alert('Please enter a food item to search!');
      return;
    }
    if (!quantityToSearch) {
      alert('Please enter the quantity or serving size!');
      return;
    }

    setIsSearching(true);
    setSearchResults(null);

    // Simulate API call with realistic data
    setTimeout(() => {
      const mockResults = {
        foodItem: termToSearch.charAt(0).toUpperCase() + termToSearch.slice(1),
        quantity: quantityToSearch,
        calories: Math.floor(Math.random() * 300 + 50),
        protein: Math.floor(Math.random() * 20 + 5),
        carbohydrates: Math.floor(Math.random() * 40 + 10),
        fat: Math.floor(Math.random() * 15 + 2),
        fiber: Math.floor(Math.random() * 8 + 1),
        sugar: Math.floor(Math.random() * 15 + 2),
        sodium: Math.floor(Math.random() * 500 + 100),
        vitaminC: Math.floor(Math.random() * 50 + 5),
        calcium: Math.floor(Math.random() * 200 + 20),
        iron: Math.floor(Math.random() * 10 + 1)
      };

      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const popularFoods = [
    { name: 'Apple', emoji: '🍎', category: 'Fruits' },
    { name: 'Banana', emoji: '🍌', category: 'Fruits' },
    { name: 'Chicken Breast', emoji: '🍗', category: 'Protein' },
    { name: 'Brown Rice', emoji: '🍚', category: 'Grains' },
    { name: 'Salmon', emoji: '🐟', category: 'Protein' },
    { name: 'Broccoli', emoji: '🥦', category: 'Vegetables' },
    { name: 'Avocado', emoji: '🥑', category: 'Fruits' },
    { name: 'Greek Yogurt', emoji: '🥛', category: 'Dairy' },
    { name: 'Oatmeal', emoji: '🥣', category: 'Grains' },
    { name: 'Almonds', emoji: '🌰', category: 'Nuts' },
    { name: 'Sweet Potato', emoji: '🍠', category: 'Vegetables' },
    { name: 'Spinach', emoji: '🥬', category: 'Vegetables' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 fade-in-section">
      {/* Enhanced Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
            <Search className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Food Nutrition Database</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Search our comprehensive database of over 100,000 foods for detailed nutrition information
        </p>
      </div>

      {/* Enhanced Search Form */}
      <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12 border border-gray-100">
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-lg font-bold text-gray-700">
                What food are you looking for?
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                <input
                  type="text"
                  placeholder="e.g., Apple, Chicken Breast, Quinoa"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-lg font-bold text-gray-700">
                Quantity/Serving Size
              </label>
              <input
                type="text"
                placeholder="e.g., 1 medium, 200g, 1 cup"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => handleSearch()} // Call handleSearch without arguments for button click
              disabled={isSearching}
              className="group inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg"
            >
              {isSearching ? (
                <>
                  <Loader className="mr-3 h-6 w-6 animate-spin" />
                  Searching Database...
                </>
              ) : (
                <>
                  <Search className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                  Search Nutrition Facts
                  <Sparkles className="ml-3 h-6 w-6 group-hover:animate-bounce" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Popular Foods */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Popular Searches</h3>
            <TrendingUp className="h-6 w-6 text-emerald-500" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularFoods.map((food, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchTerm(food.name);
                  if (!quantity) setQuantity('1 serving');
                }}
                className="group p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:shadow-lg transform hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2 group-hover:animate-bounce">{food.emoji}</div>
                  <div className="font-semibold text-gray-900 mb-1">{food.name}</div>
                  <div className="text-xs text-gray-500 font-medium">{food.category}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Search Results */}
      {searchResults && (
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <div className="flex items-center mb-8">
            <div className="bg-blue-100 p-3 rounded-2xl mr-4">
              <Search className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Nutrition Facts Found!</h2>
              <p className="text-gray-600">Complete nutritional breakdown for your search</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Basic Info */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <label className="text-sm font-bold text-blue-700 uppercase tracking-wide">Food Item</label>
                <p className="text-2xl font-bold text-gray-900 mt-2">{searchResults.foodItem}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                <label className="text-sm font-bold text-purple-700 uppercase tracking-wide">Serving Size</label>
                <p className="text-xl font-bold text-gray-900 mt-2">{searchResults.quantity}</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200">
                <label className="text-sm font-bold text-emerald-700 uppercase tracking-wide">Total Calories</label>
                <p className="text-4xl font-bold text-emerald-700 mt-2">{searchResults.calories} kcal</p>
              </div>
            </div>

            {/* Macronutrients */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Macronutrients</h3>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Protein</span>
                    <span className="font-bold text-blue-600 text-xl">{searchResults.protein}g</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min((searchResults.protein / 50) * 100, 100)}%` }}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-5 border border-orange-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Carbohydrates</span>
                    <span className="font-bold text-orange-600 text-xl">{searchResults.carbohydrates}g</span>
                  </div>
                  <div className="w-full bg-orange-200 rounded-full h-2 mt-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${Math.min((searchResults.carbohydrates / 100) * 100, 100)}%` }}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Fat</span>
                    <span className="font-bold text-purple-600 text-xl">{searchResults.fat}g</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${Math.min((searchResults.fat / 30) * 100, 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Nutrients */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Additional Nutrients</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <span className="font-semibold text-gray-700">Fiber</span>
                  <span className="font-bold text-green-600">{searchResults.fiber}g</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200">
                  <span className="font-semibold text-gray-700">Sugar</span>
                  <span className="font-bold text-red-600">{searchResults.sugar}g</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
                  <span className="font-semibold text-gray-700">Sodium</span>
                  <span className="font-bold text-yellow-600">{searchResults.sodium}mg</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                  <span className="font-semibold text-gray-700">Vitamin C</span>
                  <span className="font-bold text-indigo-600">{searchResults.vitaminC}mg</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
                  <span className="font-semibold text-gray-700">Calcium</span>
                  <span className="font-bold text-teal-600">{searchResults.calcium}mg</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                  <span className="font-semibold text-gray-700">Iron</span>
                  <span className="font-bold text-gray-600">{searchResults.iron}mg</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <div className="flex items-start">
              <Info className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-800 mb-2">Demo Data Notice</p>
                <p className="text-sm text-blue-700">
                  This is simulated nutrition data for demonstration purposes.
                  In a production environment, this would integrate with a comprehensive nutrition database API
                  like USDA FoodData Central for accurate nutritional information.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodSearch;