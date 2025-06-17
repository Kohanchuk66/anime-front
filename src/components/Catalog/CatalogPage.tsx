import { Filter, Grid, List, Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { animeAPI } from "../../services/api";
import { Anime } from "../../types";
import { AnimeCard } from "./AnimeCard";
import { AnimeFilters } from "./AnimeFilters";

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("rating");
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    anime.forEach((a) => a.genres.forEach((genre) => genres.add(genre)));
    return Array.from(genres).sort();
  }, [anime]);

  useEffect(() => {
    fetchAnime();
  }, [searchQuery, selectedGenres, selectedStatus, selectedYear, sortBy]);

  const fetchAnime = async () => {
    try {
      setLoading(true);
      const params: any = {};

      if (searchQuery) params.search = searchQuery;
      if (selectedGenres.length > 0) params.genres = selectedGenres.join(",");
      if (selectedStatus) params.status = selectedStatus;
      if (selectedYear) params.year = selectedYear;
      if (sortBy) params.sort = sortBy;

      const data = await animeAPI.getAnime(params);
      setAnime(data.anime);
    } catch (error) {
      console.error("Error fetching anime:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { search: searchQuery } : {});
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading anime catalog...</div>
      </div>
    );
  }

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
                <option value="latest">Sort by Year</option>
                <option value="popular">Sort by popular</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">
                {anime.length} results
              </span>
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-purple-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-purple-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
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
        {anime.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl mb-2">No anime found</div>
            <div className="text-gray-500">
              Try adjusting your search or filters
            </div>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                : "grid-cols-1"
            }`}
          >
            {anime.map((animeItem) => (
              <AnimeCard
                key={animeItem._id}
                anime={animeItem}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
