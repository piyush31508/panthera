import { getData, getUserById } from "../services/api";
import { useEffect, useState } from "react";
import {
  Filter,
  Home,
  Grid,
  List,
  Heart,
  Star,
  MapPin,
  Calendar,
  User,
  Sparkles,
} from "lucide-react";
import PropertyCard from "../components/propertyCard";
import Pagination from "../components/pagination";
import SidebarFilter from "../components/sidebarFilter";
import ChatbotWidget from "../components/chatbotWidget";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    minPrice: "",
    maxPrice: "",
    minSqFt: "",
    maxSqFt: "",
    community: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("price-low");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch properties
        const propertiesRes = await getData();
        setProperties(propertiesRes.data);

        // Fetch user data - assuming user ID is stored in localStorage or context
        const userId = localStorage.getItem("userId") || "1"; // Default fallback
        try {
          const userRes = await getUserById(userId);
          setUser(userRes.data);
        } catch (userError) {
          console.log("User not authenticated:", userError);
          // Set a default user name if not authenticated
          setUser({ name: "Guest" });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setUser({ name: "Guest" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProperties = properties.filter((p) => {
    return (
      (!filters.city ||
        (p.city &&
          p.city.toLowerCase().includes(filters.city.toLowerCase()))) &&
      (!filters.state ||
        (p.state &&
          p.state.toLowerCase().includes(filters.state.toLowerCase()))) &&
      (!filters.community ||
        (p.community &&
          p.community
            .toLowerCase()
            .includes(filters.community.toLowerCase()))) &&
      (!filters.minPrice ||
        (p.homesitePrice && p.homesitePrice >= parseInt(filters.minPrice))) &&
      (!filters.maxPrice ||
        (p.homesitePrice && p.homesitePrice <= parseInt(filters.maxPrice))) &&
      (!filters.minSqFt ||
        (p.homesiteSqFt && p.homesiteSqFt >= parseInt(filters.minSqFt))) &&
      (!filters.maxSqFt ||
        (p.homesiteSqFt && p.homesiteSqFt <= parseInt(filters.maxSqFt)))
    );
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.homesitePrice || 0) - (b.homesitePrice || 0);
      case "price-high":
        return (b.homesitePrice || 0) - (a.homesitePrice || 0);
      case "sqft-low":
        return (a.homesiteSqFt || 0) - (b.homesiteSqFt || 0);
      case "sqft-high":
        return (b.homesiteSqFt || 0) - (a.homesiteSqFt || 0);
      case "community":
        return (a.community || "").localeCompare(b.community || "");
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);
  const paginatedData = sortedProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setFilters({
      city: "",
      state: "",
      minPrice: "",
      maxPrice: "",
      minSqFt: "",
      maxSqFt: "",
      community: "",
    });
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-yellow-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-amber-700 font-semibold">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-amber-50">
      {/* Enhanced Hero Section with beautiful gradient */}
      <div className="relative bg-gradient-to-br from-pink-100 via-orange-400 to-pink-600 text-white overflow-hidden">
        {/* Multi-layered Background Pattern */}
        <div className="absolute inset-0">
          {/* Primary gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-rose-600/20"></div>
          {/* Secondary gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-cyan-500/10"></div>
        </div>

        {/* Floating Icons with varied colors */}
        <div className="absolute inset-0 overflow-hidden">
          <Home className="absolute top-20 left-20 w-8 h-8 text-amber-300 opacity-60 animate-bounce drop-shadow-lg" />
          <Heart className="absolute top-40 right-32 w-6 h-6 text-pink-300 opacity-70 animate-pulse drop-shadow-lg" />
          <Star className="absolute bottom-32 left-40 w-7 h-7 text-yellow-300 opacity-65 animate-spin slow drop-shadow-lg" />
          <MapPin className="absolute top-60 left-60 w-5 h-5 text-rose-300 opacity-60 animate-bounce delay-300 drop-shadow-lg" />
          <Sparkles className="absolute top-32 right-20 w-6 h-6 text-purple-300 opacity-50 animate-pulse delay-700 drop-shadow-lg" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Personalized Welcome */}
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mr-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm text-amber-100 font-medium">Good day!</p>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                  Welcome
                  <span className="bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
                    {" "}
                    {user?.name || "Guest"}
                  </span>
                  <Sparkles className="inline-block w-8 h-8 ml-2 text-white animate-pulse" />
                </h1>
              </div>
            </div>

            <p className="text-xl mb-12 text-amber-50 max-w-3xl mx-auto font-medium leading-relaxed">
              Ready to discover your perfect home? Browse through our curated
              collection of beautiful properties in stunning communities.
            </p>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <Home className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {properties.length}+
                </div>
                <div className="text-amber-100 text-sm">Properties</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <MapPin className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-amber-100 text-sm">Communities</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <Heart className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {favorites.size}
                </div>
                <div className="text-amber-100 text-sm">Favorites</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <Star className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-amber-100 text-sm">Satisfaction</div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105">
                <Calendar className="w-5 h-5" />
                <span>Schedule Tour</span>
              </button>
              <button
                className="bg-white text-amber-700 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 shadow-lg"
                onClick={() => {
                  navigate("/map");
                }}
              >
                <MapPin className="w-5 h-5" />
                <span>Explore Map</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filter */}
          <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200/50">
              <SidebarFilter
                filters={filters}
                onFiltersChange={setFilters}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
                isOpen={true}
                onClose={() => {}}
              />
            </div>
          </div>

          {/* Mobile Sidebar Filter */}
          <div className="lg:hidden block">
            <SidebarFilter
              filters={filters}
              onFiltersChange={setFilters}
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-amber-200/50">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-4 lg:mb-0">
                  <h3 className="text-3xl font-extrabold text-amber-700 tracking-tight flex items-center">
                    <Home className="w-8 h-8 mr-3 text-amber-600" />
                    {sortedProperties.length} Homes Found
                  </h3>
                  <p className="text-amber-600 mt-1 font-medium">
                    Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
                    {Math.min(
                      currentPage * itemsPerPage,
                      sortedProperties.length
                    )}{" "}
                    of {sortedProperties.length} results
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-white rounded-xl hover:from-amber-500 hover:to-yellow-500 font-semibold transition-all duration-300 shadow-lg lg:hidden transform hover:scale-105"
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </button>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-white/80 backdrop-blur-sm border-2 border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-400 font-medium text-amber-700 shadow-sm"
                  >
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="sqft-low">Size: Small to Large</option>
                    <option value="sqft-high">Size: Large to Small</option>
                    <option value="community">Community A-Z</option>
                  </select>

                  <div className="flex items-center bg-white/80 backdrop-blur-sm border-2 border-amber-300 rounded-xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-3 transition-all duration-300 ${
                        viewMode === "grid"
                          ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-white shadow-inner"
                          : "text-amber-700 hover:bg-amber-50"
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-3 border-l-2 border-amber-300 transition-all duration-300 ${
                        viewMode === "list"
                          ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-white shadow-inner"
                          : "text-amber-700 hover:bg-amber-50"
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties Grid/List */}
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                  : "space-y-6"
              }`}
            >
              {paginatedData.length > 0 ? (
                paginatedData.map((property) => (
                  <div
                    key={property.id}
                    className="transform hover:scale-105 transition-all duration-300"
                  >
                    <PropertyCard
                      property={property}
                      viewMode={viewMode}
                      favorites={favorites}
                      onToggleFavorite={toggleFavorite}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-amber-200/50">
                    <div className="relative">
                      <Home className="h-20 w-20 text-amber-400 mx-auto mb-6" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full animate-ping"></div>
                    </div>
                    <h3 className="text-3xl font-bold text-amber-700 mb-4">
                      No properties found
                    </h3>
                    <p className="text-amber-600 font-medium mb-6">
                      Try adjusting your filters to discover amazing homes
                    </p>
                    <button
                      onClick={handleClearFilters}
                      className="bg-gradient-to-r from-amber-400 to-yellow-400 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 shadow-lg transform hover:scale-105"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>

        {/* Chatbot Widget */}
        <ChatbotWidget />
      </div>
    </div>
  );
};

export default Dashboard;
