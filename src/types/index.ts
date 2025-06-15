export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'user' | 'moderator' | 'admin';
  bio?: string;
  joinDate: string;
  isOnline: boolean;
  isBanned: boolean;
}

export interface Anime {
  id: string;
  title: string;
  synopsis: string;
  coverImage: string;
  bannerImage?: string;
  episodes: number;
  status: 'airing' | 'completed' | 'upcoming';
  genres: string[];
  rating: number;
  year: number;
  studio: Studio;
  characters: Character[];
  reviews: Review[];
}

export interface Character {
  id: string;
  name: string;
  image: string;
  role: 'main' | 'supporting' | 'minor';
  description: string;
}

export interface Studio {
  id: string;
  name: string;
  logo?: string;
  founded: number;
  description: string;
}

export interface Review {
  id: string;
  userId: string;
  user: User;
  animeId: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  isFlagged: boolean;
}

export interface Watchlist {
  id: string;
  userId: string;
  name: string;
  description: string;
  isPublic: boolean;
  animeIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  image?: string;
  tags: string[];
}

export interface Report {
  id: string;
  reporterId: string;
  targetId: string;
  targetType: 'user' | 'review' | 'comment';
  reason: string;
  description: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}