import React, { useState } from "react";
import { Heart, MessageCircle, Share2, MoreVertical } from "lucide-react";

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const user = {
    name: "Mariam Tairu",
    username: "@mariam_tairu",
    bio: "Digital creator from Lagos.",
    posts: 87,
    followers: "1.2K",
    following: 356,
  };

  const posts = [
    { id: 1, text: "Beautiful morning!", likes: 245, comments: 42 },
    { id: 2, text: "New fashion finds", likes: 89, comments: 23 },
    { id: 3, text: "Sunset views", likes: 312, comments: 56 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Profile Header */}
      <div className="bg-white rounded-lg p-4 mb-4 shadow">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mariam"
            alt={user.name}
            className="w-20 h-20 rounded-full"
          />
          <div className="flex-1">
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.username}</p>
            <p className="text-gray-700 mt-1">{user.bio}</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <div className="font-bold">{user.posts}</div>
            <div className="text-sm text-gray-500">Posts</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{user.followers}</div>
            <div className="text-sm text-gray-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{user.following}</div>
            <div className="text-sm text-gray-500">Following</div>
          </div>
        </div>

        {/* Follow Button */}
        <button
          onClick={() => setIsFollowing(!isFollowing)}
          className={`w-full py-2 rounded-lg font-medium ${
            isFollowing
              ? "bg-gray-100 text-gray-800"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>

      {/* Posts */}
      <div>
        <h2 className="font-semibold mb-3">Posts</h2>
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg p-4 shadow">
              <p className="mb-3">{post.text}</p>
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1">
                    <Heart size={16} />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={16} />
                    {post.comments}
                  </span>
                </div>
                <button className="hover:bg-gray-100 p-1 rounded">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
