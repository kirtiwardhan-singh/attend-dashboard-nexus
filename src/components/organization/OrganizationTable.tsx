
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDate } from '@/lib/mockData';
import { useDashboard } from '@/context/dashboardContext';
import { Organization } from '@/types';

export default function OrganizationTable() {
  const { organizations, isLoading, setSelectedOrg } = useDashboard();
  
  const handleSelectOrg = (org: Organization) => {
    setSelectedOrg(org);
  };
  
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-48"></div>
        <div className="border rounded-md">
          <div className="h-12 border-b"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 border-b last:border-0"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (organizations.length === 0) {
    return (
      <div className="text-center p-8 border rounded-md">
        <h3 className="font-medium text-lg mb-2">No organizations yet</h3>
        <p className="text-muted-foreground mb-4">Create your first organization to get started.</p>
      </div>
    );
  }
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations.map((org) => (
            <TableRow key={org.id}>
              <TableCell className="font-medium">
                <div>
                  <div>{org.name}</div>
                  {org.description && <div className="text-xs text-muted-foreground">{org.description}</div>}
                </div>
              </TableCell>
              <TableCell>{org.members}</TableCell>
              <TableCell>{formatDate(org.createdAt)}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleSelectOrg(org)}
                >
                  Select
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
