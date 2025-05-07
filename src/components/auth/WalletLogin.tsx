
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/context/authContext';

export default function WalletLogin() {
  const { login, isLoading } = useAuth();
  const [address, setAddress] = useState('');
  
  const handleConnect = async () => {
    // Generate a random ETH-like address for demo
    const randomAddress = '0x' + Array.from({length: 40}, () => 
      '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');
    setAddress(randomAddress);
  };
  
  const handleLogin = async () => {
    if (!address) {
      await handleConnect();
      return;
    }
    await login(address);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">D-Attend</CardTitle>
        <CardDescription className="text-center">
          Connect your wallet to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center p-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 7h-1V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v1H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
              <path d="M16 6H8" />
              <path d="M12 12v3" />
              <path d="M10 14h4" />
            </svg>
          </div>
        </div>
        
        {address ? (
          <div className="p-4 bg-muted rounded-md overflow-hidden">
            <p className="text-sm font-mono break-all">{address}</p>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No wallet connected</p>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleLogin}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Connecting...' : address ? 'Login with Wallet' : 'Connect Wallet'}
        </Button>
      </CardFooter>
    </Card>
  );
}
