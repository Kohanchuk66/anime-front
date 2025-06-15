import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-white text-xl font-bold">AniVerse</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your ultimate anime universe. Discover, track, and discuss your favorite anime with a passionate community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Anime Catalog
                </Link>
              </li>
              <li>
                <Link to="/catalog?filter=trending" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/catalog?filter=top-rated" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link to="/catalog?filter=new" className="text-gray-400 hover:text-white transition-colors text-sm">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white transition-colors text-sm">
                  News
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/forums" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Forums
                </Link>
              </li>
              <li>
                <Link to="/users" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Users
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 AniVerse. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for anime fans
          </p>
        </div>
      </div>
    </footer>
  );
}