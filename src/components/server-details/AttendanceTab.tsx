
import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AttendanceList } from './AttendanceList';
import { AddAttendeeForm, AttendeeFormValues } from './AddAttendeeForm';
import { Attendance, Server } from '@/types';
import { useAuth } from '@/context/authContext';
import { InviteUserForm } from '../server/InviteUserForm';
import { toast } from '@/components/ui/sonner';
import * as XLSX from 'xlsx';
import { Input } from "@/components/ui/input";

type AttendanceTabProps = {
  server: Server;
  attendees: Attendance[];
  onMarkAttendance: (attendeeId: string, status: Attendance['status']) => void;
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
  const { user } = useAuth();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasWritePermission = user?.permissions?.write || user?.role === 'ADMIN' || user?.role === 'TEACHER';

  const handleInviteUser = (values: any) => {
    console.log('Inviting user with data:', values);
    toast.success(`Invitation sent to ${values.walletAddress}`);
    setInviteOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const binaryStr = evt.target?.result;
          const workbook = XLSX.read(binaryStr, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(worksheet) as Array<{
            name: string;
            email?: string;
            wallet: string;
          }>;

          if (data.length > 0) {
            data.forEach(row => {
              if (row.name && row.wallet) {
                onAddAttendee({
                  userName: row.name,
                  userAddress: row.wallet,
                  email: row.email || ''
                });
              }
            });
            toast.success(`Imported ${data.length} attendees from Excel`);
            setImportDialogOpen(false);
          } else {
            toast.error('No valid data found in the Excel file');
          }
        } catch (error) {
          console.error('Error parsing Excel file:', error);
          toast.error('Failed to parse Excel file');
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const filteredAttendees = attendees.filter(attendee => 
    attendee.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.userAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Attendance Records</CardTitle>
        <div className="flex gap-2">
          {hasWritePermission && (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onMarkAllAttendance}
              >
                Mark All Present
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setInviteOpen(true)}
                disabled={!user?.address}
                title={!user?.address ? "Connect your wallet first" : "Invite user to server"}
              >
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="16" y1="11" x2="22" y2="11" />
                </svg>
                Invite User
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => setImportDialogOpen(true)}
              >
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Import Excel
              </Button>
              
              <Dialog open={addAttendeeOpen} onOpenChange={setAddAttendeeOpen}>
                <Button size="sm" onClick={() => setAddAttendeeOpen(true)}>
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="16" y1="11" x2="22" y2="11" />
                  </svg>
                  Add Attendee
                </Button>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Attendee</DialogTitle>
                  </DialogHeader>
                  <AddAttendeeForm onSubmit={onAddAttendee} />
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or wallet address..."
            className="w-full p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <AttendanceList 
          attendees={filteredAttendees} 
          server={server} 
          onMarkAttendance={onMarkAttendance} 
          onIssueCredential={onIssueCredential}
        />
      </CardContent>
      
      {/* Invite User Dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Invite User to Server</DialogTitle>
          </DialogHeader>
          <InviteUserForm
            server={server}
            onSubmit={handleInviteUser}
            onCancel={() => setInviteOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Import Excel Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Import Attendees from Excel</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Upload an Excel file with columns: "name", "email" (optional), and "wallet" (Ethereum address)
            </p>
            <Input 
              ref={fileInputRef}
              type="file" 
              accept=".xlsx,.xls,.csv" 
              onChange={handleFileChange} 
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => fileInputRef.current?.click()}>
                Upload Excel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
