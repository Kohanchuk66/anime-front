import React from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Globe, Calendar } from 'lucide-react';

interface ProfileHeaderProps {
  profile: any; // Replace with proper type
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0">
          <img
            src={profile?.avatar || '/default-avatar.png'}
            alt={profile?.username}
            className="h-24 w-24 rounded-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">{profile?.username}</h1>
          <div className="mt-2 flex items-center space-x-4 text-gray-400">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>Joined {new Date(profile?.createdAt).toLocaleDateString()}</span>
            </div>
            {profile?.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>{profile.email}</span>
              </div>
            )}
          </div>
          <p className="mt-4 text-gray-300">{profile?.bio || 'No bio provided'}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
