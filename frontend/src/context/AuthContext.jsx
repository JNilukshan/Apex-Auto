import { createContext, useEffect, useState, useCallback } from 'react';
import apiService from '../services/api';

const AuthContext = createContext(undefined);

export { AuthContext };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signOut = useCallback(async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    }
  }, []);

  const verifyToken = useCallback(async () => {
    try {
      const response = await apiService.getProfile();
      // Backend returns user data directly, not wrapped in success/data
      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
    } catch (error) {
      console.error('Token verification failed:', error);
      signOut();
    }
  }, [signOut]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setLoading(false);
        verifyToken();
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        signOut();
      }
    } else {
      setLoading(false);
    }
  }, [verifyToken, signOut]);

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const response = await apiService.login({ email, password });
      
      // Backend returns { token, user } directly
      if (response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        setLoading(false);
        return { error: null, user: response.user };
      } else {
        setLoading(false);
        return { 
          error: response.message || 'Login failed. Please try again.' 
        };
      }
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
      return { 
        error: error.message || 'Login failed. Please try again.' 
      };
    }
  };

  const signUp = async (email, password, fullName) => {
    try {
      setLoading(true);
      const response = await apiService.register({ name: fullName, email, password });
      
      // Backend now returns { token, user } directly after registration
      if (response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        setLoading(false);
        return { error: null, user: response.user };
      } else {
        setLoading(false);
        return { 
          error: response.message || 'Registration failed. Please try again.' 
        };
      }
    } catch (error) {
      setLoading(false);
      console.error('Registration error:', error);
      return { 
        error: error.message || 'Registration failed. Please try again.' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signUp, 
      signIn, 
      signOut,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}