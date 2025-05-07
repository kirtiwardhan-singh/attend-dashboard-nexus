
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CredentialList from '@/components/credential/CredentialList';

export default function Credentials() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Credentials</h1>
      <CredentialList />
    </DashboardLayout>
  );
}
