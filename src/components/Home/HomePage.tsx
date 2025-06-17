import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, TrendingUp, Star, Users, ArrowRight } from "lucide-react";
import { animeAPI, newsAPI } from "../../services/api";
import { Anime, News } from "../../types";

export function HomePage() {
  const [featuredAnime, setFeaturedAnime] = useState<Anime[]>([]);
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([]);
  const [latestNews, setLatestNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const [animeData, newsData] = await Promise.all([
        animeAPI.getAnime({ sortBy: "rating" }),
        newsAPI.getNews(),
      ]);

      setFeaturedAnime(animeData.slice(0, 3));
      setTrendingAnime(animeData.slice(3, 6));
      setLatestNews(newsData.slice(0, 2));
    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-blue-900 to-pink-900">
        <div className="absolute inset-0 bg-black/40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?w=1920)",
          }}
        ></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your Anime
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Universe
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover, track, and discuss your favorite anime with a passionate
            community of fans worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/catalog"
              className="inline-flex items-center px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Play className="mr-2 h-5 w-5" />
              Explore Catalog
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-colors"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Anime */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Featured Anime</h2>
            <Link
              to="/catalog"
              className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAnime.map((anime) => (
              <Link
                key={anime.id}
                to={`/anime/${anime.id}`}
                className="group relative bg-gray-700 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="aspect-w-16 aspect-h-24">
                  <img
                    src={anime.coverImage}
                    alt={anime.title}
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {anime.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {anime.rating}
                    </div>
                    <span>{anime.year}</span>
                    <span>{anime.episodes} episodes</span>
                  </div>
                  <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                    {anime.synopsis}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <TrendingUp className="mr-3 h-8 w-8 text-orange-400" />
              Trending Now
            </h2>
            <Link
              to="/catalog?filter=trending"
              className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingAnime.map((anime, index) => (
              <Link
                key={anime.id}
                to={`/anime/${anime.id}`}
                className="flex items-center bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors group"
              >
                <div className="text-2xl font-bold text-purple-400 mr-4 min-w-[2rem]">
                  #{index + 1}
                </div>
                <img
                  src={anime.coverImage}
                  alt={anime.title}
                  className="w-16 h-20 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {anime.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-400 mt-1">
                    <Star className="h-3 w-3 text-yellow-400 mr-1" />
                    {anime.rating}
                    <span className="ml-2">{anime.genres[0]}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                10K+
              </div>
              <div className="text-gray-300">Anime Titles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">50K+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">100K+</div>
              <div className="text-gray-300">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-300">Community</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Latest News</h2>
            <Link
              to="/news"
              className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
            >
              View All News
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestNews.map((news) => (
              <article
                key={news.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <span>{news.author.username}</span>
                    <span className="mx-2">•</span>
                    <span>{news.createdAt}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {news.title}
                  </h3>
                  <p className="text-gray-300 line-clamp-3">{news.content}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {news.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Join the Community?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Connect with fellow anime fans, discover new series, and share your
            passion.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-3 bg-white text-purple-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Users className="mr-2 h-5 w-5" />
            Join AniVerse Today
          </Link>
        </div>
      </section>
    </div>
  );
}
