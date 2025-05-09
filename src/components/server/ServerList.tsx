
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '@/context/dashboardContext';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChatBubbleIcon, CalendarIcon, GlobeIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServerList() {
  const { servers, selectedOrg, isLoading } = useDashboard();
  const navigate = useNavigate();

  // If loading, show skeleton UI
  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden cursor-pointer">
            <CardContent className="p-0">
              <div className="h-40 bg-muted relative">
                <Skeleton className="h-full w-full" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                  <Skeleton className="h-4 w-3/4 bg-white/30 mb-1" />
                  <Skeleton className="h-3 w-1/2 bg-white/30" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
  
  // If no organization selected
  if (!selectedOrg) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium mb-2">Select an organization to view servers</h3>
        <p className="text-muted-foreground">No organization is currently selected</p>
      </div>
    )
  }

  // Filter servers by selected organization
  const orgServers = servers.filter(server => server.organizationId === selectedOrg.id);

  // If no servers for this organization
  if (orgServers.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium mb-2">No servers found</h3>
        <p className="text-muted-foreground">Create your first server to get started</p>
      </div>
    )
  }

  const getServerIcon = (type: string) => {
    switch (type) {
      case 'CLASSROOM':
        return <CalendarIcon className="h-6 w-6 text-green-500" />;
      case 'EVENT':
        return <GlobeIcon className="h-6 w-6 text-purple-500" />;
      case 'MEETING':
        return <ChatBubbleIcon className="h-6 w-6 text-blue-500" />;
      default:
        return <CalendarIcon className="h-6 w-6" />;
    }
  }
  
  const getServerTypeLabel = (type: string) => {
    switch (type) {
      case 'CLASSROOM':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Classroom</Badge>;
      case 'EVENT':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Event</Badge>;
      case 'MEETING':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Meeting</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {orgServers.map(server => (
        <Card 
          key={server.id} 
          className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
          onClick={() => navigate(`/servers/${server.id}`)}
        >
          <CardContent className="p-0">
            <div className="h-40 bg-muted relative">
              <div className={`absolute inset-0 ${server.type === 'CLASSROOM' ? 'bg-green-100' : server.type === 'EVENT' ? 'bg-purple-100' : 'bg-blue-100'} opacity-80`}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {getServerIcon(server.type)}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                <h3 className="font-medium truncate">{server.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  {getServerTypeLabel(server.type)}
                  <span className="text-xs text-white/70">
                    Created {new Date(server.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
