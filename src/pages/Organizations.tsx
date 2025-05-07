
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import OrganizationTable from '@/components/organization/OrganizationTable';
import CreateOrgForm from '@/components/organization/CreateOrgForm';

export default function Organizations() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Organizations</h1>
        <CreateOrgForm />
      </div>
      <OrganizationTable />
    </DashboardLayout>
  );
}
