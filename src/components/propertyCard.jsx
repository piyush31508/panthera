import { MapPin, Home, DollarSign, Square, Heart, Share2 } from "lucide-react";

function PropertyCard({ property, viewMode, favorites, onToggleFavorite }) {
  const formatPrice = (price) => {
    if (!price || price === 0) return "Price Not Available";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSqFt = (sqft) => {
    if (!sqft || sqft === 0) return "N/A";
    return new Intl.NumberFormat("en-US").format(sqft);
  };

  const getDisplayValue = (value, fallback = "Not Available") => {
    return value && value !== "" ? value : fallback;
  };

  return (
    <div
      className={`group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-yellow-300 hover:-translate-y-2 ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      {/* Image / Graphic Section */}
      <div
        className={`relative ${
          viewMode === "list" ? "w-80 h-56" : "h-56"
        } bg-gradient-to-br from-yellow-100 via-rose-100 to-pink-100`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <Home className="h-16 w-16 text-yellow-600 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -inset-4 bg-white/20 rounded-full animate-ping" />
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(property.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all duration-300"
        >
          <Heart
            className={`h-5 w-5 transition-colors duration-300 ${
              favorites.has(property.id)
                ? "text-red-500 fill-current"
                : "text-gray-500 hover:text-red-400"
            }`}
          />
        </button>

        {/* Status Badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-full text-xs font-bold shadow-sm">
          🏷️ New Listing
        </div>

        {/* Hover Action */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="p-3 bg-white rounded-full text-gray-700 hover:bg-yellow-400 hover:text-white transition-all duration-300 transform hover:scale-110">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div
        className={`p-5 ${viewMode === "list" ? "flex-1" : ""} flex flex-col`}
      >
        <div className="flex-1">
          {/* Title & Location */}
          <div className="mb-3">
            <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-yellow-600 transition-colors duration-300">
              {getDisplayValue(property.community, "Beautiful Community")}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="font-medium">
                {getDisplayValue(property.city, "City")},{" "}
                {getDisplayValue(property.state, "State")}{" "}
                {getDisplayValue(property.zipcode, "")}
              </span>
            </div>
          </div>

          {/* Price & SqFt */}
          <div className="space-y-3 mb-5">
            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-2xl shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-200 rounded-lg mr-3">
                  <DollarSign className="h-4 w-4 text-yellow-700" />
                </div>
                <div>
                  <p className="text-lg text-gray-800">
                    {formatPrice(property.homesitePrice)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center p-3 bg-rose-50 rounded-2xl shadow-sm">
              <div className="p-2 bg-rose-200 rounded-lg mr-3">
                <Square className="h-4 w-4 text-rose-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Square Footage
                </p>
                <p className="text-base font-bold text-gray-800">
                  {formatSqFt(property.homesiteSqFt)} sq ft
                </p>
              </div>
            </div>
          </div>
        </div>

        <button className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-400 text-white py-3 rounded-2xl hover:from-yellow-500 hover:to-amber-500 font-semibold shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          View Details
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;
