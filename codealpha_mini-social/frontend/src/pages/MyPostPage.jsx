import React, { useEffect, useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Filter,
  Search,
  Grid,
  List,
  Image as ImageIcon,
  Bookmark,
  Loader2,
  ChevronLeft,
  BarChart3,
  Download,
  Users,
} from "lucide-react";
import DashboardLayout from "../Root/DashboardLayout";
import { usePostStore } from "../Store/PostStore";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
  const { getPostByUserId, postByUserId, deletePost, isLoading } =
    usePostStore();
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        await getPostByUserId();
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchPost();
  }, [getPostByUserId]);

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const payload = { postId };
      await deletePost(payload);
    }
  };

  const handleEdit = (post) => {
    navigate("/create", { state: { ...post } });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays < 1) return "Today";
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getPrivacyIcon = (privacy) => {
    switch (privacy) {
      case "public":
        return "🌍";
      case "followers":
        return "👥";
      case "private":
        return "🔒";
      default:
        return "🌍";
    }
  };

  // Filter posts based on search and filter
  const filteredPosts = postByUserId?.filter((post) => {
    const matchesSearch =
      search === "" ||
      (post.content &&
        post.content.toLowerCase().includes(search.toLowerCase()));

    if (filter === "all") return matchesSearch;
    if (filter === "withImage") return matchesSearch && post.image;
    if (filter === "textOnly") return matchesSearch && !post.image;
    return matchesSearch && post.privacy === filter;
  });

  const totalLikes =
    postByUserId?.reduce((sum, post) => sum + (post.likes?.length || 0), 0) ||
    0;
  const totalComments =
    postByUserId?.reduce(
      (sum, post) => sum + (post.comments?.length || 0),
      0
    ) || 0;
  const postsWithImages = postByUserId?.filter((p) => p.image).length || 0;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="animate-spin text-blue-500" size={40} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-gray-800">My Posts</h1>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Filter size={20} />
            </button>
          </div>

          {/* Mobile Search */}
          {showMobileFilters && (
            <div className="mt-3 space-y-3 animate-slideDown">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {["all", "withImage", "textOnly"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${
                      filter === f
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {f === "all"
                      ? "All"
                      : f === "withImage"
                      ? "With Images"
                      : "Text Only"}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block w-full bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-full mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Posts</h1>
              <p className="text-gray-500 text-sm">
                Manage all your posts in one place
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
                <Download size={18} />
                <span>Export</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <BarChart3 size={18} />
                <span>Analytics</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="w-full px-4 lg:px-6 py-4 lg:py-6">
              <div className="max-w-full mx-auto">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6">
                  <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <ImageIcon size={20} className="text-blue-500" />
                      </div>
                      <div>
                        <div className="text-2xl lg:text-3xl font-bold text-gray-800">
                          {postByUserId?.length || 0}
                        </div>
                        <div className="text-xs lg:text-sm text-gray-500">
                          Total Posts
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                        <Heart size={20} className="text-red-500" />
                      </div>
                      <div>
                        <div className="text-2xl lg:text-3xl font-bold text-gray-800">
                          {totalLikes}
                        </div>
                        <div className="text-xs lg:text-sm text-gray-500">
                          Total Likes
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                        <MessageCircle size={20} className="text-green-500" />
                      </div>
                      <div>
                        <div className="text-2xl lg:text-3xl font-bold text-gray-800">
                          {totalComments}
                        </div>
                        <div className="text-xs lg:text-sm text-gray-500">
                          Comments
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                        <Users size={20} className="text-purple-500" />
                      </div>
                      <div>
                        <div className="text-2xl lg:text-3xl font-bold text-gray-800">
                          {postsWithImages}
                        </div>
                        <div className="text-xs lg:text-sm text-gray-500">
                          With Images
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Controls */}
                <div className="hidden lg:flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        placeholder="Search your posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Posts</option>
                      <option value="withImage">With Images</option>
                      <option value="textOnly">Text Only</option>
                      <option value="public">Public</option>
                      <option value="followers">Followers Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                </div>

                <div className="pt-16 lg:pt-0">
                  {view === "grid" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                      {filteredPosts?.map((post) => (
                        <div
                          key={post._id}
                          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
                        >
                          {post.image ? (
                            <div className="h-48 lg:h-56 overflow-hidden">
                              <img
                                src={post.image}
                                alt="Post"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ) : (
                            <div className="h-48 lg:h-56 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                              <div className="text-center">
                                <ImageIcon
                                  size={40}
                                  className="text-gray-300 mx-auto mb-2"
                                />
                                <p className="text-gray-400 text-sm">
                                  No Image
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">
                                  {formatDate(post.createdAt)}
                                </span>
                                <span className="text-lg">
                                  {getPrivacyIcon(post.privacy)}
                                </span>
                              </div>

                              <div className="flex gap-1">
                                <button
                                  onClick={() => handleEdit(post)}
                                  className="p-1.5 hover:bg-blue-50 rounded-lg"
                                >
                                  <Edit size={16} className="text-blue-500" />
                                </button>
                                <button
                                  onClick={() => handleDelete(post._id)}
                                  className="p-1.5 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 size={16} className="text-red-500" />
                                </button>
                              </div>
                            </div>

                            <p className="text-gray-800 text-sm line-clamp-3 mb-4">
                              {post.content}
                            </p>

                            <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                              <div className="flex gap-3">
                                <span className="flex items-center gap-1">
                                  <Heart size={14} />
                                  {post.likes?.length || 0}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageCircle size={14} />
                                  {post.comments?.length || 0}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Bookmark size={14} />
                                  {post.bookmarks || 0}
                                </span>
                              </div>

                              <button className="text-blue-500 hover:text-blue-600">
                                <Eye size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Empty State */}
                  {(!filteredPosts || filteredPosts.length === 0) && (
                    <div className="text-center py-12 lg:py-20">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                        <ImageIcon size={40} className="text-gray-400" />
                      </div>
                      <h3 className="text-lg lg:text-xl font-semibold text-gray-700 mb-2">
                        {search ? "No matching posts found" : "No posts yet"}
                      </h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        {search
                          ? `No posts match "${search}"`
                          : "Start sharing your thoughts with the community"}
                      </p>
                      <button
                        onClick={() => navigate("/create")}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all"
                      >
                        Create Your First Post
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View Toggle Bar */}
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30">
          <div className="bg-white rounded-xl shadow-lg p-2 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setView("list")}
                className={`px-4 py-2 rounded-lg ${
                  view === "list" ? "bg-blue-500 text-white" : "text-gray-600"
                }`}
              >
                <List size={20} />
              </button>
              <button
                onClick={() => setView("grid")}
                className={`px-4 py-2 rounded-lg ${
                  view === "grid" ? "bg-blue-500 text-white" : "text-gray-600"
                }`}
              >
                <Grid size={20} />
              </button>
            </div>
            <button
              onClick={() => navigate("/create")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium"
            >
              New Post
            </button>
          </div>
        </div>

        {/* Add padding for mobile bottom bar */}
        <div className="lg:hidden pb-24"></div>
      </div>
    </DashboardLayout>
  );
};

export default MyPosts;
