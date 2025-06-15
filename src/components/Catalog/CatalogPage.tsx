import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Grid, List, Star, Calendar, Play } from 'lucide-react';
import { mockAnime } from '../../data/mockData';
import { AnimeCard } from './AnimeCard';
import { AnimeFilters } from './AnimeFilters';

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('rating');

  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    mockAnime.forEach(anime => anime.genres.forEach(genre => genres.add(genre)));
    return Array.from(genres).sort();
  }, []);

  const filteredAnime = useMemo(() => {
    let filtered = [...mockAnime];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(anime =>
        anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anime.synopsis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anime.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(anime =>
        selectedGenres.some(genre => anime.genres.includes(genre))
      );
    }

    // Status filter
    if (selectedStatus) {
      filtered = filtered.filter(anime => anime.status === selectedStatus);
    }

    // Year filter
    if (selectedYear) {
      filtered = filtered.filter(anime => anime.year.toString() === selectedYear);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'episodes':
          return b.episodes - a.episodes;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedGenres, selectedStatus, selectedYear, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { search: searchQuery } : {});
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Anime Catalog</h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative max-w-xl">
              <input
                type="text"
                placeholder="Search anime, genres, studios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </form>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="rating">Sort by Rating</option>
                <option value="year">Sort by Year</option>
                <option value="title">Sort by Title</option>
                <option value="episodes">Sort by Episodes</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">
                {filteredAnime.length} results
              </span>
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <AnimeFilters
            allGenres={allGenres}
            selectedGenres={selectedGenres}
            onGenresChange={setSelectedGenres}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
        )}

        {/* Results */}
        {filteredAnime.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl mb-2">No anime found</div>
            <div className="text-gray-500">Try adjusting your search or filters</div>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
              : 'grid-cols-1'
          }`}>
            {filteredAnime.map((anime) => (
              <AnimeCard
                key={anime.id}
                anime={anime}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}