
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboard } from '@/context/dashboardContext';
import { Attendance } from '@/types';
import { formatDate } from '@/lib/mockData';

export default function ServerDetails() {
  const { serverId } = useParams<{ serverId: string }>();
  const navigate = useNavigate();
  const { servers, attendanceSessions, isLoading } = useDashboard();
  const [activeTab, setActiveTab] = useState("attendance");
  
  // Find the current server
  const server = servers.find(server => server.id === serverId);
  
  // Find relevant attendance sessions
  const serverSessions = attendanceSessions.filter(
    session => session.serverId === serverId
  );
  
  // Mock attendees data for demonstration
  const [attendees, setAttendees] = useState<Attendance[]>([
    {
      id: "att1",
      sessionId: serverSessions[0]?.id || "session1",
      userId: "user1",
      userName: "Alex Johnson",
      userAddress: "0x1234...5678",
      checkInTime: new Date().toISOString(),
      status: "PRESENT"
    },
    {
      id: "att2",
      sessionId: serverSessions[0]?.id || "session1",
      userId: "user2",
      userName: "Taylor Swift",
      userAddress: "0x8765...4321",
      checkInTime: new Date().toISOString(),
      status: "PRESENT"
    },
    {
      id: "att3",
      sessionId: serverSessions[0]?.id || "session1",
      userId: "user3",
      userName: "Jamie Smith",
      userAddress: "0x2468...1357",
      checkInTime: new Date().toISOString(),
      status: "LATE"
    }
  ]);
  
  const handleMarkAttendance = (attendeeId: string) => {
    setAttendees(prev => 
      prev.map(att => 
        att.id === attendeeId 
          ? { ...att, status: "PRESENT" } 
          : att
      )
    );
  };
  
  const handleIssueCredential = (attendeeId: string) => {
    // This would connect to the credential issuing system
    console.log(`Issuing credential to attendee ${attendeeId}`);
    // Show a toast notification
    // This would typically send the request to your backend
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{server.name}</h1>
          <p className="text-muted-foreground">
            {server.type} Server
          </p>
        </div>
        <Button onClick={() => navigate('/servers')} variant="outline">Back to Servers</Button>
      </div>
      
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="session">Start Session</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attendance" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              {attendees.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Wallet Address</TableHead>
                        <TableHead>Check-in Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendees.map((attendee) => (
                        <TableRow key={attendee.id}>
                          <TableCell className="font-medium">{attendee.userName}</TableCell>
                          <TableCell>{attendee.userAddress}</TableCell>
                          <TableCell>{formatDate(attendee.checkInTime)}</TableCell>
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
                                variant="secondary" 
                                size="sm"
                                onClick={() => handleMarkAttendance(attendee.id)}
                              >
                                Mark Present
                              </Button>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleIssueCredential(attendee.id)}
                            >
                              Issue Certificate
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center p-8">
                  <svg className="w-12 h-12 mx-auto text-muted-foreground mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <h3 className="font-medium text-lg mb-2">No attendance records</h3>
                  <p className="text-muted-foreground">
                    Start a new attendance session to record attendees.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="session" className="mt-0">
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
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
