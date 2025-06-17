import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Calendar,
  Play,
  Plus,
  Share,
  Heart,
  Flag,
  BookOpen,
} from "lucide-react";
import { animeAPI } from "../../services/api";
import { Anime } from "../../types";
import { useAuth } from "../../context/AuthContext";

export function AnimeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [userRating, setUserRating] = useState(0);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchAnime(id);
    }
  }, [id]);

  const fetchAnime = async (animeId: string) => {
    try {
      setLoading(true);
      const data = await animeAPI.getAnimeById(animeId);
      setAnime(data);
    } catch (error) {
      console.error("Error fetching anime:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading anime details...</div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Anime Not Found
          </h1>
          <Link to="/catalog" className="text-purple-400 hover:text-purple-300">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "characters", label: "Characters" },
    { id: "reviews", label: "Reviews" },
    { id: "stats", label: "Stats" },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={anime.bannerImage || anime.coverImage}
          alt={anime.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <img
                src={anime.coverImage}
                alt={anime.title}
                className="w-48 h-64 object-cover rounded-lg shadow-2xl"
              />

              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {anime.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-300 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="font-semibold">{anime.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-1" />
                    {anime.year}
                  </div>
                  <span>{anime.episodes} episodes</span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      anime.status === "airing"
                        ? "bg-green-600 text-white"
                        : anime.status === "completed"
                        ? "bg-blue-600 text-white"
                        : "bg-orange-600 text-white"
                    }`}
                  >
                    {anime.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {anime.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {user && (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsInWatchlist(!isInWatchlist)}
                      className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
                        isInWatchlist
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                    >
                      {isInWatchlist ? (
                        <>
                          <BookOpen className="h-4 w-4 mr-2" />
                          In Watchlist
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Add to Watchlist
                        </>
                      )}
                    </button>

                    <button className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                      <Heart className="h-4 w-4 mr-2" />
                      Favorite
                    </button>

                    <button className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                {anime.synopsis}
              </p>

              {user && (
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Rate this Anime
                  </h3>
                  <div className="flex items-center space-x-2 mb-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setUserRating(rating)}
                        className={`w-8 h-8 rounded ${
                          rating <= userRating
                            ? "bg-yellow-400 text-gray-900"
                            : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                        } flex items-center justify-center text-sm font-medium transition-colors`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                  {userRating > 0 && (
                    <p className="text-gray-300">
                      Your rating: {userRating}/10
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Studio:</span>
                    <span className="text-white">{anime.studio.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Episodes:</span>
                    <span className="text-white">{anime.episodes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Year:</span>
                    <span className="text-white">{anime.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-white capitalize">
                      {anime.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating:</span>
                    <span className="text-white">{anime.rating}/10</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre) => (
                    <Link
                      key={genre}
                      to={`/catalog?genres=${genre}`}
                      className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm hover:bg-purple-600/30 transition-colors"
                    >
                      {genre}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "characters" && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Characters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {anime.characters.map((character) => (
                <div
                  key={character.id}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-1">
                      {character.name}
                    </h3>
                    <p className="text-purple-400 text-sm capitalize mb-2">
                      {character.role}
                    </p>
                    <p className="text-gray-300 text-sm line-clamp-3">
                      {character.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Reviews</h2>
              {user && (
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  Write Review
                </button>
              )}
            </div>

            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-400">
                No reviews yet. Be the first to review this anime!
              </p>
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  8.5
                </div>
                <div className="text-gray-300">Average Score</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  12.5K
                </div>
                <div className="text-gray-300">Total Users</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  3.2K
                </div>
                <div className="text-gray-300">Completed</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  1.8K
                </div>
                <div className="text-gray-300">Watching</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
