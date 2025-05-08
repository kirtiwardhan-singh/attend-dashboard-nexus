
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Server, AttendanceSession } from '@/types';
import { formatDate } from '@/lib/mockData';

type ServerStatsProps = {
  server: Server;
  serverSessions: AttendanceSession[];
};

export function ServerStats({ server, serverSessions }: ServerStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Verification Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {server.verificationMethod === 'QR' && (
              <>
                <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="5" height="5" x="3" y="3" rx="1" />
                  <rect width="5" height="5" x="16" y="3" rx="1" />
                  <rect width="5" height="5" x="3" y="16" rx="1" />
                  <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
                  <path d="M21 21v.01" />
                  <path d="M12 7v3a2 2 0 0 1-2 2H7" />
                  <path d="M3 12h.01" />
                  <path d="M12 3h.01" />
                  <path d="M12 16v.01" />
                  <path d="M16 12h1" />
                  <path d="M21 12v.01" />
                  <path d="M12 21v-1" />
                </svg>
                <span>QR Code Verification</span>
              </>
            )}
            {server.verificationMethod === 'LOCATION' && (
              <>
                <svg className="w-5 h-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Location-based Verification</span>
              </>
            )}
            {server.verificationMethod === 'PASSWORD' && (
              <>
                <svg className="w-5 h-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Password Verification</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Total Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12h10" />
              <path d="M9 4v16" />
              <path d="M3 9v6" />
              <path d="M14 8V6c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v12c0 1.1-.9 2-2 2h-4a2 2 0 0 1-2-2v-2" />
            </svg>
            <span>{serverSessions.length} attendance sessions</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Created</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8v4l2 2" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span>{formatDate(server.createdAt)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
