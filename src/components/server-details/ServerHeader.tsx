
import React from 'react';
import { Button } from "@/components/ui/button";
import { Server } from '@/types';
import { useNavigate } from 'react-router-dom';

type ServerHeaderProps = {
  server: Server;
  onEditServer: () => void;
};

export function ServerHeader({ server, onEditServer }: ServerHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{server.name}</h1>
        <p className="text-muted-foreground">
          {server.type} Server
        </p>
      </div>
      <div className="flex gap-2">
        <Button onClick={onEditServer} variant="ghost" size="icon">
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
            <path d="m15 5 4 4"/>
          </svg>
          <span className="sr-only">Edit Server</span>
        </Button>
        <Button onClick={() => navigate('/servers')} variant="ghost" size="icon">
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="sr-only">Back to Servers</span>
        </Button>
      </div>
    </div>
  );
}
