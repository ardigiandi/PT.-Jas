import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import AdminLayout from "@/components/layouts/AdminLayout";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "A passionate web developer with a knack for creating beautiful user experiences.",
    avatar: "https://source.unsplash.com/featured/?person",
    location: "San Francisco, CA",
    joined: "January 2023",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  return (
    <AdminLayout className="p-4 bg-gradient-to-b from-blue-500 to-blue-700 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-blue-600 text-white px-6 py-4 flex items-center space-x-4">
          <img
            src={profile.avatar}
            alt="Profile Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-gray-200">{profile.email}</p>
            <p className="mt-1 text-sm">📍 {profile.location}</p>
            <p className="text-sm">🕒 Joined {profile.joined}</p>
          </div>
        </div>

        {/* About Section */}
        <Card className="m-6">
          <CardContent>
            <h2 className="text-xl font-bold mb-4">About Me</h2>
            {isEditing ? (
              <textarea
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            ) : (
              <p className="text-gray-700 text-lg">{profile.bio}</p>
            )}
          </CardContent>
        </Card>

        {/* Footer Buttons */}
        <div className="m-6 flex justify-end space-x-4">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={handleEditToggle}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg shadow"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={handleEditToggle}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default ProfilePage;