
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDashboard } from '@/context/dashboardContext';
import { formatDate } from '@/lib/mockData';
import { Credential } from '@/types';

export default function CredentialList() {
  const { credentials } = useDashboard();
  
  const getCredentialTypeBadge = (type: Credential['type']) => {
    switch (type) {
      case 'ATTENDANCE':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Attendance</Badge>;
      case 'ACHIEVEMENT':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">Achievement</Badge>;
      case 'CERTIFICATION':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Certification</Badge>;
      default:
        return null;
    }
  };
  
  if (credentials.length === 0) {
    return (
      <div className="text-center p-8 border rounded-md">
        <h3 className="font-medium text-lg mb-2">No credentials found</h3>
        <p className="text-muted-foreground">Credentials are issued based on attendance and achievements.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {credentials.map((credential) => (
        <Card key={credential.id} className="overflow-hidden">
          <div className="aspect-square overflow-hidden">
            <img 
              src={credential.imageUrl} 
              alt={credential.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{credential.title}</CardTitle>
              {getCredentialTypeBadge(credential.type)}
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm text-muted-foreground">{credential.description}</p>
          </CardContent>
          <CardFooter className="flex flex-col items-start pt-0">
            <div className="w-full border-t pt-3 text-xs text-muted-foreground">
              <div className="flex justify-between mb-1">
                <span>Issued by:</span>
                <span className="font-medium">{credential.issuedBy}</span>
              </div>
              <div className="flex justify-between">
                <span>Issued on:</span>
                <span>{formatDate(credential.issuedAt)}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
