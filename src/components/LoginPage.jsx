import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ChevronLeft, AlertCircle, X } from 'lucide-react';
import { isAuthenticated } from '../services/Auth';
import { Navigate, useNavigate,Link } from 'react-router-dom';
import { LoginApi } from '../services/Api';
import { storeUserData } from '../services/Storage';

export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showError, setShowError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Clear previous errors
        setErrors({});
        setShowError(false);

        // Basic validation
        const newErrors = {};
        let hasError = false;
        if (!formData.email) {
            newErrors.email = 'Email is required';
            hasError = true;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            hasError = true;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            hasError = true;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            hasError = true;
        }

        if (!hasError) {
            setIsLoading(true);
            LoginApi(formData).then((response) => {
                console.log(response)
                storeUserData(response.data.idToken);
            }).catch((err) => {
                if (err.code == "ERR_BAD_REQUEST") {
                    setErrors({ ...errors, custom_error: 'Invalid Credentials.' })
                }
            })
        }


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }


        // Simulate login process with potential error
        setTimeout(() => {
            setIsLoading(false);

            // Simulate different error scenarios
            const random = Math.random();
            if (random < 0.3) {
                // Simulate invalid credentials
                setShowError(true);
                setErrors({ general: 'Invalid email or password. Please try again.' });
            } else if (random < 0.5) {
                // Simulate network error
                setShowError(true);
                setErrors({ general: 'Network error. Please check your connection and try again.' });
            } else if (random < 0.7) {
                // Simulate account locked
                setShowError(true);
                setErrors({ general: 'Account temporarily locked due to multiple failed attempts. Please try again in 15 minutes.' });
            } else {
                // Simulate successful login
                console.log('Login successful:', { email, password });
                // Here you would typically redirect or update app state
            }
        }, 2000);
    };

    // useEffect(() => {
    //   if (isAuthenticated()) {
    //     navigate('/welcome');
    //   }
    // }, [navigate]);
    if (isAuthenticated()) {
        return <Navigate to='/welcome'/>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
            </div>

            {/* Back to Home Button */}
            <Link to='/'><button className="absolute top-8 left-8 flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Home
            </button></Link>

            {/* Login Card */}
            <div className="relative w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                            ProPlatform
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-300">Sign in to your account to continue</p>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-6">
                        {/* General Error Message */}
                        {showError && errors.general && (
                            <div className="relative bg-red-500/10 border border-red-500/20 rounded-xl p-4 backdrop-blur-sm">
                                <div className="flex items-start">
                                    <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm text-red-200">{errors.general}</p>
                                    </div>
                                    <button
                                        onClick={() => setShowError(false)}
                                        className="ml-2 text-red-400 hover:text-red-300 transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${errors.email
                                        ? 'border-red-500/50 focus:ring-red-500/50'
                                        : 'border-white/20 focus:ring-purple-500'
                                        }`}
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-400 flex items-center mt-1">
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    {errors.email}
                                </p>
                            )}
                            {errors.custom_error && (
                                <p className="text-sm text-red-400 flex items-center mt-1">
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    {errors.custom_error}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${errors.password
                                        ? 'border-red-500/50 focus:ring-red-500/50'
                                        : 'border-white/20 focus:ring-purple-500'
                                        }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-400 flex items-center mt-1">
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            onClick={handleSubmit}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Signing In...
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    Sign In
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button className="w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl bg-white/5 text-sm font-medium text-gray-300 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="ml-2">Google</span>
                        </button>

                        <button className="w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl bg-white/5 text-sm font-medium text-gray-300 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span className="ml-2">Facebook</span>
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-300">
                            Don't have an account?{' '}
                           <Link to='/register'
                                className="font-medium text-purple-400 hover:text-purple-300 transition-colors hover:underline"
                            >Sign up for free
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Security Note */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400">
                        Protected by industry-standard encryption and security measures
                    </p>
                </div>
            </div>
        </div>
    );
}