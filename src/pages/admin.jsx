import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  MapPin,
  Filter,
  Home,
  TrendingUp,
  DollarSign,
  Square,
  Search,
  MoreHorizontal,
} from "lucide-react";
import { getData } from "../services/api";

const Admin = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    minPrice: "",
    maxPrice: "",
    minSqFt: "",
    maxSqFt: "",
  });
  const [currentView, setCurrentView] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getData().then((res) => {
      setProperties(res.data);
      setLoading(false);
    });
  }, []);

  const filteredProperties = properties.filter((p) => {
    return (
      (!filters.city ||
        p.city.toLowerCase().includes(filters.city.toLowerCase())) &&
      (!filters.state ||
        p.state.toLowerCase().includes(filters.state.toLowerCase())) &&
      (!filters.minPrice || p.homesitePrice >= parseInt(filters.minPrice)) &&
      (!filters.maxPrice || p.homesitePrice <= parseInt(filters.maxPrice)) &&
      (!filters.minSqFt || p.homesiteSqFt >= parseInt(filters.minSqFt)) &&
      (!filters.maxSqFt || p.homesiteSqFt <= parseInt(filters.maxSqFt))
    );
  });

  const totalProperties = filteredProperties.length;
  const avgPrice =
    filteredProperties.length > 0
      ? Math.round(
          filteredProperties.reduce((sum, p) => sum + p.homesitePrice, 0) /
            filteredProperties.length
        )
      : 0;
  const avgSqFt =
    filteredProperties.length > 0
      ? Math.round(
          filteredProperties.reduce((sum, p) => sum + p.homesiteSqFt, 0) /
            filteredProperties.length
        )
      : 0;
  const totalValue = filteredProperties.reduce(
    (sum, p) => sum + p.homesitePrice,
    0
  );

  // Chart Data
  const priceByCity = Object.entries(
    filteredProperties.reduce((acc, p) => {
      acc[p.city] = (acc[p.city] || 0) + 1;
      return acc;
    }, {})
  ).map(([city, count]) => ({ city, count }));

  const priceDistribution = [
    {
      range: "< $400k",
      count: filteredProperties.filter((p) => p.homesitePrice < 400000).length,
      color: "#8884d8",
    },
    {
      range: "$400k-$500k",
      count: filteredProperties.filter(
        (p) => p.homesitePrice >= 400000 && p.homesitePrice < 500000
      ).length,
      color: "#82ca9d",
    },
    {
      range: "$500k+",
      count: filteredProperties.filter((p) => p.homesitePrice >= 500000).length,
      color: "#ffc658",
    },
  ];

  const sqFtVsPrice = filteredProperties.map((p) => ({
    sqft: p.homesiteSqFt,
    price: p.homesitePrice,
    community: p.community,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">
                Panthera Infotech Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView("overview")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === "overview"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setCurrentView("analytics")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === "analytics"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setCurrentView("properties")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === "properties"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Properties
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-64 bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 text-gray-600 mr-2" />
              <h2 className="font-semibold text-gray-900">Filters</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  name="city"
                  value={filters.city}
                  onChange={(e) =>
                    setFilters({ ...filters, city: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  name="state"
                  value={filters.state}
                  onChange={(e) =>
                    setFilters({ ...filters, state: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter state"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Price
                  </label>
                  <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, minPrice: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="$0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Price
                  </label>
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters({ ...filters, maxPrice: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="$∞"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min SqFt
                  </label>
                  <input
                    type="number"
                    name="minSqFt"
                    value={filters.minSqFt}
                    onChange={(e) =>
                      setFilters({ ...filters, minSqFt: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max SqFt
                  </label>
                  <input
                    type="number"
                    name="maxSqFt"
                    value={filters.maxSqFt}
                    onChange={(e) =>
                      setFilters({ ...filters, maxSqFt: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="∞"
                  />
                </div>
              </div>

              <button
                onClick={() =>
                  setFilters({
                    city: "",
                    state: "",
                    minPrice: "",
                    maxPrice: "",
                    minSqFt: "",
                    maxSqFt: "",
                  })
                }
                className="w-full px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Home className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Total Properties
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {totalProperties}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Avg. Price
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${avgPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Square className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Avg. SqFt
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {avgSqFt.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">
                          Total Value
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${(totalValue / 1000000).toFixed(1)}M
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts Section */}
                {currentView === "overview" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Properties by City
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={priceByCity}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="city" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#3B82F6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Price Distribution
                      </h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={priceDistribution}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="count"
                            label={({ range, count }) => `${range}: ${count}`}
                          >
                            {priceDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {currentView === "analytics" && (
                  <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Square Footage vs Price Analysis
                    </h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart
                        data={sqFtVsPrice.sort((a, b) => a.sqft - b.sqft)}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="sqft" />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => [
                            name === "price"
                              ? `$${value.toLocaleString()}`
                              : value,
                            name === "price" ? "Price" : "SqFt",
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="#3B82F6"
                          fill="#3B82F6"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Properties Table/Grid */}
                {(currentView === "properties" ||
                  currentView === "overview") && (
                  <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Property Listings
                      </h3>
                      <p className="text-sm text-gray-600">
                        {filteredProperties.length} properties found
                      </p>
                    </div>

                    {currentView === "properties" ? (
                      // Table view for properties page
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Community
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                SqFt
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                $/SqFt
                              </th>
                              <th className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProperties.map((property) => (
                              <tr
                                key={property.id}
                                className="hover:bg-gray-50"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="font-medium text-gray-900">
                                    {property.community}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {property.mpc}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                                    <span className="text-sm text-gray-900">
                                      {property.city}, {property.state}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {property.zipcode}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-lg font-semibold text-gray-900">
                                    ${property.homesitePrice.toLocaleString()}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {property.homesiteSqFt.toLocaleString()} ft²
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  $
                                  {Math.round(
                                    property.homesitePrice /
                                      property.homesiteSqFt
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button className="text-blue-600 hover:text-blue-900">
                                    <MoreHorizontal className="h-5 w-5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      // Card view for overview page
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredProperties.slice(0, 6).map((property) => (
                            <div
                              key={property.id}
                              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-gray-900">
                                  {property.community}
                                </h4>
                                <span className="text-lg font-bold text-blue-600">
                                  ${property.homesitePrice.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span className="text-sm">
                                  {property.city}, {property.state}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>
                                  {property.homesiteSqFt.toLocaleString()} ft²
                                </span>
                                <span>
                                  $
                                  {Math.round(
                                    property.homesitePrice /
                                      property.homesiteSqFt
                                  )}
                                  /ft²
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        {filteredProperties.length > 6 && (
                          <div className="mt-4 text-center">
                            <button
                              onClick={() => setCurrentView("properties")}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              View All Properties ({filteredProperties.length})
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Chatbot Widget */}
                <div className="fixed bottom-6 right-6">
                  <div className="bg-blue-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                        <span className="text-blue-600 font-bold text-sm">
                          AI
                        </span>
                      </div>
                      <span className="font-medium">Property Assistant</span>
                    </div>
                    <p className="text-sm mb-3">
                      Hi! I can help you find the perfect property. What are you
                      looking for?
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ask me anything..."
                        className="flex-1 px-3 py-2 text-gray-900 rounded text-sm"
                      />
                      <button className="px-3 py-2 bg-blue-700 rounded hover:bg-blue-800 transition-colors">
                        <Search className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
