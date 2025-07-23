import { Search, X } from "lucide-react";

function SidebarFilter({
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
  isOpen,
  onClose,
}) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Fixed positioning issue */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:shadow-xl lg:rounded-3xl lg:border lg:border-gray-200 lg:mr-8 lg:static lg:top-8 lg:h-fit`}
      >
        <div className="p-8 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold bg-amber-500 bg-clip-text text-transparent">
              Filters
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 lg:hidden rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Community Search */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Search Community
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all duration-300"
                  placeholder="Search community..."
                  value={filters.community}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, community: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Location
              </label>
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all duration-300"
                  placeholder="Enter city"
                  value={filters.city}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, city: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all duration-300"
                  placeholder="Enter state"
                  value={filters.state}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, state: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Price Range
              </label>
              <div className="space-y-4">
                <select
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium appearance-none cursor-pointer transition-all duration-300"
                  value={filters.minPrice}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, minPrice: e.target.value })
                  }
                >
                  <option value="">Minimum Price</option>
                  <option value="200000">$200,000</option>
                  <option value="300000">$300,000</option>
                  <option value="400000">$400,000</option>
                  <option value="500000">$500,000+</option>
                </select>
                <select
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 font-medium appearance-none cursor-pointer transition-all duration-300"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, maxPrice: e.target.value })
                  }
                >
                  <option value="">Maximum Price</option>
                  <option value="400000">$400,000</option>
                  <option value="500000">$500,000</option>
                  <option value="600000">$600,000</option>
                  <option value="700000">$700,000+</option>
                </select>
              </div>
            </div>

            {/* Square Footage */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Square Footage
              </label>
              <div className="space-y-4">
                <input
                  type="number"
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all duration-300"
                  placeholder="Minimum sq ft"
                  value={filters.minSqFt}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, minSqFt: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all duration-300"
                  placeholder="Maximum sq ft"
                  value={filters.maxSqFt}
                  onChange={(e) =>
                    onFiltersChange({ ...filters, maxSqFt: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="mt-10 space-y-4">
            <button
              className="w-full px-6 py-4 bg-gradient-to-r from-amber-200 to-amber-600 text-white rounded-2xl hover:from-amber-500 hover:to-red-500 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={onApplyFilters}
            >
              Apply Filters
            </button>
            <button
              className="w-full px-6 py-4 border-2 border-gray-200 text-gray-600 rounded-2xl hover:bg-gray-50 hover:border-gray-300 font-semibold transition-all duration-300"
              onClick={onClearFilters}
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SidebarFilter;
