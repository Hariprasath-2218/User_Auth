import React, { useState, useEffect } from 'react';
import { logout } from '../services/Auth';
import Navigation from './Nav';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const logoutUser = () => {
  logout();
  navigate('/login'); 
 };
  const nextSteps = [
    {
      icon: '📧',
      title: 'Verify Your Email',
      description: 'Check your inbox and click the verification link we sent you',
      action: 'Resend Email',
      status: 'pending'
    },
    {
      icon: '👤',
      title: 'Complete Your Profile',
      description: 'Add your personal information and preferences',
      action: 'Complete Profile',
      status: 'available'
    },
    {
      icon: '🎯',
      title: 'Set Your Goals',
      description: 'Tell us what you want to achieve with our platform',
      action: 'Set Goals',
      status: 'available'
    },
    {
      icon: '🚀',
      title: 'Start Exploring',
      description: 'Discover all the features and tools available to you',
      action: 'Get Started',
      status: 'available'
    }
  ];

  const features = [
    {
      icon: '💡',
      title: 'Smart Analytics',
      description: 'Get insights into your performance with advanced analytics'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security'
    },
    {
      icon: '🤝',
      title: '24/7 Support',
      description: 'Our team is here to help you succeed every step of the way'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Experience blazing fast performance across all devices'
    }
  ];

  return (
    <>
    <Navigation logoutUser={logoutUser}/>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-10 animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg transform transition-all duration-1000 ${isAnimating ? 'scale-0 rotate-180' : 'scale-100 rotate-0'}`}>
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-800 mb-4 transform transition-all duration-1000 delay-300 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
            Welcome to Our Platform! 🎉
          </h1>
          
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto transform transition-all duration-1000 delay-500 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
            Your account has been successfully created. Let's get you started on your journey to success.
          </p>
        </div>

        {/* Success Message Card */}
        <div className={`max-w-4xl mx-auto mb-12 transform transition-all duration-1000 delay-700 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">Registration Successful!</h3>
                  <p className="text-green-100 mt-1">You're now part of our community</p>
                </div>
              </div>
            </div>
            
            <div className="px-8 py-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h4 className="font-semibold text-gray-800">Account Created</h4>
                  <p className="text-sm text-gray-600 mt-1">Your secure account is ready</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔐</span>
                  </div>
                  <h4 className="font-semibold text-gray-800">Security Setup</h4>
                  <p className="text-sm text-gray-600 mt-1">Protected with encryption</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="font-semibold text-gray-800">Ready to Start</h4>
                  <p className="text-sm text-gray-600 mt-1">All systems are go!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps Section */}
        <div className={`max-w-4xl mx-auto mb-12 transform transition-all duration-1000 delay-900 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">What's Next?</h2>
            <p className="text-gray-600">Complete these steps to get the most out of your experience</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {nextSteps.map((step, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                        {step.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                      <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg">
                        {step.action}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className={`max-w-6xl mx-auto mb-12 transform transition-all duration-1000 delay-1100 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Why You'll Love Our Platform</h2>
            <p className="text-gray-600">Discover the features that make us different</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 delay-1300 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-8 text-lg">Join thousands of users who are already achieving their goals with our platform.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg">
                Take a Tour
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:-translate-y-1">
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className={`max-w-2xl mx-auto mt-12 text-center transform transition-all duration-1000 delay-1500 ${isAnimating ? 'translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Need Help Getting Started?</h3>
            <p className="text-gray-600 mb-4">Our support team is here to help you every step of the way.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#" className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Live Chat
              </a>
              <a href="#" className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Support
              </a>
              <a href="#" className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default WelcomePage;