import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileHeader from "./ProfileHeader";
import { userAPI } from "../../services/api";

export function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("====================================");
  console.log(user);
  console.log("====================================");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const data = await userAPI.getUser(user?.username);
        setProfileData(data);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, username]);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <ProfileHeader profile={profileData} />
            <div className="mt-8 bg-gray-800 rounded-lg p-6">
              {/* Add profile content sections here */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
