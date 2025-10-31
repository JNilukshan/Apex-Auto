import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { useAuth } from "../context/useAuth";
import apiService from "../services/api";

import Sidenav from "../components/Sidenav";
import Header from "../components/Header";
import HotCollectionsCard from "../components/HotCollectionsCard";
import BuildDetailModal from "../components/BuildDetailModal";
import RegularCollectionsTable from "../components/RegularCollectionsTable";
import SilverGradientBackground from "../components/SilverGradientBackground";

export default function DashboardPage({ onNavigate }) {
  const { user, signOut } = useAuth();
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBuild, setSelectedBuild] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        setError(null);
        const [userBuilds] = await Promise.all([
          apiService.getBuildsByUserId(user._id || user.id),
          apiService.getServices(),
        ]);
        setBuilds(userBuilds || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleDeleteBuild = async (buildId) => {
    try {
      await apiService.deleteBuild(buildId);
      setBuilds((prev) => prev.filter((b) => b._id !== buildId));
    } catch (err) {
      console.error("Error deleting build:", err);
      setError("Failed to delete build");
    }
  };

  if (loading)
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-400">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin mb-6"></div>

      {/* Text */}
      <p className="text-lg font-semibold text-gray-800 tracking-wide animate-pulse">
        Loading your dashboard...
      </p>
    </div>
  );


  if (error)
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400">
        <div className="text-center bg-white rounded-3xl p-8 shadow-lg">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
  <div className="relative min-h-screen p-4">
    {/* 🔹 Silver Gradient Background Component */}
    <SilverGradientBackground />

    {/* ✅ Main Rounded Content Area */}
<div className="relative bg-gray-100 rounded-3xl shadow-2xl overflow-hidden max-w-8xl m-16 flex flex-col">

      {/* 🔹 Header spans full width */}
      <div className="border-b border-gray-100">
        <Header onNavigate={onNavigate} />
      </div>

      {/* 🔹 Content Area (Sidenav + Main Section) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0 pt-0">
          <Sidenav signOut={signOut} onNavigate={onNavigate} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* User Greeting and Search Section */}
          <div className="flex justify-between items-center mb-8">
            {/* Greeting */}
            <div>
              <p className="text-gray-400 text-sm mb-1">Good Morning,</p>
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.name || "Jeff Reeves"}
              </h1>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-72 bg-white border border-gray-200 rounded-full pl-12 pr-4 py-3 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Hot Collections */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              🔥 Hot Collections
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HotCollectionsCard idx={0} />
              <HotCollectionsCard idx={1} />
            </div>
          </section>

          {/* Regular Collections */}
          <RegularCollectionsTable
            builds={builds}
            onNavigate={onNavigate}
            handleDeleteBuild={handleDeleteBuild}
            setSelectedBuild={setSelectedBuild}
          />
        </div>
      </div>
    </div>

    {/* 🔹 Build Details Modal */}
    {selectedBuild && (
      <BuildDetailModal
        build={selectedBuild}
        onClose={() => setSelectedBuild(null)}
      />
    )}
  </div>
);
}