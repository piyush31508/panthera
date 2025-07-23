function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Generate pages to show (max 5: centered around currentPage if possible)
  const generatePages = () => {
    const pages = [];
    const maxButtons = 5;
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center mt-16">
      <nav className="flex items-center space-x-2 bg-white rounded-2xl shadow-xl p-2 border border-yellow-200">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-yellow-700 hover:text-white hover:bg-yellow-400 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          Previous
        </button>

        {/* Page Buttons */}
        {generatePages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
              currentPage === page
                ? "bg-gradient-to-r from-yellow-400 to-amber-400 text-white shadow-md"
                : "text-gray-700 hover:bg-yellow-100 hover:text-yellow-800"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-yellow-700 hover:text-white hover:bg-yellow-400 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          Next
        </button>
      </nav>
    </div>
  );
}

export default Pagination;
