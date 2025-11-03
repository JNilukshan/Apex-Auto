import { useState, useEffect } from "react";
import { Plus, Search, Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  <div className="relative min-h-screen p-2 sm:p-4">
    {/* 🔹 Silver Gradient Background Component */}
    <SilverGradientBackground />

    {/* ✅ Main Rounded Content Area */}
    <div className="relative bg-gray-100 rounded-3xl shadow-2xl overflow-hidden max-w-8xl m-2 sm:m-4 lg:m-16 flex flex-col">

      {/* 🔹 Header spans full width */}
      <div className="border-b border-gray-100">
        <Header onNavigate={onNavigate} />
      </div>

      {/* 🔹 Content Area (Sidenav + Main Section) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden fixed top-6 left-6 z-40 bg-black text-white p-2 rounded-xl shadow-lg"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Sidebar - Hidden on mobile, visible on larger screens OR mobile overlay */}
        <div className={`${isMobileMenuOpen ? 'fixed inset-y-0 left-0 z-40 lg:relative lg:inset-auto' : 'hidden lg:flex'} flex-shrink-0 pt-0`}>
          <Sidenav signOut={signOut} onNavigate={onNavigate} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:ml-0">
          {/* User Greeting and Search Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4 mt-16 lg:mt-0">
            {/* Greeting */}
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-sm mb-1">Good Morning,</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {user?.name || "Jeff Reeves"}
              </h1>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-full sm:w-72 bg-white border border-gray-200 rounded-full pl-12 pr-4 py-3 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
            </div>
          </div>

          {/* Hot Collections */}
          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 justify-center sm:justify-start">
              🔥 Hot Collections
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 justify-items-center">
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