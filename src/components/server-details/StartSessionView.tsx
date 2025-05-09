
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboard } from '@/context/dashboardContext';
import { Server } from '@/types';
import { toast } from '@/components/ui/sonner';
import { QRCodeSVG } from 'qrcode.react';
import { Separator } from '@/components/ui/separator';

type StartSessionViewProps = {
  server: Server;
}

export function StartSessionView({ server }: StartSessionViewProps) {
  const { startAttendanceSession } = useDashboard();
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionCode] = useState(`SES${Math.floor(100000 + Math.random() * 900000)}`);
  
  const handleStartSession = () => {
    startAttendanceSession(server.id);
    setSessionStarted(true);
    toast.success('Attendance session started');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Start Attendance Session</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            Start a new attendance session for {server.name} server. 
            Students will be able to mark their attendance through various methods.
          </p>
          
          <div className="grid gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Attendance Method</h3>
              <div className="grid gap-4">
                <div className="flex items-start gap-4 p-4 border rounded-md">
                  <div>
                    <h4 className="font-medium">QR Code Check-in</h4>
                    <p className="text-sm text-muted-foreground">
                      Students scan a QR code to mark their attendance
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-md">
                  <div>
                    <h4 className="font-medium">Manual Check-in</h4>
                    <p className="text-sm text-muted-foreground">
                      Manually mark attendance for students
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {!sessionStarted ? (
              <Button onClick={handleStartSession}>Start Session</Button>
            ) : (
              <div className="space-y-6">
                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">Session Code</h3>
                  <div className="text-2xl font-bold tracking-wider text-center py-2">
                    {sessionCode}
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <h3 className="font-medium mb-4">QR Code</h3>
                  <div className="border-8 border-white rounded-md bg-white p-1 shadow-lg">
                    <QRCodeSVG 
                      value={`${window.location.origin}/attend/${server.id}/${sessionCode}`}
                      size={200}
                      level="H"
                    />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground text-center">
                    Students can scan this QR code to mark their attendance
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
