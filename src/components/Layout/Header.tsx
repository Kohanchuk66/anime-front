import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Bell, Menu, X, LogOut, Settings, BookOpen, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-white text-xl font-bold">AniVerse</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Search anime, characters, studios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/catalog" className="text-gray-300 hover:text-white transition-colors">
              Catalog
            </Link>
            <Link to="/news" className="text-gray-300 hover:text-white transition-colors">
              News
            </Link>
            {user && (
              <Link to="/watchlists" className="text-gray-300 hover:text-white transition-colors">
                My Lists
              </Link>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <img
                      src={user.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=400'}
                      alt={user.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="hidden sm:block">{user.username}</span>
                  </button>
                  
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/watchlists"
                        className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        My Lists
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      {(user.role === 'moderator' || user.role === 'admin') && (
                        <Link
                          to="/moderation"
                          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Moderation
                        </Link>
                      )}
                      <hr className="border-gray-700 my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
            <nav className="space-y-2">
              <Link
                to="/catalog"
                className="block text-gray-300 hover:text-white py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Catalog
              </Link>
              <Link
                to="/news"
                className="block text-gray-300 hover:text-white py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                News
              </Link>
              {user && (
                <Link
                  to="/watchlists"
                  className="block text-gray-300 hover:text-white py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Lists
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}