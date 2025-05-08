
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboard } from '@/context/dashboardContext';
import { Attendance } from '@/types';
import { formatDate } from '@/lib/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/sonner";

// Form schema for adding an attendee
const attendeeFormSchema = z.object({
  userName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  userAddress: z.string().min(10, { message: "Please enter a valid wallet address." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')),
});

export default function ServerDetails() {
  const { serverId } = useParams<{ serverId: string }>();
  const navigate = useNavigate();
  const { servers, attendanceSessions, isLoading } = useDashboard();
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
  
  const form = useForm<z.infer<typeof attendeeFormSchema>>({
    resolver: zodResolver(attendeeFormSchema),
    defaultValues: {
      userName: "",
      userAddress: "",
      email: "",
    },
  });

  const handleMarkAttendance = (attendeeId: string) => {
    setAttendees(prev => 
      prev.map(att => 
        att.id === attendeeId 
          ? { ...att, status: "PRESENT" } 
          : att
      )
    );
    toast.success("Attendance marked successfully");
  };

  const handleMarkAllAttendance = () => {
    setAttendees(prev => 
      prev.map(att => ({ ...att, status: "PRESENT" }))
    );
    toast.success("All attendees marked as present");
  };
  
  const handleIssueCredential = (attendeeId: string) => {
    toast.success("Credential issued successfully");
  };

  const onAddAttendee = (values: z.infer<typeof attendeeFormSchema>) => {
    const newAttendee: Attendance = {
      id: `att${Math.floor(Math.random() * 1000)}`,
      sessionId: serverSessions[0]?.id || "session1",
      userId: `user${Math.floor(Math.random() * 1000)}`,
      userName: values.userName,
      userAddress: values.userAddress,
      email: values.email || undefined,
      checkInTime: new Date().toISOString(),
      status: "PRESENT",
    };
    
    setAttendees([...attendees, newAttendee]);
    form.reset();
    setAddAttendeeOpen(false);
    toast.success(`${values.userName} added successfully`);
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
        <div className="flex gap-2">
          <Button onClick={() => setEditServerOpen(true)} variant="outline">
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
              <path d="m15 5 4 4"/>
            </svg>
            Edit Server
          </Button>
          <Button onClick={() => navigate('/servers')} variant="outline">Back to Servers</Button>
        </div>
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
        <TabsList className="grid w-full max-w-md mb-6" style={{ gridTemplateColumns: server.type === 'CLASSROOM' ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)' }}>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          {server.type === 'CLASSROOM' && <TabsTrigger value="timetable">Timetable</TabsTrigger>}
          <TabsTrigger value="session">Start Session</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attendance" className="mt-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Attendance Records</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleMarkAllAttendance}
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
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onAddAttendee)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="userName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="userAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Wallet Address</FormLabel>
                              <FormControl>
                                <Input placeholder="0x..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email (Optional)</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="email@example.com" {...field} />
                              </FormControl>
                              <FormDescription>
                                Used for notifications about attendance and credentials.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <DialogFooter>
                          <Button type="submit">Add Attendee</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {attendees.length > 0 ? (
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
                                onClick={() => handleMarkAttendance(attendee.id)}
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
                              onClick={() => handleIssueCredential(attendee.id)}
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
                    Start a new attendance session or add attendees manually.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {server.type === 'CLASSROOM' && (
          <TabsContent value="timetable" className="mt-0">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Class Schedule</CardTitle>
                <Button size="sm" variant="outline">
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Add Period
                </Button>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Period Name</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {periods.map((period) => (
                        <TableRow key={period.id}>
                          <TableCell className="font-medium">{period.name}</TableCell>
                          <TableCell>{period.time}</TableCell>
                          <TableCell>{formatDate(period.date)}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              Take Attendance
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
        
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

      {/* Edit Server Dialog */}
      <Dialog open={editServerOpen} onOpenChange={setEditServerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Server</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="server-name">
                  Server Name
                </label>
                <Input id="server-name" defaultValue={server.name} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="server-type">
                  Server Type
                </label>
                <select 
                  id="server-type" 
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
                  defaultValue={server.type}
                >
                  <option value="CLASSROOM">Classroom</option>
                  <option value="EVENT">Event</option>
                  <option value="MEETING">Meeting</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="verification-method">
                  Verification Method
                </label>
                <select 
                  id="verification-method" 
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
                  defaultValue={server.verificationMethod}
                >
                  <option value="QR">QR Code</option>
                  <option value="LOCATION">Location</option>
                  <option value="PASSWORD">Password</option>
                </select>
              </div>
            </form>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditServerOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success("Server updated successfully");
              setEditServerOpen(false);
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
