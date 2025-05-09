
import React from 'react';
import WalletLogin from '@/components/auth/WalletLogin';
import { useAuth } from '@/context/authContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const handleEmailLogin = () => {
    navigate('/email-login');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-block w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7h-1V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v1H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
              <path d="M16 6H8" />
              <path d="M12 12v3" />
              <path d="M10 14h4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Welcome to D-Attend</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your dashboard</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <Button onClick={handleEmailLogin} className="w-full">
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Continue with Email
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>
          
          <WalletLogin />
          
          <div className="text-center mt-4">
            <span className="text-sm text-muted-foreground">Don't have an account? </span>
            <Button variant="link" className="p-0" onClick={() => navigate('/signup')}>
              Sign up
            </Button>
          </div>
        </div>
        
        <p className="text-center mt-8 text-xs text-muted-foreground">
          D-Attend: Decentralized Attendance Tracking
        </p>
      </div>
    </div>
  );
}
