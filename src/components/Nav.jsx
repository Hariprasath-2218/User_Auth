import React, { useState, useEffect } from 'react';
import { Home, LogOut, Menu, X, User, Settings, Bell, ChevronDown } from 'lucide-react';
import { isAuthenticated, logout } from '../services/Auth';
import { useNavigate } from 'react-router-dom';
import { UserDetailApi } from '../services/Api';

export default function Navigation({ logoutUser }) {
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);
    const [user, setUser] = useState({
        name: "",
        email: "",
        avatar: ""
    });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) {
            UserDetailApi().then((response) => {
                console.log("user", response)
                setUser({ 
                    ...user, 
                    name: response.data.users[0].displayName, 
                    email: response.data.users[0].email, 
                    avatar: response.data.users[0].photoUrl 
                })
            })
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        setIsLoggingOut(true);
        logoutUser();

        setTimeout(() => {
            setIsLoggingOut(false);
            console.log('User logged out');
        }, 1500);
    };

    // Navigate to profile page
    const handleProfileClick = () => {
        setIsUserMenuOpen(false);
        navigate('/profile');
    };

    const navItems = [
        { name: 'Home', href: '#', icon: Home },
        { name: 'Projects', href: '#' },
        { name: 'Team', href: '#' },
        { name: 'Reports', href: '#' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50
            ? 'bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">

                    {/* Logo */}
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        ProPlatform
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 group"
                            >
                                {item.icon && (
                                    <item.icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                )}
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Desktop User Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Notifications */}
                        <button className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* User Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center space-x-3 text-sm rounded-full p-2 hover:bg-white/10 transition-all duration-200"
                            >
                                <img
                                    className="w-8 h-8 rounded-full border-2 border-purple-400 object-cover cursor-pointer"
                                    src={user.avatar || '/api/placeholder/32/32'}
                                    alt={user.name}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleProfileClick();
                                    }}
                                />
                                <div className="hidden lg:flex flex-col items-start">
                                    <span className="text-white font-medium">{user.name}</span>
                                    <span className="text-gray-400 text-xs">{user.email}</span>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isUserMenuOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-md rounded-xl border border-white/10 shadow-xl overflow-hidden"
                                    style={{ zIndex: 60 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="px-4 py-3 border-b border-white/10">
                                        <div className="flex items-center space-x-3">
                                            <img 
                                                className="w-10 h-10 rounded-full object-cover border-2 border-purple-400 cursor-pointer" 
                                                src={user.avatar || '/api/placeholder/40/40'} 
                                                alt={user.name}
                                                onClick={handleProfileClick}
                                            />
                                            <div>
                                                <div className="text-white font-medium">{user.name}</div>
                                                <div className="text-gray-400 text-sm">{user.email}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-2">
                                        <button 
                                            onClick={handleProfileClick}
                                            className="flex items-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                                        >
                                            <User className="w-4 h-4 mr-3" />
                                            Profile Settings
                                        </button>
                                        <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                                            <Settings className="w-4 h-4 mr-3" />
                                            Account Settings
                                        </a>
                                    </div>

                                    <div className="border-t border-white/10 py-2">
                                        <button
                                            onClick={handleLogout}
                                            disabled={isLoggingOut}
                                            className="flex items-center w-full px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                                        >
                                            {isLoggingOut ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-400 mr-3"></div>
                                                    Logging out...
                                                </>
                                            ) : (
                                                <>
                                                    <LogOut className="w-5 h-5 mr-3" />
                                                    Logout
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-md">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <div 
                                className="flex items-center space-x-3 px-3 py-3 bg-white/5 rounded-lg mb-3 cursor-pointer hover:bg-white/10 transition-colors"
                                onClick={handleProfileClick}
                            >
                                <img 
                                    className="w-10 h-10 rounded-full border-2 border-purple-400 object-cover" 
                                    src={user.avatar || '/api/placeholder/40/40'} 
                                    alt={user.name} 
                                />
                                <div>
                                    <div className="text-white font-medium">{user.name}</div>
                                    <div className="text-gray-400 text-sm">{user.email}</div>
                                </div>
                            </div>

                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                                    {item.name}
                                </a>
                            ))}

                            <div className="border-t border-white/10 my-3"></div>

                            <button 
                                onClick={handleProfileClick}
                                className="flex items-center w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <User className="w-5 h-5 mr-3" />
                                Profile Settings
                            </button>
                            <a href="#" className="flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                <Settings className="w-5 h-5 mr-3" />
                                Account Settings
                            </a>
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="flex items-center w-full px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {isLoggingOut ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-400 mr-3"></div>
                                        Logging out...
                                    </>
                                ) : (
                                    <>
                                        <LogOut className="w-5 h-5 mr-3" />
                                        Logout
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Click outside handler */}
            {isUserMenuOpen && (
                <div
                    className="fixed inset-0 z-50"
                    onClick={() => setIsUserMenuOpen(false)}
                ></div>
            )}
        </nav>
    );
}