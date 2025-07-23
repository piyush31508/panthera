import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-yellow-50 to-amber-50">
      <div className="flex flex-col justify-center items-center text-center px-6 py-28">
        <h2 className="text-5xl font-extrabold text-amber-700 drop-shadow-sm mb-6 tracking-tight">
          Welcome to Panthera Real Estate Portal
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-10 font-medium leading-relaxed">
          Explore properties, draw maps, analyze data, and manage user access — 
          all in one place. Built with{" "}
          <span className="font-semibold text-amber-800">Spring Boot</span> +{" "}
          <span className="font-semibold text-amber-800">React</span>.
        </p>

        <div className="space-x-4 flex flex-wrap justify-center">
          <Link to="/dashboard">
            <button className="bg-amber-300 text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:bg-amber-400 transition-all duration-300 flex items-center space-x-2">
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>

          <Link to="/signup">
            <button className="bg-white text-amber-700 border border-amber-400 px-6 py-3 rounded-2xl font-semibold hover:bg-amber-100 transition-all duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
