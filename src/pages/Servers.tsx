
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ServerList from '@/components/server/ServerList';
import AddServerForm from '@/components/server/AddServerForm';
import { useDashboard } from '@/context/dashboardContext';

export default function Servers() {
  const { selectedOrg, organizations } = useDashboard();
  
  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Servers</h1>
          {selectedOrg && (
            <p className="text-muted-foreground">
              Viewing servers for <span className="font-medium">{selectedOrg.name}</span>
            </p>
          )}
        </div>
        {organizations.length > 0 && <AddServerForm />}
      </div>
      <ServerList />
    </DashboardLayout>
  );
}
