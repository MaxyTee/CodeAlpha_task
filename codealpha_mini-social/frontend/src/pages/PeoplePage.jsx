import React, { useEffect, useState } from "react";
import { UserPlus, Users, Briefcase, X, Check, Loader2 } from "lucide-react";
import DashboardLayout from "../Root/DashboardLayout";
import { useAuthStore } from "../Store/AuthStore";
import { useFollowStore } from "../Store/FollowStore";

const PeoplePage = () => {
  const { getAllUser, allUser, user } = useAuthStore();
  const { followUser, unFollowUser, loadingIds } = useFollowStore();
  const [people, setPeople] = useState(allUser || [""]);

  const [filter, setFilter] = useState("all"); // all, following, suggested

  const isUserFollowing = (personId) => {
    return user?.following?.some((f) => f._id === personId);
  };

  console.log(allUser.map(({ _id }) => _id));
  useEffect(() => {
    if (allUser && user) {
      const updatedPeople = allUser.map((person) => {
        return {
          ...person,
          isFollowing: isUserFollowing(person._id),
        };
      });

      setPeople(updatedPeople);
    }
  }, [allUser, user]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getAllUser();
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchUser();
  }, [getAllUser]);

  const handleFollow = async (id) => {
    await followUser(id);

    setPeople(
      people.map((person) =>
        person._id === id
          ? { ...person, isFollowing: !person.isFollowing }
          : person
      )
    );
  };
  const unhandleFollow = async (id) => {
    await unFollowUser(id);

    setPeople(
      people.map((person) =>
        person._id === id
          ? { ...person, isFollowing: !person.isFollowing }
          : person
      )
    );
  };

  const filteredPeople = people.filter((person) => {
    if (filter === "following") return person.isFollowing;
    if (filter === "suggested") return !person.isFollowing;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-4">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Discover People
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Connect with others in your network
                </p>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg">
                <Users size={20} className="text-purple-600" />
                <span className="font-semibold text-purple-600">
                  {people.length}
                </span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filter === "all"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All ({people.length})
              </button>
              <button
                onClick={() => setFilter("following")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filter === "following"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Following ({people.filter((p) => p.isFollowing).length})
              </button>
              <button
                onClick={() => setFilter("suggested")}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filter === "suggested"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Suggested ({people.filter((p) => !p.isFollowing).length})
              </button>
            </div>
          </div>

          {/* People Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPeople.map((person) => (
              <div
                key={person._id}
                className="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={person.image}
                      loading="lazy"
                      alt={person.name}
                      className="w-14 h-14 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {person.name}
                      </h3>
                      <p className="text-sm text-gray-500">{person.email}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <Users size={12} />
                        <span>{person.mutualFriends} mutual</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {person.bio}
                </p>

                {/* Action Button */}
                <button
                  onClick={() =>
                    person.isFollowing
                      ? unhandleFollow(person._id)
                      : handleFollow(person._id)
                  }
                  className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                    person.isFollowing
                      ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      : "bg-purple-500 text-white hover:bg-purple-600"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {loadingIds.includes(person._id) ? (
                      <Loader2 className="animate-spin" size={14} />
                    ) : person.isFollowing ? (
                      <Check size={16} />
                    ) : (
                      <UserPlus size={16} />
                    )}
                    {person.isFollowing ? "Following" : "Follow"}
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPeople.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Users size={48} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No people found
              </h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          )}

          {/* Load More */}
          {filteredPeople.length > 0 && (
            <div className="text-center mt-6">
              <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                Load More People
              </button>
            </div>
          )}

          {/* Stats Card */}
          <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-sm p-6 text-white">
            <h3 className="font-semibold mb-4">Your Network</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{people.length}</div>
                <div className="text-sm text-purple-100">Total People</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {people.filter((p) => p.isFollowing).length}
                </div>
                <div className="text-sm text-purple-100">Following</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {Math.floor(
                    people.reduce((sum, p) => sum + p.mutualFriends, 0) /
                      people.length
                  )}
                </div>
                <div className="text-sm text-purple-100">Avg Mutual</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PeoplePage;
