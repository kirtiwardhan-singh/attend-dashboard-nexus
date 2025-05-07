
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AttendanceTable from '@/components/attendance/AttendanceTable';
import { useDashboard } from '@/context/dashboardContext';

export default function Attendance() {
  const { selectedOrg } = useDashboard();
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Attendance Sessions</h1>
        {selectedOrg && (
          <p className="text-muted-foreground">
            Viewing attendance for <span className="font-medium">{selectedOrg.name}</span>
          </p>
        )}
      </div>
      <AttendanceTable />
    </DashboardLayout>
  );
}
