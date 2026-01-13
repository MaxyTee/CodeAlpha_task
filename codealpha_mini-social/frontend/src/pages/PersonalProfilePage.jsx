import React, { useState } from "react";
import { Mail, Calendar, Edit, Camera } from "lucide-react";
import DashboardLayout from "../Root/DashboardLayout";
import { useAuthStore } from "../Store/AuthStore";

const PersonalProfile = () => {
  const { user: newUser, updateUser } = useAuthStore();

  const [user, setUser] = useState(newUser);
  const [imageFile, setImageFile] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ ...user });

  const followersCount = user.followers?.length || 0;
  const followingCount = user.following?.length || 0;

  const handleEdit = () => {
    setEditMode(true);
    setEditData({ ...user });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
    }
  };

  //   const removeImage = () => {
  //     setImageFile(null);
  //   };

  const handleSave = async () => {
    setUser(editData);
    setEditMode(false);

    const formData = new FormData();
    console.log("EditData", editData);

    const { name, email, bio } = editData;
    formData.append("name", name);
    formData.append("email", email);
    formData.append("bio", bio);
    if (imageFile) formData.append("image", imageFile);

    await updateUser(formData);
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditData({ ...user });
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            <button
              onClick={editMode ? handleSave : handleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {editMode ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            {/* Profile Picture */}
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                {/* handleImageUpload */}

                {editData.image && (
                  <img
                    src={editData.image}
                    loading="lazy"
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow"
                  />
                )}

                {/* <Image size={20} className="text-blue-500" /> */}
                {editMode && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className=""
                  />
                )}

                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow">
                  <Camera size={16} />
                </button>
              </div>

              <div>
                {editMode ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="text-2xl font-bold border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-800">
                    {user.name}
                  </h2>
                )}

                <div className="flex items-center gap-2 mt-1">
                  <Mail size={16} className="text-gray-500" />
                  <span className="text-gray-600">{user.email}</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              {editMode ? (
                <textarea
                  value={editData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-700">{user.bio || "No bio yet"}</p>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-800">
                  {followersCount}
                </div>
                <div className="text-gray-600">Followers</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-800">
                  {followingCount}
                </div>
                <div className="text-gray-600">Following</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-800">
                  {user.lastlogin ? formatDate(user.lastlogin) : "N/A"}
                </div>
                <div className="text-gray-600">Last Login</div>
              </div>
            </div>

            {/* Account Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-700">Email</div>
                    <div className="text-gray-600">{user.email}</div>
                  </div>
                </div>
                {editMode && (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="px-3 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                )}
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-700">
                      Member Since
                    </div>
                    <div className="text-gray-600">
                      {user.createdAt ? formatDate(user.createdAt) : "Recently"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Follow Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Followers */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4">
                Followers ({followersCount})
              </h3>
              {followersCount > 0 ? (
                <div className="space-y-3">
                  {user.followers?.slice(0, 5).map((follower, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Follower${index}`}
                        alt="Follower"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium">Follower {index + 1}</div>
                        <div className="text-sm text-gray-500">
                          @follower{index}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No followers yet
                </p>
              )}
            </div>

            {/* Following */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4">
                Following ({followingCount})
              </h3>
              {followingCount > 0 ? (
                <div className="space-y-3">
                  {user.following?.slice(0, 5).map((followed, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Following${index}`}
                        alt="Following"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium">Following {index + 1}</div>
                        <div className="text-sm text-gray-500">
                          @following{index}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Not following anyone yet
                </p>
              )}
            </div>
          </div>

          {/* Edit Mode Actions */}
          {editMode && (
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PersonalProfile;
