import React, { useEffect, useState } from "react";
import DashboardLayout from "../Root/DashboardLayout";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Image,
  Video,
  MapPin,
  X,
  Send,
  MoreVertical,
  Filter,
  Search,
  Users,
  Calendar,
  TrendingUp,
  Globe,
  Edit,
  Trash2,
} from "lucide-react";
import { useAuthStore } from "../Store/AuthStore";
import { usePostStore } from "../Store/PostStore";
import { useLikeStore } from "../Store/LikeStore";
import { useCommentStore } from "../Store/CommentStore";
import { TfiWrite } from "react-icons/tfi";
import toast from "react-hot-toast";

const HomePage = () => {
  const { user } = useAuthStore();
  const { likePost, unLikePost } = useLikeStore();
  const { createComment } = useCommentStore();
  const { getAllPost, allPost: posts, createPost } = usePostStore();
  // const [posts, setPosts] = useState(allPost);
  const [newPost, setNewPost] = useState("");
  const [commentTexts, setCommentTexts] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [imagePreview, setImagePreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        await getAllPost(true);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchAllPost();
  }, []);

  const handleLike = async (postId, targetedUserId) => {
    const payload = { postId, targetedUserId };
    await likePost(payload);
    await getAllPost(true);
  };
  const handleunLike = async (postId, targetedUserId) => {
    const payload = { postId, targetedUserId };
    await unLikePost(payload);
    await getAllPost(true);
  };

  const handleCommentSubmit = async (postId) => {
    const comment = commentTexts[postId];
    if (!comment?.trim()) return;

    try {
      const payload = { postId, content: comment };
      await createComment(payload);
      await getAllPost(true);

      setCommentTexts({ ...commentTexts, [postId]: "" });
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() && !imagePreview) return;

    await createPost();

    // const formData = new FormData();
    // formData.append("content", content);
    // if (imageFile) formData.append("image", imageFile);

    // await createPost(formData);
    // toast.success("Post created successfully");

    // const newPostObj = {
    //   _id: `temp-${Date.now()}`,
    //   userId: {
    //     _id: user?._id || "you",
    //     name: user?.name || "You",
    //     image:
    //       user?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
    //   },
    //   content: newPost,
    //   image: imagePreview,
    //   likes: 0,
    //   comments: [],
    //   shares: 0,
    //   createdAt: new Date().toISOString(),
    //   isLiked: false,
    // };

    // setPosts([newPostObj, ...posts]);
    setNewPost("");
    setImagePreview(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleComments = (postId) => {
    setExpandedComments({
      ...expandedComments,
      [postId]: !expandedComments[postId],
    });
  };

  return (
    <DashboardLayout>
      <div className="h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Full Width Header */}
        <div className="w-full bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-full mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Feed</h1>
              <p className="text-gray-500 text-sm">
                Connect with your community
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Globe size={22} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full  px-6 py-6">
          <div className="grid  grid-cols-12 gap-6 max-w-full mx-auto">
            <div className="col-span-3 sticky md:block hidden space-y-6">
              {/* User Profile Card */}
              <div className="bg-white  rounded-2xl shadow p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img
                      src={
                        user?.image ||
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                      }
                      alt={user?.name}
                      className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{user?.name}</h3>
                    <p className="text-sm text-gray-500">
                      @{user?.username || "username"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-800">
                        {user.following?.length || 0}
                      </p>
                      <p className="text-sm text-gray-500">Following</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">
                        {posts.length}
                      </p>
                      <p className="text-sm text-gray-500">Posts</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">
                        {posts.length}
                      </p>
                      <p className="text-sm text-gray-500">Likes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar size={20} />
                  Upcoming Events
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <p className="font-semibold text-blue-700">
                      Community Meetup
                    </p>
                    <p className="text-sm text-gray-600">Tomorrow • 6:00 PM</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <p className="font-semibold text-purple-700">
                      Live Q&A Session
                    </p>
                    <p className="text-sm text-gray-600">Friday • 3:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - 6 columns */}
            <div className="md:col-span-6 pb-9 col-span-full h-screen overflow-y-auto mb-9 flex-1 ">
              {/* Create Post Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <form onSubmit={handlePostSubmit}>
                  <div className="flex gap-4 mb-4">
                    <img
                      src={
                        user?.image ||
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                      }
                      alt="Your avatar"
                      className="w-12 h-12 rounded-full border-2 border-white shadow"
                    />
                    <div className="flex-1">
                      <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="What's on your mind?"
                        className="w-full border-none focus:outline-none text-gray-800 placeholder-gray-400 resize-none text-lg min-h-[100px] bg-transparent"
                      />

                      {imagePreview && (
                        <div className="relative mt-4 rounded-xl overflow-hidden">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-64 object-cover rounded-xl"
                          />
                          <button
                            type="button"
                            onClick={() => setImagePreview(null)}
                            className="absolute top-2 right-2 p-1 bg-gray-900/50 hover:bg-gray-900/70 rounded-full"
                          >
                            <X size={20} className="text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer transition-colors">
                        <Image size={20} />
                        <span>Photo/Video</span>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                      >
                        <MapPin size={20} />
                        <span>Location</span>
                      </button>
                    </div>
                    <button
                      type="submit"
                      disabled={!newPost.trim() && !imagePreview}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl min-w-[120px]"
                    >
                      Share Post
                    </button>
                  </div>
                </form>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 mb-6 bg-white rounded-xl p-1 shadow-sm">
                {["all", "following", "popular", "recent"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Filter size={20} />
                </button>
              </div>

              {/* Posts Feed */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Post Header */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.userId?.image}
                            alt={post.userId?.name}
                            className="w-12 h-12 rounded-full border-2 border-white shadow"
                          />
                          <div>
                            <h3 className="font-bold text-gray-800">
                              {post.userId?.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {formatTime(post.createdAt)} • Public
                            </p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <MoreVertical size={20} className="text-gray-500" />
                        </button>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                          {post.content}
                        </p>
                        {post.image && (
                          <div className="mt-4 rounded-xl overflow-hidden">
                            <img
                              src={post.image}
                              alt="Post"
                              className="w-full h-auto max-h-[600px] object-cover"
                            />
                          </div>
                        )}
                      </div>

                      {/* Post Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Heart
                              size={16}
                              className={
                                post.isLiked ? "text-red-500 fill-red-500" : ""
                              }
                            />
                            {post.likes?.length || 0} likes
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle size={16} />
                            {post.comments?.length || 0} comments
                          </span>
                          <span>{post.shares || 0} shares</span>
                        </div>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                          <Bookmark size={16} />
                          <span>Save</span>
                        </button>
                      </div>

                      {/* Post Actions */}
                      <div className="grid grid-cols-3 gap-2 border-t border-b border-gray-100 py-2 mb-4">
                        <button
                          onClick={() =>
                            post.isLiked
                              ? handleunLike(post._id, post.userId?._id)
                              : handleLike(post._id, post.userId?._id)
                          }
                          className={`flex items-center justify-center gap-2 py-3 rounded-lg transition-colors ${
                            post.isLiked
                              ? "text-red-500 bg-red-50"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          <Heart
                            size={20}
                            className={post.isLiked ? "fill-current" : ""}
                          />
                          <span className="font-medium">Like</span>
                        </button>
                        <button
                          onClick={() => toggleComments(post._id)}
                          className="flex items-center justify-center gap-2 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <MessageCircle size={20} />
                          <span className="font-medium">Comment</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                          <Share2 size={20} />
                          <span className="font-medium">Share</span>
                        </button>
                      </div>

                      {/* Comments Section */}
                      {expandedComments[post._id] && (
                        <div className="space-y-4">
                          {/* Existing Comments */}
                          {post.comments?.length > 0 && (
                            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                              {post.comments.map((comment) => (
                                <div
                                  key={comment._id}
                                  className="flex justify-between"
                                >
                                  <div className="flex-1 group relative">
                                    <img
                                      src={comment.userId?.image}
                                      alt={comment.userId?.name}
                                      className="w-8 h-8 rounded-full"
                                    />
                                    <div className="flex-1">
                                      <div className="bg-gray-50 rounded-2xl rounded-tl-none px-4 py-3">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="font-semibold text-sm text-gray-800">
                                            {comment.userId?.name}
                                          </span>
                                          <span className="text-xs text-gray-400">
                                            {formatTime(comment.createdAt)}
                                          </span>
                                        </div>
                                        <p className="text-gray-700">
                                          {comment.content}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-3 hidden group-hover:block">
                                    <button className="mr-3 cursor-pointer">
                                      <Trash2
                                        size={14}
                                        className="text-red-500"
                                      />
                                    </button>
                                    <button className="cursor-pointer">
                                      <Edit
                                        size={14}
                                        className="text-gray-500"
                                      />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Add Comment Input */}
                          <div className="flex gap-3">
                            <img
                              src={
                                user?.image ||
                                "https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                              }
                              alt="Your avatar"
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-full px-4">
                              <input
                                type="text"
                                value={commentTexts[post._id] || ""}
                                onChange={(e) =>
                                  setCommentTexts({
                                    ...commentTexts,
                                    [post._id]: e.target.value,
                                  })
                                }
                                placeholder="Write a comment..."
                                className="flex-1 bg-transparent border-none focus:outline-none py-3 text-gray-700"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    handleCommentSubmit(post._id);
                                  }
                                }}
                              />
                              <button
                                onClick={() => handleCommentSubmit(post._id)}
                                disabled={!commentTexts[post._id]?.trim()}
                                className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Send size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar - 3 columns */}
            <div className="col-span-3 lg:block hidden space-y-6">
              {/* Who to Follow */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="font-bold text-gray-800 mb-4">Who to Follow</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`}
                          alt={`User ${i}`}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            User {i}
                          </h4>
                          <p className="text-xs text-gray-500">@{`user${i}`}</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow p-6 text-white">
                <h3 className="font-bold text-lg mb-3">Community Guidelines</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    Be respectful to others
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    No spam or self-promotion
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    Keep conversations civil
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    Report inappropriate content
                  </li>
                </ul>
                <button className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm transition-colors">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
