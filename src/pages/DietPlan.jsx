import React, { useState } from 'react';
import { User, Calendar, Target, Loader, CheckCircle, Utensils, Sparkles, TrendingUp } from 'lucide-react';

const DietPlan = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    goal: '',
    protein: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [dietPlan, setDietPlan] = useState('');

  const goals = [
    { value: 'increase weight', label: 'Gain Weight', icon: '📈', color: 'from-green-500 to-emerald-600', description: 'Build healthy mass' },
    { value: 'decrease weight', label: 'Lose Weight', icon: '📉', color: 'from-red-500 to-pink-600', description: 'Shed excess pounds' },
    { value: 'maintain weight', label: 'Maintain Weight', icon: '⚖️', color: 'from-blue-500 to-indigo-600', description: 'Stay at current weight' },
    { value: 'build muscle', label: 'Build Muscle', icon: '💪', color: 'from-purple-500 to-violet-600', description: 'Increase lean mass' },
    { value: 'improve general health', label: 'General Health', icon: '🌟', color: 'from-yellow-500 to-orange-600', description: 'Overall wellness' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGeneratePlan = async () => {
    if (!formData.age || !formData.goal) {
      alert('Please fill in your age and select a goal.');
      return;
    }

    const age = parseInt(formData.age);
    if (isNaN(age) || age < 1 || age > 120) {
      alert('Please enter a valid age between 1 and 120.');
      return;
    }

    setIsGenerating(true);
    setDietPlan('');

    const requestBody = {
      userName: formData.name,
      userAge: age,
      dietGoal: formData.goal,
      dailyProteinNeeded: formData.protein
    };

    try {
      const BACKEND_BASE_URL = 'https://snapthefood.onrender.com';
      const response = await fetch(`${BACKEND_BASE_URL}/get-diet-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error}`);
      }

      const result = await response.json();
      if (result.dietPlan) {
        setDietPlan(result.dietPlan);
      } else {
        setDietPlan('Sorry, could not generate a diet plan at this time. Please try again.');
      }
    } catch (error) {
      alert(`Error generating diet plan. Error: ${error.message}. Check Node.js backend server console for details.`);
      setDietPlan('Error generating diet plan. Please check your connection or try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const selectedGoal = goals.find(g => g.value === formData.goal);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 fade-in-section">
      {/* Enhanced Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-2xl shadow-lg">
            <Utensils className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Personalized Diet Plan</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Get a customized nutrition plan tailored to your unique goals, preferences, and lifestyle
        </p>
      </div>

      {/* Enhanced Form */}
      <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12 border border-gray-100">
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="flex items-center text-lg font-bold text-gray-700">
                <User className="h-5 w-5 mr-2 text-emerald-500" />
                Your Name (Optional)
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g., Alex Johnson"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-lg"
              />
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center text-lg font-bold text-gray-700">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                Your Age *
              </label>
              <input
                type="number"
                name="age"
                placeholder="e.g., 28"
                min="1"
                max="120"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-lg"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center text-lg font-bold text-gray-700">
              <Target className="h-5 w-5 mr-2 text-purple-500" />
              What's Your Goal? *
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goals.map((goal) => (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => setFormData({...formData, goal: goal.value})}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    formData.goal === goal.value
                      ? `bg-gradient-to-br ${goal.color} text-white border-transparent shadow-xl transform scale-105`
                      : 'bg-gray-50 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <div className="text-3xl mb-3">{goal.icon}</div>
                  <div className={`font-bold text-lg mb-2 ${formData.goal === goal.value ? 'text-white' : 'text-gray-900'}`}>
                    {goal.label}
                  </div>
                  <div className={`text-sm ${formData.goal === goal.value ? 'text-white/90' : 'text-gray-600'}`}>
                    {goal.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-lg font-bold text-gray-700">
              Daily Protein Goal (Optional)
            </label>
            <input
              type="number"
              name="protein"
              placeholder="e.g., 120g"
              min="0"
              value={formData.protein}
              onChange={handleInputChange}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-lg"
            />
            <p className="text-gray-500 text-sm">
              Leave blank if you're not sure - we'll suggest an appropriate amount based on your goal
            </p>
          </div>

          <div className="text-center pt-6">
            <button
              onClick={handleGeneratePlan}
              disabled={isGenerating}
              className="group inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg"
            >
              {isGenerating ? (
                <>
                  <Loader className="mr-3 h-6 w-6 animate-spin" />
                  Creating Your Perfect Plan...
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                  Generate My Diet Plan
                  <TrendingUp className="ml-3 h-6 w-6 group-hover:animate-bounce" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Results */}
      {dietPlan && (
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <div className="flex items-center mb-8">
            <div className="bg-green-100 p-3 rounded-2xl mr-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Your Personalized Diet Plan
                {formData.name && `, ${formData.name}`}!
              </h2>
              <p className="text-gray-600">Tailored specifically for your goals and lifestyle</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-purple-600">
                    {formData.age || '--'} years
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Your Age</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl">
                    {selectedGoal?.icon || '🎯'}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {selectedGoal?.label || 'Your Goal'}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600">
                    {formData.protein ? `${formData.protein}g` : 'Custom'}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Daily Protein</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-emerald-600">AI</div>
                  <div className="text-sm text-gray-600 font-medium">Powered Plan</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
            <div className="prose max-w-none">
              <div className="whitespace-pre-line text-gray-800 leading-relaxed text-lg">
                {dietPlan}
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200">
            <div className="flex items-start">
              <div className="text-yellow-600 mr-3 text-2xl">⚠️</div>
              <div>
                <div className="font-bold text-yellow-800 mb-2">Important Health Disclaimer</div>
                <div className="text-sm text-yellow-800 leading-relaxed">
                  This diet plan is AI-generated for informational and educational purposes only. 
                  Please consult with a qualified nutritionist, dietitian, or healthcare provider before making significant dietary changes, 
                  especially if you have any health conditions, allergies, or dietary restrictions. Individual nutritional needs vary greatly.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlan;