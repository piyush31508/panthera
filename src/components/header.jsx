import { useState, useEffect } from "react";
import { Home, Map, BarChart3, UserPlus, Bell, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
    { name: "Map", path: "/map", icon: Map },
    { name: "Get Started", path: "/signup", icon: UserPlus },
  ];

  return (
    <header
      className={`bg-gradient-to-r from-rose-100 via-yellow-50 to-amber-100 sticky top-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? "backdrop-blur-md shadow-xl" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center space-x-3 hover:scale-105 transition-transform"
          >
            <div className="relative">
              <Home className="h-8 w-8 text-amber-600 drop-shadow" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-300 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-amber-700">
                🏡 Panthera Infotech
              </h1>
              <div className="text-xs text-amber-500 -mt-1 font-medium">
                Find Your Perfect Home
              </div>
            </div>
          </a>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-amber-700 p-2 rounded-xl hover:bg-amber-100 transition"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 px-4 py-2 rounded-xl text-sm font-semibold transition hover:bg-white hover:shadow-sm"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          {/* Bell */}
          <div className="hidden lg:flex items-center">
            <button className="relative p-3 text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded-xl transition">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold shadow animate-bounce">
                3
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-amber-100 via-yellow-50 to-rose-100 backdrop-blur-md border-t border-amber-200">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-amber-700 hover:bg-white rounded-xl transition"
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </a>
            ))}

            {/* Bell */}
            <button className="flex items-center space-x-3 px-4 py-3 text-amber-700 hover:bg-white rounded-xl transition w-full">
              <div className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                  3
                </span>
              </div>
              <span className="font-medium">Notifications</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
