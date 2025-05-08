
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Attendance, Server } from '@/types';
import { formatDate } from '@/lib/mockData';

type AttendanceListProps = {
  attendees: Attendance[];
  server: Server;
  onMarkAttendance: (attendeeId: string) => void;
  onIssueCredential: (attendeeId: string) => void;
};

export function AttendanceList({ attendees, server, onMarkAttendance, onIssueCredential }: AttendanceListProps) {
  if (attendees.length === 0) {
    return (
      <div className="text-center p-8">
        <svg className="w-12 h-12 mx-auto text-muted-foreground mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <h3 className="font-medium text-lg mb-2">No attendance records</h3>
        <p className="text-muted-foreground">
          Start a new attendance session or add attendees manually.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Wallet Address</TableHead>
            {server.type === 'EVENT' && <TableHead>Check-in Time</TableHead>}
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendees.map((attendee) => (
            <TableRow key={attendee.id}>
              <TableCell className="font-medium">{attendee.userName}</TableCell>
              <TableCell>{attendee.userAddress}</TableCell>
              {server.type === 'EVENT' && <TableCell>{formatDate(attendee.checkInTime)}</TableCell>}
              <TableCell>
                {attendee.status === 'PRESENT' ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                    Present
                  </Badge>
                ) : attendee.status === 'LATE' ? (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                    Late
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
                    Absent
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                {attendee.status !== 'PRESENT' && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onMarkAttendance(attendee.id)}
                    className="h-8 w-8 p-0"
                  >
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onIssueCredential(attendee.id)}
                  className="h-8 w-8 p-0"
                >
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
