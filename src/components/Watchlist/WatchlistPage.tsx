import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { watchlistAPI, animeAPI } from "../../services/api";
import { Watchlist, Anime } from "../../types";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export function WatchlistPage() {
  const { user } = useAuth();
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [anime, setAnime] = useState<Anime[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newListDescription, setNewListDescription] = useState("");
  const [newListIsPublic, setNewListIsPublic] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [watchlistData, animeData] = await Promise.all([
        watchlistAPI.getWatchlists(),
        animeAPI.getAnime(),
      ]);
      setWatchlists(watchlistData);
      setAnime(animeData.anime);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newWatchlist = await watchlistAPI.createWatchlist({
        name: newListName,
        description: newListDescription,
        isPublic: newListIsPublic,
      });
      setWatchlists([...watchlists, newWatchlist]);
      setShowCreateForm(false);
      setNewListName("");
      setNewListDescription("");
      setNewListIsPublic(true);
    } catch (error) {
      console.error("Error creating watchlist:", error);
    }
  };

  const handleDeleteList = async (id: string) => {
    try {
      await watchlistAPI.deleteWatchlist(id);
      setWatchlists(watchlists.filter((w) => w.id !== id));
    } catch (error) {
      console.error("Error deleting watchlist:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Please Sign In</h1>
          <p className="text-gray-400 mb-6">
            You need to be signed in to view your watchlists.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading watchlists...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">My Watchlists</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create List
          </button>
        </div>

        {/* Create List Form */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold text-white mb-4">
                Create New Watchlist
              </h2>
              <form onSubmit={handleCreateList} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    List Name
                  </label>
                  <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter list name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newListDescription}
                    onChange={(e) => setNewListDescription(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your list"
                    rows={3}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={newListIsPublic}
                    onChange={(e) => setNewListIsPublic(e.target.checked)}
                    className="h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <label
                    htmlFor="isPublic"
                    className="ml-2 text-sm text-gray-300"
                  >
                    Make this list public
                  </label>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors"
                  >
                    Create List
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Watchlists Grid */}
        {watchlists.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl mb-4">No watchlists yet</div>
            <p className="text-gray-500 mb-6">
              Create your first watchlist to start organizing your anime!
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First List
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlists.map((watchlist) => {
              const animeInList = anime?.filter((a) =>
                watchlist?.animeIds?.includes(a.id)
              );

              return (
                <div
                  key={watchlist.id}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        {watchlist.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {watchlist.isPublic ? (
                          <Eye
                            className="h-4 w-4 text-green-400"
                            title="Public"
                          />
                        ) : (
                          <EyeOff
                            className="h-4 w-4 text-red-400"
                            title="Private"
                          />
                        )}
                        <button className="text-gray-400 hover:text-white">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteList(watchlist.id)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4">
                      {watchlist.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span>{animeInList.length} anime</span>
                      <span>Updated {watchlist.updatedAt}</span>
                    </div>

                    {animeInList.length > 0 && (
                      <div className="flex -space-x-2 overflow-hidden mb-4">
                        {animeInList.slice(0, 5).map((animeItem, index) => (
                          <img
                            key={animeItem.id}
                            src={animeItem.coverImage}
                            alt={animeItem.title}
                            className="w-10 h-12 object-cover rounded border-2 border-gray-800"
                            style={{ zIndex: 5 - index }}
                          />
                        ))}
                        {animeInList.length > 5 && (
                          <div className="w-10 h-12 bg-gray-700 rounded border-2 border-gray-800 flex items-center justify-center text-xs text-gray-300">
                            +{animeInList.length - 5}
                          </div>
                        )}
                      </div>
                    )}

                    <Link
                      to={`/watchlist/${watchlist.id}`}
                      className="block w-full text-center py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      View List
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
