
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Attendance, Server } from '@/types';
import { IssueNFTForm } from './IssueNFTForm';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/context/authContext';

type AttendanceListProps = {
  attendees: Attendance[];
  server: Server;
  onMarkAttendance: (attendeeId: string, status: Attendance['status']) => void;
  onIssueCredential: (attendeeId: string) => void;
};

export function AttendanceList({ 
  attendees,
  server,
  onMarkAttendance,
  onIssueCredential
}: AttendanceListProps) {
  const { user } = useAuth();
  const [selectedAttendee, setSelectedAttendee] = useState<Attendance | null>(null);
  const [issueNFTOpen, setIssueNFTOpen] = useState(false);

  const hasWritePermission = user?.permissions?.write || user?.role === 'ADMIN' || user?.role === 'TEACHER';

  const handleIssueNFT = (attendeeId: string) => {
    const attendee = attendees.find(att => att.id === attendeeId);
    if (attendee) {
      setSelectedAttendee(attendee);
      setIssueNFTOpen(true);
    }
  };

  const handleNFTSubmit = (values: any) => {
    console.log('Issuing NFT with data:', values);
    onIssueCredential(values.attendeeId);
    setIssueNFTOpen(false);
    toast.success(`NFT credential issued to ${selectedAttendee?.userName}`);
  };

  const getStatusBadge = (status: Attendance['status']) => {
    switch (status) {
      case 'PRESENT':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Present</span>;
      case 'LATE':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Late</span>;
      case 'ABSENT':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Absent</span>;
      default:
        return null;
    }
  };

  const toggleAttendanceStatus = (attendeeId: string, currentStatus: Attendance['status']) => {
    const newStatus = currentStatus === 'PRESENT' ? 'ABSENT' : 'PRESENT';
    onMarkAttendance(attendeeId, newStatus);
  };

  if (attendees.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No attendees found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 font-medium">Name</th>
              <th className="text-left p-2 font-medium">Wallet Address</th>
              <th className="text-left p-2 font-medium">Check-in Time</th>
              <th className="text-left p-2 font-medium">Status</th>
              <th className="text-right p-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr key={attendee.id} className="border-b hover:bg-muted/50">
                <td className="p-2">
                  {attendee.userName}
                  {attendee.email && <p className="text-xs text-muted-foreground">{attendee.email}</p>}
                </td>
                <td className="p-2">
                  <span className="font-mono text-xs truncate max-w-[100px] inline-block align-middle">
                    {attendee.userAddress}
                  </span>
                </td>
                <td className="p-2">
                  {new Date(attendee.checkInTime).toLocaleTimeString()}
                </td>
                <td className="p-2">
                  {getStatusBadge(attendee.status)}
                </td>
                <td className="p-2 text-right">
                  <div className="flex justify-end gap-2">
                    {hasWritePermission && (
                      <Button 
                        variant={attendee.status === 'PRESENT' ? "destructive" : "default"} 
                        size="sm"
                        onClick={() => toggleAttendanceStatus(attendee.id, attendee.status)}
                      >
                        {attendee.status === 'PRESENT' ? 'Unmark' : 'Mark Present'}
                      </Button>
                    )}
                    {hasWritePermission && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleIssueNFT(attendee.id)}
                      >
                        Issue NFT
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* NFT Issuance Dialog */}
      <Dialog open={issueNFTOpen} onOpenChange={setIssueNFTOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Issue NFT Credential</DialogTitle>
          </DialogHeader>
          {selectedAttendee && (
            <IssueNFTForm
              attendee={selectedAttendee}
              onSubmit={handleNFTSubmit}
              onCancel={() => setIssueNFTOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
