
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AttendanceList } from './AttendanceList';
import { AddAttendeeForm, AttendeeFormValues } from './AddAttendeeForm';
import { Attendance, Server } from '@/types';

type AttendanceTabProps = {
  server: Server;
  attendees: Attendance[];
  onMarkAttendance: (attendeeId: string) => void;
  onMarkAllAttendance: () => void;
  onAddAttendee: (values: AttendeeFormValues) => void;
  onIssueCredential: (attendeeId: string) => void;
  addAttendeeOpen: boolean;
  setAddAttendeeOpen: (open: boolean) => void;
};

export function AttendanceTab({
  server,
  attendees,
  onMarkAttendance,
  onMarkAllAttendance,
  onAddAttendee,
  onIssueCredential,
  addAttendeeOpen,
  setAddAttendeeOpen
}: AttendanceTabProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Attendance Records</CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onMarkAllAttendance}
          >
            Mark All Present
          </Button>
          <Dialog open={addAttendeeOpen} onOpenChange={setAddAttendeeOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="16" y1="11" x2="22" y2="11" />
                </svg>
                Add Attendee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Attendee</DialogTitle>
              </DialogHeader>
              <AddAttendeeForm onSubmit={onAddAttendee} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <AttendanceList 
          attendees={attendees} 
          server={server} 
          onMarkAttendance={onMarkAttendance} 
          onIssueCredential={onIssueCredential}
        />
      </CardContent>
    </Card>
  );
}
