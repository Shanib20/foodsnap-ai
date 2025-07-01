import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Search, Utensils, Zap, Shield, Heart, ArrowRight, Star, Users, TrendingUp, Play, CheckCircle, Sparkles } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Camera,
      title: 'AI Food Recognition',
      description: 'Simply snap a photo of your meal and get instant nutritional analysis powered by advanced AI technology.',
      color: 'from-emerald-500 to-green-600',
      bgColor: 'from-emerald-50 to-green-50'
    },
    {
      icon: Search,
      title: 'Smart Food Database',
      description: 'Search our comprehensive database for detailed nutrition information on thousands of foods worldwide.',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      icon: Utensils,
      title: 'Personalized Diet Plans',
      description: 'Get customized meal recommendations based on your goals, age, and dietary preferences.',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50'
    }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Users', color: 'text-emerald-600' },
    { icon: Camera, value: '200K+', label: 'Photos Analyzed', color: 'text-blue-600' },
    { icon: TrendingUp, value: '98%', label: 'Accuracy Rate', color: 'text-purple-600' },
    { icon: Star, value: '4.9', label: 'User Rating', color: 'text-yellow-600' }
  ];

  const benefits = [
    'Instant nutrition analysis',
    'No manual food logging',
    'AI-powered accuracy',
    'Personalized recommendations',
    'Privacy-first approach',
    'Free to use'
  ];

  return (
    <div className="space-y-20" >
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 via-white to-blue-100/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 fade-in-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-emerald-600 font-semibold">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <span className="text-lg">AI-Powered Nutrition Revolution</span>
                </div>
                
                <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
                  Snap your meal,{' '}
                  <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
                    know everything
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Transform your health journey with AI-powered food analysis. Get instant nutrition insights, 
                  personalized diet plans, and make smarter food choices effortlessly.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  to="/analyze"
                  className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <Camera className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                  Start Analyzing Now
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <button className="group inline-flex items-center justify-center px-10 py-5 border-2 border-gray-300 text-gray-700 font-bold rounded-2xl hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6">
                {benefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Healthy food analysis"
                    className="rounded-2xl w-full h-80 object-cover"
                  />
                  
                  {/* Floating Stats */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl animate-bounce">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-600">98%</div>
                      <div className="text-sm text-gray-600 font-medium">Accuracy</div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl animate-pulse">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">2s</div>
                      <div className="text-sm text-gray-600 font-medium">Analysis</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background Decorations */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/30 to-blue-200/30 rounded-3xl transform -rotate-6 -z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-3xl transform rotate-12 -z-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands Worldwide
            </h2>
            <p className="text-xl text-gray-600">Join our growing community of health-conscious users</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-2xl group-hover:from-emerald-100 group-hover:to-blue-100 transition-all duration-300 shadow-lg">
                      <Icon className={`h-8 w-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for Better Health
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our AI-powered platform makes nutrition tracking simple, accurate, and personalized to your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`relative bg-gradient-to-br ${feature.bgColor} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-white/50 group hover:scale-105`}
                >
                  <div className="mb-8">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                  
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-blue-600 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
              Ready to Transform Your Nutrition?
            </h2>
            <p className="text-2xl text-emerald-100 mb-12 leading-relaxed">
              Join thousands of users who have already improved their health with FoodSnap AI.
              Start your journey to better nutrition today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                to="/analyze"
                className="group inline-flex items-center justify-center px-12 py-6 bg-white text-emerald-600 font-bold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl text-lg"
              >
                <Camera className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                Analyze Your First Meal
              </Link>
              
              <Link
                to="/diet-plan"
                className="group inline-flex items-center justify-center px-12 py-6 border-3 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-emerald-600 transition-all duration-300 shadow-2xl text-lg"
              >
                <Utensils className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Get Diet Plan
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {benefits.slice(3).map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2 text-emerald-100">
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-ping"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;