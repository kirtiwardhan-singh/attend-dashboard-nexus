
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDashboard } from '@/context/dashboardContext';
import { Server } from '@/types';
import { formatDate } from '@/lib/mockData';

export default function ServerList() {
  const { servers, selectedOrg, isLoading, startAttendanceSession } = useDashboard();
  
  // Filter servers by selected organization
  const filteredServers = servers.filter(
    server => !selectedOrg || server.organizationId === selectedOrg.id
  );
  
  const getServerIcon = (type: Server['type']) => {
    switch (type) {
      case 'CLASSROOM':
        return (
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/>
            <path d="M12 3v6"/>
          </svg>
        );
      case 'EVENT':
        return (
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8c0 2.5-2.5 5-6 8-3.5-3-6-5.5-6-8a6 6 0 0 1 12 0Z"/>
            <circle cx="12" cy="8" r="2"/>
          </svg>
        );
      case 'MEETING':
        return (
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 21h10"/>
            <path d="M10 21v-4"/>
            <path d="M14 21v-4"/>
            <path d="M4 3h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2Z"/>
            <path d="M12 17h0"/>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
            <line x1="6" y1="6" x2="6.01" y2="6"/>
            <line x1="6" y1="18" x2="6.01" y2="18"/>
          </svg>
        );
    }
  };
  
  const getVerificationMethodBadge = (method: Server['verificationMethod']) => {
    switch (method) {
      case 'QR':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">QR Code</Badge>;
      case 'LOCATION':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Location</Badge>;
      case 'PASSWORD':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">Password</Badge>;
      default:
        return null;
    }
  };
  
  const handleStartSession = (serverId: string) => {
    startAttendanceSession(serverId);
  };
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-6 bg-muted rounded w-24 mb-1"></div>
              <div className="h-4 bg-muted rounded w-32"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </CardContent>
            <CardFooter>
              <div className="h-9 bg-muted rounded w-full"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  
  if (filteredServers.length === 0) {
    return (
      <Card className="text-center border-dashed">
        <CardHeader>
          <CardTitle>No servers found</CardTitle>
          <CardDescription>
            {selectedOrg 
              ? `No servers have been created for ${selectedOrg.name} yet.`
              : 'Select an organization or create a new server to get started.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <svg className="w-12 h-12 mx-auto text-muted-foreground mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
            <line x1="6" y1="6" x2="6.01" y2="6"/>
            <line x1="6" y1="18" x2="6.01" y2="18"/>
          </svg>
          <p className="text-sm text-muted-foreground">
            Servers are used to manage attendance sessions.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredServers.map((server) => (
        <Card key={server.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-md bg-primary/10">
                {getServerIcon(server.type)}
              </div>
              {getVerificationMethodBadge(server.verificationMethod)}
            </div>
            <CardTitle>{server.name}</CardTitle>
            <CardDescription>{server.type}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2 text-sm text-muted-foreground">
            Created {formatDate(server.createdAt)}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full gap-2" 
              onClick={() => handleStartSession(server.id)}
            >
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8"/>
              </svg>
              Start Attendance Session
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
