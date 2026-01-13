import React, { useState } from "react";
import { Image, X, Globe, ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../Root/DashboardLayout";
import { usePostStore } from "../Store/PostStore";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../Store/AuthStore";

const CreatePostPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [content, setContent] = useState(location?.state?.content || "");
  const [imageFile, setImageFile] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const { createPost, updatePostbyUserId } = usePostStore();
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !imageFile) {
      toast.error("Please write something or add an image");
      return;
    }

    if (content === location?.state?.content && !imageFile) {
      toast.error("No changes detected");
      return;
    }

    setIsPosting(true);

    try {
      if (location.state) {
        const payload = { postId: location?.state._id, content };
        await updatePostbyUserId(payload);
        toast.success("Post updated successfully");
        navigate("/myPost");
      } else {
        const formData = new FormData();
        formData.append("content", content);
        if (imageFile) formData.append("image", imageFile);

        await createPost(formData);
        toast.success("Post created successfully");
        navigate("/homePage");
      }

      setContent("");
      setImageFile(null);
      setPreview(null);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft size={20} />
              <span className="font-medium">Back</span>
            </button>
            <h1 className="text-lg font-bold text-gray-800">Create Post</h1>
            <button
              onClick={handleSubmit}
              disabled={isPosting || (!content.trim() && !imageFile)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg disabled:opacity-50"
            >
              {isPosting ? "..." : "Post"}
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block w-full bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-full mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Create Post</h1>
              <p className="text-gray-500 text-sm">
                Share your thoughts with the community
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isPosting || (!content.trim() && !imageFile)}
                className="px-8 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isPosting ? "Posting..." : "Share Post"}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-16 lg:pt-0">
          <div className="w-full px-4 lg:px-8 py-6">
            <div className="max-w-full mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Sidebar - Hidden on mobile */}
                <div className="hidden lg:block space-y-6">
                  {/* User Profile */}
                  <div className="bg-white rounded-2xl shadow p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={
                          user?.image ||
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                        }
                        alt={user?.name}
                        className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                      />
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {user?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          @{user?.username || "user"}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="mb-2">Tips for great posts:</p>
                      <ul className="space-y-1">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Be authentic and genuine</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Add relevant images</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Use hashtags appropriately</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Main Post Form - Full width on mobile, 2 columns on desktop */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* User Info */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            user?.image ||
                            "https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                          }
                          alt={user?.name}
                          className="w-12 h-12 rounded-full border-2 border-white shadow"
                        />
                        <div>
                          <h2 className="font-bold text-gray-800">
                            {user?.name}
                          </h2>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Globe size={14} />
                            <span>Public • Everyone can see this</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-6">
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind? Share your thoughts..."
                        className="w-full min-h-[200px] lg:min-h-[250px] border-none focus:outline-none text-gray-800 placeholder-gray-400 resize-none text-lg bg-transparent"
                        rows="6"
                      />

                      {/* Image Preview */}
                      {preview && (
                        <div className="relative mt-6 rounded-xl overflow-hidden">
                          <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-auto max-h-[500px] object-cover rounded-xl"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 border-t border-gray-100">
                      <div className="flex flex-wrap items-center gap-4">
                        <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer transition-colors">
                          <Image size={20} />
                          <span className="font-medium">Photo/Video</span>
                          <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>

                        <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors">
                          <Globe size={20} />
                          <span className="font-medium">Change Privacy</span>
                        </button>

                        <select className="ml-auto px-4 py-3 bg-gray-50 text-gray-700 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="public">Public</option>
                          <option value="followers">Followers Only</option>
                          <option value="private">Only Me</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Action Bar */}
                  <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 text-gray-700">
                        <Image size={20} />
                        <span className="text-sm font-medium">Add Media</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <button
                        onClick={handleSubmit}
                        disabled={isPosting || (!content.trim() && !imageFile)}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg disabled:opacity-50"
                      >
                        {isPosting ? "Posting..." : "Share Post"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add padding for mobile bottom bar */}
        <div className="lg:hidden pb-20"></div>
      </div>
    </DashboardLayout>
  );
};

export default CreatePostPage;
