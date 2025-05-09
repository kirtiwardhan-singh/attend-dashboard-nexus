
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { useAuth } from '@/context/authContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

export default function Dashboard() {
  const { user, connectWallet } = useAuth();
  
  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };
  
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-2">
        {user?.organizationName || 'Dashboard'}
      </h1>
      
      {!user?.address && (
        <div className="bg-muted/30 border rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Connect your wallet</h3>
              <p className="text-sm text-muted-foreground">Connect your wallet to enable blockchain features</p>
            </div>
            <Button onClick={handleConnectWallet}>Connect Wallet</Button>
          </div>
        </div>
      )}
      
      <DashboardStats />
    </DashboardLayout>
  );
}
