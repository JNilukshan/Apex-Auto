import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-red-900/20 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4">APEX AUTO MODS</h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
              Sri Lanka's premier automotive performance and customization specialists. Unleash your ride's true potential.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4">LOCATIONS</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-medium">Colombo Branch</p>
                  <p className="text-xs sm:text-sm text-gray-400">123 Galle Road, Colombo 03</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-medium">Negombo Branch</p>
                  <p className="text-xs sm:text-sm text-gray-400">456 Main Street, Negombo</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4">CONTACT</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                <span className="text-xs sm:text-sm">+94 77 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                <span className="text-xs sm:text-sm break-all">info@apexautomods.lk</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            © 2025 Apex Auto Mods Garage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
