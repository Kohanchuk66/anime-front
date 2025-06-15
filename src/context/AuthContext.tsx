import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@aniverse.com',
    role: 'admin',
    bio: 'Platform administrator',
    joinDate: '2023-01-01',
    isOnline: true,
    isBanned: false,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=400'
  },
  {
    id: '2',
    username: 'moderator',
    email: 'mod@aniverse.com',
    role: 'moderator',
    bio: 'Community moderator',
    joinDate: '2023-02-15',
    isOnline: true,
    isBanned: false,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=400'
  },
  {
    id: '3',
    username: 'animeotaku',
    email: 'user@aniverse.com',
    role: 'user',
    bio: 'Anime enthusiast and collector',
    joinDate: '2023-03-20',
    isOnline: false,
    isBanned: false,
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=400'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login logic
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // Mock registration logic
    if (mockUsers.find(u => u.email === email || u.username === username)) {
      return false; // User already exists
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      role: 'user',
      joinDate: new Date().toISOString().split('T')[0],
      isOnline: true,
      isBanned: false
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      // Update in mock users array
      const userIndex = mockUsers.findIndex(u => u.id === user.id);
      if (userIndex >= 0) {
        mockUsers[userIndex] = updatedUser;
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}