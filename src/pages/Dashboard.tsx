
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { useAuth } from '@/context/authContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  const { user, connectWallet } = useAuth();
  
  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      toast.success('Wallet connected successfully');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet');
    }
  };
  
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-2">
        {user?.organizationName || 'Dashboard'}
      </h1>
      
      {!user?.address && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
            <CardDescription>
              Connect your wallet to enable blockchain features, manage roles, and issue NFT credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Wallet Connection Required</p>
                <p className="text-sm text-muted-foreground">
                  Connect your wallet to invite users and issue NFT credentials.
                </p>
              </div>
              <Button onClick={handleConnectWallet} className="gap-2">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
                Connect Wallet
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <DashboardStats />
    </DashboardLayout>
  );
}
