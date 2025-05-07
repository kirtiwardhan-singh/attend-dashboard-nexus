
import React, { createContext, useContext, useState, useEffect } from 'react';
import { DashboardStats, Organization, Server, AttendanceSession, Credential } from '@/types';
import { useAuth } from './authContext';
import { toast } from '@/components/ui/sonner';

// Mock data
import { getMockDashboardStats, getMockOrganizations, getMockServers, getMockAttendanceSessions, getMockCredentials } from '@/lib/mockData';

interface DashboardContextType {
  stats: DashboardStats | null;
  organizations: Organization[];
  servers: Server[];
  attendanceSessions: AttendanceSession[];
  credentials: Credential[];
  selectedOrg: Organization | null;
  setSelectedOrg: (org: Organization | null) => void;
  isLoading: boolean;
  refreshData: () => Promise<void>;
  createOrganization: (name: string, description?: string) => Promise<void>;
  createServer: (name: string, type: Server['type'], orgId: string, verificationMethod: Server['verificationMethod']) => Promise<void>;
  startAttendanceSession: (serverId: string) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [servers, setServers] = useState<Server[]>([]);
  const [attendanceSessions, setAttendanceSessions] = useState<AttendanceSession[]>([]);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoading(true);
      // In a real app, these would be API calls
      const statsData = getMockDashboardStats();
      const orgsData = getMockOrganizations();
      const serversData = getMockServers();
      const sessionsData = getMockAttendanceSessions();
      const credentialsData = getMockCredentials();
      
      setStats(statsData);
      setOrganizations(orgsData);
      setServers(serversData);
      setAttendanceSessions(sessionsData);
      setCredentials(credentialsData);
      
      if (orgsData.length > 0 && !selectedOrg) {
        setSelectedOrg(orgsData[0]);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [isAuthenticated]);

  const refreshData = async () => {
    await loadData();
  };

  const createOrganization = async (name: string, description?: string) => {
    try {
      // Simulate API call
      const newOrg: Organization = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        description,
        createdAt: new Date().toISOString(),
        members: 1,
      };
      
      setOrganizations([...organizations, newOrg]);
      setSelectedOrg(newOrg);
      toast.success(`Organization "${name}" created successfully`);
    } catch (error) {
      console.error('Failed to create organization:', error);
      toast.error('Failed to create organization');
    }
  };

  const createServer = async (name: string, type: Server['type'], orgId: string, verificationMethod: Server['verificationMethod']) => {
    try {
      // Simulate API call
      const newServer: Server = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        type,
        organizationId: orgId,
        verificationMethod,
        createdAt: new Date().toISOString(),
      };
      
      setServers([...servers, newServer]);
      toast.success(`Server "${name}" created successfully`);
    } catch (error) {
      console.error('Failed to create server:', error);
      toast.error('Failed to create server');
    }
  };

  const startAttendanceSession = async (serverId: string) => {
    try {
      const server = servers.find(s => s.id === serverId);
      if (!server) throw new Error('Server not found');
      
      // Simulate API call
      const newSession: AttendanceSession = {
        id: Math.random().toString(36).substring(2, 9),
        serverId,
        serverName: server.name,
        organizationId: server.organizationId,
        organizationName: organizations.find(o => o.id === server.organizationId)?.name || 'Unknown',
        startTime: new Date().toISOString(),
        attendeeCount: 0,
        status: 'ACTIVE',
      };
      
      setAttendanceSessions([...attendanceSessions, newSession]);
      toast.success(`Attendance session started for "${server.name}"`);
    } catch (error) {
      console.error('Failed to start attendance session:', error);
      toast.error('Failed to start attendance session');
    }
  };

  const value = {
    stats,
    organizations,
    servers,
    attendanceSessions,
    credentials,
    selectedOrg,
    setSelectedOrg,
    isLoading,
    refreshData,
    createOrganization,
    createServer,
    startAttendanceSession,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
