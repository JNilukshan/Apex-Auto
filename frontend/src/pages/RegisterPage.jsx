import { useState, useEffect } from 'react';
import { Mail, Lock, User, AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/useAuth';

export default function RegisterPage({ onNavigate }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { signUp } = useAuth();

  useEffect(() => {
    // Trigger enter animation on mount
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigateToLogin = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onNavigate('login');
    }, 300);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const result = await signUp(email, password, fullName);
      
      if (result.error) {
        setError(result.error);
        setLoading(false);
      } else {
        // Successfully registered, navigate to dashboard
        console.log('Registration successful, navigating to dashboard...');
        setLoading(false);
        onNavigate('dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex relative overflow-hidden">
      
      {/* Form Section - Left side for register */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 min-h-screen transition-all duration-700 ease-in-out ${
        isTransitioning ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
      }`}>
        <div className="w-full max-w-md">
          
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">REGISTER</h1>
            <p className="text-sm sm:text-base text-gray-400">Create your account to get started</p>
          </div>

          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white/10 border border-white/20 rounded-2xl flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-white flex-shrink-0" />
              <p className="text-red-400 text-xs sm:text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 sm:py-4 bg-gray-900 border border-gray-700 rounded-2xl text-white text-base focus:outline-none focus:border-white transition-colors"
                  placeholder="John Doe"
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 sm:py-4 bg-gray-900 border border-gray-700 rounded-2xl text-white text-base focus:outline-none focus:border-white transition-colors"
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 sm:py-4 bg-gray-900 border border-gray-700 rounded-2xl text-white text-base focus:outline-none focus:border-white transition-colors"
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 sm:py-4 bg-gray-900 border border-gray-700 rounded-2xl text-white text-base focus:outline-none focus:border-white transition-colors"
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 sm:py-4 bg-white hover:bg-gray-100 active:bg-gray-200 text-black rounded-2xl transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/50 text-base touch-manipulation"
            >
              {loading ? 'CREATING ACCOUNT...' : 'REGISTER'}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-sm sm:text-base text-gray-400">
              Already have an account?{' '}
              <button
                onClick={handleNavigateToLogin}
                className="text-white hover:text-gray-300 font-medium transition-colors touch-manipulation underline"
              >
                Login here
              </button>
              
          
            </p>
          </div>
        </div>
      </div>

      {/* Image Section - Right side for register */}
      <div className={`hidden lg:flex lg:w-1/2 relative overflow-hidden transition-all duration-700 ease-in-out ${
        isTransitioning ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
      }`}>
        <img
          src="https://images.pexels.com/photos/3802264/pexels-photo-3802264.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Sports car"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/80 to-transparent" />
        <div className="relative z-10 p-12 flex flex-col justify-center items-end text-right">
          <h2 className="text-5xl font-bold text-white mb-4">
            JOIN <span className="text-red-600">THE RIDE</span>
          </h2>
          <p className="text-xl text-gray-300">
            Create your account and start building your dream automotive collection
          </p>
        </div>
      </div>
    </div>
  );
}