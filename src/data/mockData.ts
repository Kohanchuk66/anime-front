import { Anime, Character, Studio, Review, News, Watchlist } from '../types';

export const mockStudios: Studio[] = [
  {
    id: '1',
    name: 'Studio Ghibli',
    founded: 1985,
    description: 'Famous Japanese animation studio known for acclaimed films.'
  },
  {
    id: '2',
    name: 'Toei Animation',
    founded: 1948,
    description: 'One of the oldest and largest anime studios in Japan.'
  },
  {
    id: '3',
    name: 'Madhouse',
    founded: 1972,
    description: 'Renowned for high-quality animation and diverse projects.'
  }
];

export const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Monkey D. Luffy',
    image: 'https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg?w=400',
    role: 'main',
    description: 'Captain of the Straw Hat Pirates with rubber powers.'
  },
  {
    id: '2',
    name: 'Roronoa Zoro',
    image: 'https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?w=400',
    role: 'main',
    description: 'Swordsman of the Straw Hat Pirates.'
  },
  {
    id: '3',
    name: 'Nami',
    image: 'https://images.pexels.com/photos/3829228/pexels-photo-3829228.jpeg?w=400',
    role: 'main',
    description: 'Navigator of the Straw Hat Pirates.'
  }
];

export const mockAnime: Anime[] = [
  {
    id: '1',
    title: 'Attack on Titan',
    synopsis: 'Humanity fights for survival against giant humanoid Titans that devour humans.',
    coverImage: 'https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?w=600',
    bannerImage: 'https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?w=1200',
    episodes: 87,
    status: 'completed',
    genres: ['Action', 'Drama', 'Fantasy'],
    rating: 9.0,
    year: 2013,
    studio: mockStudios[2],
    characters: mockCharacters,
    reviews: []
  },
  {
    id: '2',
    title: 'My Hero Academia',
    synopsis: 'In a world where superpowers are common, a powerless boy dreams of becoming a hero.',
    coverImage: 'https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg?w=600',
    bannerImage: 'https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg?w=1200',
    episodes: 158,
    status: 'airing',
    genres: ['Action', 'Superhero', 'School'],
    rating: 8.5,
    year: 2016,
    studio: mockStudios[1],
    characters: mockCharacters,
    reviews: []
  },
  {
    id: '3',
    title: 'Demon Slayer',
    synopsis: 'A young boy becomes a demon slayer to avenge his family and cure his sister.',
    coverImage: 'https://images.pexels.com/photos/3829228/pexels-photo-3829228.jpeg?w=600',
    bannerImage: 'https://images.pexels.com/photos/3829228/pexels-photo-3829228.jpeg?w=1200',
    episodes: 44,
    status: 'completed',
    genres: ['Action', 'Supernatural', 'Historical'],
    rating: 8.7,
    year: 2019,
    studio: mockStudios[0],
    characters: mockCharacters,
    reviews: []
  },
  {
    id: '4',
    title: 'One Piece',
    synopsis: 'Follow Monkey D. Luffy on his quest to find the legendary treasure One Piece.',
    coverImage: 'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?w=600',
    bannerImage: 'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?w=1200',
    episodes: 1000,
    status: 'airing',
    genres: ['Adventure', 'Comedy', 'Action'],
    rating: 9.2,
    year: 1999,
    studio: mockStudios[1],
    characters: mockCharacters,
    reviews: []
  },
  {
    id: '5',
    title: 'Naruto',
    synopsis: 'A young ninja seeks recognition and dreams of becoming the Hokage.',
    coverImage: 'https://images.pexels.com/photos/3829088/pexels-photo-3829088.jpeg?w=600',
    bannerImage: 'https://images.pexels.com/photos/3829088/pexels-photo-3829088.jpeg?w=1200',
    episodes: 720,
    status: 'completed',
    genres: ['Action', 'Martial Arts', 'Ninja'],
    rating: 8.3,
    year: 2002,
    studio: mockStudios[2],
    characters: mockCharacters,
    reviews: []
  },
  {
    id: '6',
    title: 'Death Note',
    synopsis: 'A high school student discovers a supernatural notebook that kills anyone whose name is written in it.',
    coverImage: 'https://images.pexels.com/photos/3829229/pexels-photo-3829229.jpeg?w=600',
    bannerImage: 'https://images.pexels.com/photos/3829229/pexels-photo-3829229.jpeg?w=1200',
    episodes: 37,
    status: 'completed',
    genres: ['Psychological', 'Thriller', 'Supernatural'],
    rating: 9.0,
    year: 2006,
    studio: mockStudios[2],
    characters: mockCharacters,
    reviews: []
  }
];

export const mockNews: News[] = [
  {
    id: '1',
    title: 'Attack on Titan Final Season Announced',
    content: 'The highly anticipated final season of Attack on Titan has been officially announced...',
    author: {
      id: '2',
      username: 'moderator',
      email: 'mod@aniverse.com',
      role: 'moderator',
      bio: 'Community moderator',
      joinDate: '2023-02-15',
      isOnline: true,
      isBanned: false
    },
    createdAt: '2024-01-15',
    image: 'https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg?w=800',
    tags: ['Attack on Titan', 'News', 'Final Season']
  },
  {
    id: '2',
    title: 'New Studio Ghibli Film in Production',
    content: 'Studio Ghibli announces their next magical adventure film...',
    author: {
      id: '2',
      username: 'moderator',
      email: 'mod@aniverse.com',
      role: 'moderator',
      bio: 'Community moderator',
      joinDate: '2023-02-15',
      isOnline: true,
      isBanned: false
    },
    createdAt: '2024-01-10',
    image: 'https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg?w=800',
    tags: ['Studio Ghibli', 'News', 'Film']
  }
];

export const mockWatchlists: Watchlist[] = [
  {
    id: '1',
    userId: '3',
    name: 'Currently Watching',
    description: 'Anime I am currently watching',
    isPublic: true,
    animeIds: ['2', '4'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    userId: '3',
    name: 'Favorites',
    description: 'My all-time favorite anime',
    isPublic: true,
    animeIds: ['1', '6'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-10'
  },
  {
    id: '3',
    userId: '3',
    name: 'Private Collection',
    description: 'My private anime collection',
    isPublic: false,
    animeIds: ['3', '5'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-12'
  }
];