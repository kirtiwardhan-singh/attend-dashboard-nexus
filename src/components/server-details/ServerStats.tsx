import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, AttendanceSession } from '@/types';

type ServerStatsProps = {
  server: Server;
  serverSessions: AttendanceSession[];
};

export function ServerStats({ server, serverSessions }: ServerStatsProps) {
  const totalSessions = serverSessions.length;
  const activeSessions = serverSessions.filter(session => session.status === 'ACTIVE').length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSessions}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeSessions}</div>
        </CardContent>
      </Card>
    </div>
  );
}

