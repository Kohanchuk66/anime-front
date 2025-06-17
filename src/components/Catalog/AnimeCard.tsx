import React from "react";
import { Link } from "react-router-dom";
import { Star, Calendar, Play, Plus } from "lucide-react";
import { Anime } from "../../types";

interface AnimeCardProps {
  anime: Anime;
  viewMode: "grid" | "list";
}

export function AnimeCard({ anime, viewMode }: AnimeCardProps) {
  if (viewMode === "list") {
    return (
      <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors">
        <div className="flex items-center space-x-4">
          <Link to={`/anime/${anime._id}`} className="flex-shrink-0">
            <img
              src={anime.coverImage}
              alt={anime.title}
              className="w-16 h-20 object-cover rounded"
            />
          </Link>

          <div className="flex-1 min-w-0">
            <Link
              to={`/anime/${anime._id}`}
              className="block hover:text-purple-300 transition-colors"
            >
              <h3 className="text-lg font-semibold text-white truncate">
                {anime.title}
              </h3>
            </Link>

            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                {anime.rating}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {anime.year}
              </div>
              <span>{anime.episodes} episodes</span>
              <span
                className={`capitalize px-2 py-1 rounded text-xs ${
                  anime.status === "airing"
                    ? "bg-green-600/20 text-green-400"
                    : anime.status === "completed"
                    ? "bg-blue-600/20 text-blue-400"
                    : "bg-orange-600/20 text-orange-400"
                }`}
              >
                {anime.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mt-2">
              {anime.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded"
                >
                  {genre}
                </span>
              ))}
            </div>

            <p className="text-gray-300 text-sm mt-2 line-clamp-2">
              {anime.synopsis}
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <Link
              to={`/anime/${anime._id}`}
              className="flex items-center px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
            >
              <Play className="h-4 w-4 mr-1" />
              View
            </Link>
            <button className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
      <Link to={`/anime/${anime._id}`} className="block relative">
        <div className="aspect-w-3 aspect-h-4">
          <img
            src={anime.coverImage}
            alt={anime.title}
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors">
            <Play className="h-4 w-4 mr-2" />
            View Details
          </button>
        </div>
      </Link>

      <div className="p-4">
        <Link
          to={`/anime/${anime._id}`}
          className="block hover:text-purple-300 transition-colors"
        >
          <h3 className="font-semibold text-white mb-2 line-clamp-2">
            {anime.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            {anime.rating}
          </div>
          <span>{anime.year}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {anime.genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`text-xs px-2 py-1 rounded ${
              anime.status === "airing"
                ? "bg-green-600/20 text-green-400"
                : anime.status === "completed"
                ? "bg-blue-600/20 text-blue-400"
                : "bg-orange-600/20 text-orange-400"
            }`}
          >
            {anime.status}
          </span>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
