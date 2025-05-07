
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { toast } from '@/components/ui/sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (address: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on initial load
    const storedUser = localStorage.getItem('d-attend-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('d-attend-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (address: string) => {
    try {
      setIsLoading(true);
      // Simulate API authentication
      // In a real app, you would:
      // 1. Request a challenge from the server
      // 2. Sign the challenge with the wallet
      // 3. Verify the signature on the server
      // 4. Get a JWT token back
      
      // For demo purposes, we'll just create a mock user
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        address,
        role: address.toLowerCase().endsWith('a') ? 'ADMIN' : 'USER',
      };
      
      // Store the user in localStorage
      localStorage.setItem('d-attend-user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success('Successfully logged in with wallet');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Failed to login with wallet');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('d-attend-user');
    setUser(null);
    toast.info('Logged out successfully');
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
