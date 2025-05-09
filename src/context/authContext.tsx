
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { toast } from '@/components/ui/sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (address: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerOrganization: (orgName: string, adminName: string, email: string, password: string) => Promise<void>;
  connectWallet: () => Promise<void>;
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

  const loginWithEmail = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulate API authentication
      
      // For demo purposes, we'll check for a demo account
      // In a real app, this would be an API call
      
      // Mock authentication check - in a real app, this would be server-side validation
      if (email === 'admin@example.com' && password === 'password') {
        const mockUser: User = {
          id: Math.random().toString(36).substring(2, 9),
          address: '',
          name: 'Demo Admin',
          email,
          role: 'ADMIN',
          organizationId: 'org-demo-1',
          organizationName: 'Demo Organization',
        };
        
        localStorage.setItem('d-attend-user', JSON.stringify(mockUser));
        setUser(mockUser);
        toast.success('Successfully logged in');
        return;
      }
      
      // Simulate a network request with a short delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Failed to login. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const registerOrganization = async (
    organizationName: string,
    adminName: string,
    email: string,
    password: string
  ) => {
    try {
      setIsLoading(true);
      
      // Simulate API registration
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create a new organization ID
      const organizationId = `org-${Math.random().toString(36).substring(2, 9)}`;
      
      // Create a new user as the admin of the organization
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        address: '',
        name: adminName,
        email,
        role: 'ADMIN',
        organizationId,
        organizationName,
      };
      
      // Store the user in localStorage (in a real app this would be in a database)
      localStorage.setItem('d-attend-user', JSON.stringify(newUser));
      setUser(newUser);
      
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Failed to register organization');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      
      // Check if user already exists
      if (!user) {
        toast.error('Please login first');
        return;
      }
      
      // Check if MetaMask is available
      if (typeof window.ethereum === 'undefined') {
        toast.error('MetaMask is not installed. Please install MetaMask browser extension.');
        return;
      }
      
      // Request account access from MetaMask
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      
      // Update the user with the wallet address
      const updatedUser = {
        ...user,
        address,
      };
      
      localStorage.setItem('d-attend-user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast.success('Wallet connected successfully');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet');
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
    loginWithEmail,
    registerOrganization,
    connectWallet,
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
