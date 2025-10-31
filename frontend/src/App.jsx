import { useState, useEffect, useCallback } from 'react';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomizePage from './pages/CustomizePage';
import DashboardPage from './pages/DashboardPage';

function AppContent() {
  // Initialize page based on URL path
  const getInitialPage = () => {
    const path = window.location.pathname;
    if (path === '/login') return 'login';
    if (path === '/register') return 'register';
    if (path === '/dashboard') return 'dashboard';
    if (path === '/customize') return 'customize';
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const { loading, user } = useAuth();

  //  Navigation handler
  const handleNavigate = useCallback(
    (page) => {
      if (page === 'dashboard' && !user && !loading) {
        setCurrentPage('login');
        window.history.pushState({ page: 'login' }, '', '/login');
        return;
      }

      // Prevent logged-in users from accessing login/register pages
      if ((page === 'login' || page === 'register') && user && !loading) {
        setCurrentPage('dashboard');
        window.history.pushState({ page: 'dashboard' }, '', '/dashboard');
        return;
      }

      setCurrentPage(page);
      const url = page === 'home' ? '/' : `/${page}`;
      window.history.pushState({ page }, '', url);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [user, loading]
  );

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      }
    };
    window.addEventListener('popstate', handlePopState);
    window.history.replaceState({ page: currentPage }, '', window.location.pathname);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentPage]);

  useEffect(() => {
    if (!loading && !user && currentPage === 'dashboard') {
      handleNavigate('login');
    }
  }, [loading, user, currentPage, handleNavigate]);

  // Auto-redirect to dashboard after login/register success
  useEffect(() => {
    if (!loading && user && ['login', 'register'].includes(currentPage)) {
      handleNavigate('dashboard');
    }
  }, [loading, user, currentPage, handleNavigate]);

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Conditional layout (Navbar/Footer visibility)
  const hideForAuthPages = ['login', 'register', 'dashboard'];
  const showNavbar = !hideForAuthPages.includes(currentPage);
  const showFooter = !hideForAuthPages.includes(currentPage);

  // Page rendering
  return (
    <div className="min-h-screen bg-black text-white">
      {showNavbar && <Navbar currentPage={currentPage} onNavigate={handleNavigate} />}

      {currentPage === 'home' && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === 'services' && <LandingPage onNavigate={handleNavigate} />}
      {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} />}
      {currentPage === 'register' && <RegisterPage onNavigate={handleNavigate} />}
      {currentPage === 'customize' && <CustomizePage onNavigate={handleNavigate} />}
      {currentPage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} />}

      {showFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
