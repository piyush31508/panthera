import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-yellow-700 via-amber-600 to-yellow-500 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold drop-shadow-md">Ready to Find Your Perfect Home?</h3>
          <p className="text-yellow-100 mt-2 max-w-xl mx-auto">
            Our expert team is here to guide you every step of the way — from search to settlement.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm font-medium">
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>1-800-555-HOME</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>info@pantheraestates.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Nagpur, India</span>
          </div>
        </div>

        <div className="mt-10 text-center text-yellow-200 text-xs">
          © {new Date().getFullYear()} Panthera Infotech. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
