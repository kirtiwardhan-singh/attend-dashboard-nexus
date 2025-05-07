
import React from 'react';
import WalletLogin from '@/components/auth/WalletLogin';
import { useAuth } from '@/context/authContext';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  
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
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-md">
        <WalletLogin />
        <p className="text-center mt-4 text-sm text-muted-foreground">
          D-Attend: Decentralized Attendance Tracking
        </p>
      </div>
    </div>
  );
}
