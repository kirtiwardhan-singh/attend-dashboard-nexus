
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useDashboard } from '@/context/dashboardContext';
import { Attendance } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { ServerHeader } from '@/components/server-details/ServerHeader';
import { ServerStats } from '@/components/server-details/ServerStats';
import { AttendanceTab } from '@/components/server-details/AttendanceTab';
import { ClassroomTimetable } from '@/components/server-details/ClassroomTimetable';
import { StartSessionView } from '@/components/server-details/StartSessionView';
import { EditServerForm } from '@/components/server-details/EditServerForm';
import { AttendeeFormValues } from '@/components/server-details/AddAttendeeForm';
import { useAuth } from '@/context/authContext';

export default function ServerDetails() {
  const { serverId } = useParams<{ serverId: string }>();
  const navigate = useNavigate();
  const { servers, attendanceSessions, isLoading } = useDashboard();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState("attendance");
  const [addAttendeeOpen, setAddAttendeeOpen] = useState(false);
  const [editServerOpen, setEditServerOpen] = useState(false);
  
  // Find the current server
  const server = servers.find(server => server.id === serverId);
  
  // Find relevant attendance sessions
  const serverSessions = attendanceSessions.filter(
    session => session.serverId === serverId
  );
  
  // Attendees data with mock data for demonstration
  const [attendees, setAttendees] = useState<Attendance[]>([
    {
      id: "att1",
      sessionId: serverSessions[0]?.id || "session1",
      userId: "user1",
      userName: "Alex Johnson",
      userAddress: "0x1234...5678",
      email: "alex@example.com",
      checkInTime: new Date().toISOString(),
      status: "PRESENT"
    },
    {
      id: "att2",
      sessionId: serverSessions[0]?.id || "session1",
      userId: "user2",
      userName: "Taylor Swift",
      userAddress: "0x8765...4321",
      email: "taylor@example.com",
      checkInTime: new Date().toISOString(),
      status: "PRESENT"
    },
    {
      id: "att3",
      sessionId: serverSessions[0]?.id || "session1",
      userId: "user3",
      userName: "Jamie Smith",
      userAddress: "0x2468...1357",
      email: "jamie@example.com",
      checkInTime: new Date().toISOString(),
      status: "LATE"
    }
  ]);

  // For classroom servers, we'll need periods/sessions
  const [periods, setPeriods] = useState([
    { id: "period1", name: "Morning Session", time: "09:00 - 10:30", date: new Date().toISOString() },
    { id: "period2", name: "Mid-day Session", time: "11:00 - 12:30", date: new Date().toISOString() },
    { id: "period3", name: "Afternoon Session", time: "14:00 - 15:30", date: new Date().toISOString() },
  ]);

  const handleMarkAttendance = (attendeeId: string, status: Attendance['status']) => {
    setAttendees(prev => 
      prev.map(att => 
        att.id === attendeeId 
          ? { ...att, status } 
          : att
      )
    );
    toast.success(`Attendance status updated to ${status}`);
  };

  const handleMarkAllAttendance = () => {
    setAttendees(prev => 
      prev.map(att => ({ ...att, status: "PRESENT" }))
    );
    toast.success("All attendees marked as present");
  };
  
  const handleIssueCredential = (attendeeId: string) => {
    // In a real app, this would call an API to issue an NFT to the blockchain
    toast.success("NFT credential issued successfully");
  };

  const onAddAttendee = (values: AttendeeFormValues) => {
    const newAttendee: Attendance = {
      id: `att${Math.floor(Math.random() * 1000)}`,
      sessionId: serverSessions[0]?.id || "session1",
      userId: `user${Math.floor(Math.random() * 1000)}`,
      userName: values.userName,
      userAddress: values.userAddress,
      email: values.email,
      checkInTime: new Date().toISOString(),
      status: "PRESENT",
    };
    
    setAttendees([...attendees, newAttendee]);
    setAddAttendeeOpen(false);
    toast.success(`${values.userName} added successfully`);
  };

  const handleSaveServerChanges = () => {
    toast.success("Server updated successfully");
    setEditServerOpen(false);
  };
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-64 bg-muted rounded w-full mt-4"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!server) {
    return (
      <DashboardLayout>
        <div className="text-center">
          <h2 className="text-xl font-bold">Server not found</h2>
          <p className="text-muted-foreground mt-2">The server you're looking for doesn't exist or you don't have access to it.</p>
          <Button className="mt-4" onClick={() => navigate('/servers')}>Return to Servers</Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      <ServerHeader server={server} onEditServer={() => setEditServerOpen(true)} />
      <ServerStats server={server} serverSessions={serverSessions} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mb-6" style={{ gridTemplateColumns: server.type === 'CLASSROOM' ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)' }}>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          {server.type === 'CLASSROOM' && <TabsTrigger value="timetable">Timetable</TabsTrigger>}
          <TabsTrigger value="session">Start Session</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attendance" className="mt-0">
          <AttendanceTab 
            server={server}
            attendees={attendees}
            onMarkAttendance={handleMarkAttendance}
            onMarkAllAttendance={handleMarkAllAttendance}
            onAddAttendee={onAddAttendee}
            onIssueCredential={handleIssueCredential}
            addAttendeeOpen={addAttendeeOpen}
            setAddAttendeeOpen={setAddAttendeeOpen}
          />
        </TabsContent>

        {server.type === 'CLASSROOM' && (
          <TabsContent value="timetable" className="mt-0">
            <ClassroomTimetable periods={periods} />
          </TabsContent>
        )}
        
        <TabsContent value="session" className="mt-0">
          <StartSessionView server={server} />
        </TabsContent>
      </Tabs>

      {/* Edit Server Dialog */}
      <Dialog open={editServerOpen} onOpenChange={setEditServerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Server</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <EditServerForm 
              server={server} 
              onCancel={() => setEditServerOpen(false)} 
              onSave={handleSaveServerChanges} 
            />
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
