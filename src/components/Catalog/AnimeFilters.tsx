import React from 'react';
import { X } from 'lucide-react';

interface AnimeFiltersProps {
  allGenres: string[];
  selectedGenres: string[];
  onGenresChange: (genres: string[]) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedYear: string;
  onYearChange: (year: string) => void;
}

export function AnimeFilters({
  allGenres,
  selectedGenres,
  onGenresChange,
  selectedStatus,
  onStatusChange,
  selectedYear,
  onYearChange
}: AnimeFiltersProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      onGenresChange(selectedGenres.filter(g => g !== genre));
    } else {
      onGenresChange([...selectedGenres, genre]);
    }
  };

  const clearFilters = () => {
    onGenresChange([]);
    onStatusChange('');
    onYearChange('');
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-gray-400 hover:text-white transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Genres */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Genres</h4>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
            {allGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  selectedGenres.includes(genre)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Status</h4>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Status</option>
            <option value="airing">Currently Airing</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        {/* Year */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Year</h4>
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedGenres.length > 0 || selectedStatus || selectedYear) && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedGenres.map((genre) => (
              <span
                key={genre}
                className="inline-flex items-center px-2 py-1 bg-purple-600 text-white text-sm rounded"
              >
                {genre}
                <button
                  onClick={() => toggleGenre(genre)}
                  className="ml-2 text-purple-200 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {selectedStatus && (
              <span className="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-sm rounded">
                Status: {selectedStatus}
                <button
                  onClick={() => onStatusChange('')}
                  className="ml-2 text-blue-200 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedYear && (
              <span className="inline-flex items-center px-2 py-1 bg-green-600 text-white text-sm rounded">
                Year: {selectedYear}
                <button
                  onClick={() => onYearChange('')}
                  className="ml-2 text-green-200 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}