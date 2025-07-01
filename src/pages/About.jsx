import React from 'react';
import { Camera, Zap, Shield, Heart, Users, Award, Lightbulb, AlertTriangle } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Camera,
      title: 'AI-Powered Analysis',
      description: 'Advanced computer vision technology analyzes your food photos to identify ingredients and estimate nutritional content.',
      color: 'from-emerald-500 to-green-600'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get comprehensive nutritional information within seconds of uploading your food photo.',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your photos and data are processed securely and are never stored or shared without your consent.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Heart,
      title: 'Health Focused',
      description: 'Designed with your wellness in mind, helping you make informed decisions about your nutrition.',
      color: 'from-red-500 to-pink-600'
    }
  ];

  const team = [
    {
      name: 'AI Research Team',
      role: 'Computer Vision & Machine Learning',
      description: 'Developing cutting-edge algorithms for accurate food recognition and nutritional analysis.'
    },
    {
      name: 'Nutrition Experts',
      role: 'Dietary Science & Validation',
      description: 'Ensuring our nutritional data is accurate, comprehensive, and scientifically sound.'
    },
    {
      name: 'Product Team',
      role: 'User Experience & Design',
      description: 'Creating intuitive interfaces that make nutrition tracking effortless and engaging.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 fade-in-section">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              About{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                FoodSnap AI
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing nutrition tracking by making it as simple as taking a photo. 
              Our mission is to empower everyone to make healthier food choices through accessible, 
              AI-powered nutritional insights.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Healthy food varieties"
              className="rounded-2xl shadow-2xl w-full max-w-2xl h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-emerald-600 font-medium">
                  <Lightbulb className="h-5 w-5" />
                  <span>Our Mission</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-900">
                  Making Nutrition Accessible to Everyone
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Traditional nutrition tracking is complex and time-consuming. We believe that understanding 
                  what you eat shouldn't require a degree in nutrition science or hours of manual data entry.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  FoodSnap AI bridges the gap between advanced nutritional science and everyday usability, 
                  putting the power of informed eating choices in your pocket.
                </p>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-emerald-500" />
                  <span>10,000+ Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-blue-500" />
                  <span>95% Accuracy</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="People enjoying healthy meals"
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">50K+</div>
                  <div className="text-sm text-gray-600">Photos Analyzed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How We Make It Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our technology combines advanced AI, nutritional science, and user-friendly design 
              to deliver accurate results you can trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
                >
                  <div className="mb-4 flex justify-center">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built by Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our multidisciplinary team combines expertise in AI, nutrition science, 
              and user experience design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-emerald-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-12">
            <div className="mb-6">
              <Heart className="h-12 w-12 text-emerald-600 mx-auto" />
            </div>
            <blockquote className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              "Let food be thy medicine and medicine be thy food."
            </blockquote>
            <cite className="text-lg text-gray-600 font-medium">— Hippocrates</cite>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              This ancient wisdom guides our modern approach to nutrition technology. 
              We believe that understanding your food is the first step toward better health.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="bg-yellow-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Important Disclaimer
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p>
                    FoodSnap AI is a technology demonstration and educational tool. 
                    Nutritional estimations are approximate and should be used for informational purposes only.
                  </p>
                  <p>
                    This application should not be used as a substitute for professional medical advice, 
                    diagnosis, or treatment. Always consult with qualified healthcare providers or 
                    registered dietitians for personalized nutritional guidance.
                  </p>
                  <p>
                    Results may vary based on food preparation methods, portion sizes, and individual 
                    biological factors. For critical dietary decisions, please verify information 
                    with authoritative nutritional databases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;