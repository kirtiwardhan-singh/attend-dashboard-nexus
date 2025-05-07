
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from '@/lib/mockData';
import { useDashboard } from '@/context/dashboardContext';
import { AttendanceSession } from '@/types';

export default function AttendanceTable() {
  const { attendanceSessions, selectedOrg } = useDashboard();
  
  // Filter sessions by selected organization
  const filteredSessions = attendanceSessions.filter(
    session => !selectedOrg || session.organizationId === selectedOrg.id
  );
  
  const getStatusBadge = (status: AttendanceSession['status']) => {
    if (status === 'ACTIVE') {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
          <span className="mr-1 w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
          Active
        </Badge>
      );
    }
    return <Badge variant="outline">Completed</Badge>;
  };
  
  if (filteredSessions.length === 0) {
    return (
      <div className="text-center p-8 border rounded-md">
        <h3 className="font-medium text-lg mb-2">No attendance sessions</h3>
        <p className="text-muted-foreground">Start a new attendance session from the Servers page.</p>
      </div>
    );
  }
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Server</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Started</TableHead>
            <TableHead>Attendees</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">{session.serverName}</TableCell>
              <TableCell>{session.organizationName}</TableCell>
              <TableCell>{formatDate(session.startTime)}</TableCell>
              <TableCell>{session.attendeeCount}</TableCell>
              <TableCell>{getStatusBadge(session.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
