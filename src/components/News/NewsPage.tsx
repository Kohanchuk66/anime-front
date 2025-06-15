import React from 'react';
import { Calendar, User, Tag } from 'lucide-react';
import { mockNews } from '../../data/mockData';

export function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Latest News</h1>
          <p className="text-gray-400">Stay updated with the latest anime news and announcements</p>
        </div>

        <div className="space-y-8">
          {mockNews.map((news) => (
            <article
              key={news.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer"
            >
              {news.image && (
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-64 object-cover"
                />
              )}
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <div className="flex items-center mr-4">
                    <User className="h-4 w-4 mr-1" />
                    {news.author.username}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {news.createdAt}
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-4 hover:text-purple-300 transition-colors">
                  {news.title}
                </h2>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {news.content}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 bg-purple-600/20 text-purple-300 text-sm rounded-full"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
            Load More News
          </button>
        </div>
      </div>
    </div>
  );
}