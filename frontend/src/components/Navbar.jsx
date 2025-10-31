import { useState } from 'react';
import { Car, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/useAuth';

export default function Navbar({ currentPage, onNavigate }) {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleSectionScroll = (sectionId) => {
    // First navigate to home page if not already there
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; 
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigate('home')}>
            <span className="text-lg sm:text-xl font-bold text-white">
              APEX <span className="text-red-600">AUTO MODS</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigate('home')}
              className="text-sm font-medium text-gray-300 hover:text-white hover:scale-105 transition-all duration-300"

            >
              HOME
            </button>
            
            <button
              onClick={() => handleSectionScroll('services')}
              className="text-sm font-medium text-gray-300 hover:text-white hover:scale-105 transition-all duration-300"
            >
              SERVICES
            </button>
            
            <button
              onClick={() => handleSectionScroll('builds')}
              className="text-sm font-medium text-gray-300 hover:text-white hover:scale-105 transition-all duration-300"
            >
              BUILDS
            </button>
            
            <button
              onClick={() => handleSectionScroll('testimonials')}
              className="text-sm font-medium text-gray-300 hover:text-white hover:scale-105 transition-all duration-300"
            >
              TESTIMONIALS
            </button>
            
            <button
              onClick={() => handleSectionScroll('contact')}
              className="text-sm font-medium text-gray-300 hover:text-white hover:scale-105 transition-all duration-300"
            >
              CONTACT
            </button>
            
            <button
              onClick={() => handleNavigate('customize')}
              className={`text-sm font-medium transition-all duration-300 ${
                currentPage === 'customize' 
                  ? 'text-white border-b-2 border-white' 
                  : 'text-gray-300 hover:text-white hover:scale-105'
              }`}
            >
              CUSTOMIZE
            </button>
            
            {user && (
              <button
                onClick={() => handleNavigate('dashboard')}
                className={`text-sm font-medium transition-all duration-300 ${
                  currentPage === 'dashboard' 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-gray-300 hover:text-white hover:scale-105'
                }`}
              >
                DASHBOARD
              </button>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <button
                  onClick={() => handleNavigate('login')}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:scale-105 transition-all duration-300"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => handleNavigate('register')}
                  className="px-4 py-2  bg-white hover:bg-gray-100 active:bg-gray-200 text-black rounded-2xl transition-all duration-300 sm:text-lg  touch-manipulation font-medium text-sm"
                >
                  REGISTER
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                
                <button
                  onClick={() => {
                    signOut();
                    handleNavigate('home');
                  }}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>LOGOUT</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-red-900/20">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => handleNavigate('home')}
              className="block w-full text-left px-4 py-3 rounded-lg font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
                
            >
              HOME
            </button>
            
            <button
              onClick={() => handleSectionScroll('services')}
              className="block w-full text-left px-4 py-3 rounded-lg font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
            >
              SERVICES
            </button>
            
            <button
              onClick={() => handleSectionScroll('builds')}
              className="block w-full text-left px-4 py-3 rounded-lg font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
            >
              BUILDS
            </button>
            
            <button
              onClick={() => handleSectionScroll('testimonials')}
              className="block w-full text-left px-4 py-3 rounded-lg font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
            >
              TESTIMONIALS
            </button>
            
            <button
              onClick={() => handleSectionScroll('contact')}
              className="block w-full text-left px-4 py-3 rounded-lg font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
            >
              CONTACT
            </button>
            
            <button
              onClick={() => handleNavigate('customize')}
              className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 'customize' 
                  ? 'bg-white text-black' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              CUSTOMIZE
            </button>
            
            {user && (
              <button
                onClick={() => handleNavigate('dashboard')}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === 'dashboard' 
                    ? 'bg-white text-black' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                DASHBOARD
              </button>
            )}

            <div className="pt-3 border-t border-gray-800">
              {!user ? (
                <div className="space-y-2">
                  <button
                    onClick={() => handleNavigate('login')}
                    className="block w-full px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-300 font-medium text-center"
                  >
                    LOGIN
                  </button>
                  <button
                    onClick={() => handleNavigate('register')}
                    className="block w-full px-4 py-3  bg-white hover:bg-gray-100 active:bg-gray-200 text-black rounded-2xl transition-all duration-300  text-base sm:text-lg shadow-lg  touch-manipulation font-medium text-center"
                  >
                    REGISTER
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  
                  <button
                    onClick={() => {
                      signOut();
                      handleNavigate('home');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-300 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>LOGOUT</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
