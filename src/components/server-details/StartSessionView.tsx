
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server } from '@/types';

type StartSessionViewProps = {
  server: Server;
};

export function StartSessionView({ server }: StartSessionViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Start Attendance Session</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center p-8 space-y-6">
          {server.verificationMethod === 'QR' && (
            <>
              <div className="border-4 border-primary/20 p-4 rounded-lg">
                <div className="bg-primary/10 p-8 rounded">
                  <svg className="w-32 h-32 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                </div>
              </div>
              <p className="text-center text-muted-foreground max-w-md">
                Share this QR code with attendees. They can scan it to mark their attendance.
              </p>
            </>
          )}
          
          {server.verificationMethod === 'PASSWORD' && (
            <>
              <div className="border-4 border-primary/20 p-6 rounded-lg">
                <div className="bg-primary/10 px-8 py-4 rounded text-center">
                  <p className="text-3xl font-mono tracking-wider font-semibold">ATTEND-1234</p>
                </div>
              </div>
              <p className="text-center text-muted-foreground max-w-md">
                Share this password with attendees. They can enter it to mark their attendance.
              </p>
            </>
          )}
          
          {server.verificationMethod === 'LOCATION' && (
            <>
              <div className="border-4 border-primary/20 p-4 rounded-lg w-full max-w-md">
                <div className="bg-primary/10 p-8 rounded flex items-center justify-center">
                  <svg className="w-16 h-16 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
              </div>
              <p className="text-center text-muted-foreground max-w-md">
                Attendees within the geofence range will be able to mark their attendance automatically.
              </p>
            </>
          )}
          
          <Button className="mt-6" size="lg">
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10 8 16 12 10 16 10 8"/>
            </svg>
            Start New Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
