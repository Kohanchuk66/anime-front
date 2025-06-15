import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { HomePage } from './components/Home/HomePage';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { CatalogPage } from './components/Catalog/CatalogPage';
import { AnimeDetailPage } from './components/Anime/AnimeDetailPage';
import { WatchlistPage } from './components/Watchlist/WatchlistPage';
import { NewsPage } from './components/News/NewsPage';
import { ModerationPage } from './components/Admin/ModerationPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/anime/:id" element={<AnimeDetailPage />} />
              <Route path="/watchlists" element={<WatchlistPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/moderation" element={<ModerationPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;