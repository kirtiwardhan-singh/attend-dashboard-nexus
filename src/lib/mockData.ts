
import { DashboardStats, Organization, Server, AttendanceSession, Credential } from '@/types';

export const getMockDashboardStats = (): DashboardStats => {
  return {
    totalOrganizations: 3,
    totalServers: 8,
    totalSessions: 24,
    totalCredentials: 67,
    recentActivity: [
      {
        id: '1',
        type: 'SESSION_CREATED',
        entityId: '1',
        entityName: 'Blockchain 101',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      },
      {
        id: '2',
        type: 'CREDENTIAL_ISSUED',
        entityId: '2',
        entityName: 'Perfect Attendance',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      },
      {
        id: '3',
        type: 'USER_JOINED',
        entityId: '3',
        entityName: 'Alice Johnson',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      },
      {
        id: '4',
        type: 'SESSION_CREATED',
        entityId: '4',
        entityName: 'Web3 Development',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      },
    ],
    attendanceTrend: Array.from({ length: 14 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (13 - i));
      return {
        date: date.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 20) + 10,
      };
    }),
  };
};

export const getMockOrganizations = (): Organization[] => {
  return [
    {
      id: 'org-1',
      name: 'Web3 University',
      description: 'A decentralized learning platform for blockchain education',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days ago
      members: 120,
    },
    {
      id: 'org-2',
      name: 'Blockchain Academy',
      description: 'Premier institution for blockchain certification',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago
      members: 85,
    },
    {
      id: 'org-3',
      name: 'DApp Developers Guild',
      description: 'Community of decentralized application developers',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
      members: 42,
    },
  ];
};

export const getMockServers = (): Server[] => {
  return [
    {
      id: 'server-1',
      name: 'Blockchain 101',
      type: 'CLASSROOM',
      organizationId: 'org-1',
      verificationMethod: 'QR',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(),
    },
    {
      id: 'server-2',
      name: 'Smart Contracts Workshop',
      type: 'CLASSROOM',
      organizationId: 'org-1',
      verificationMethod: 'PASSWORD',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    },
    {
      id: 'server-3',
      name: 'Crypto Economics Seminar',
      type: 'EVENT',
      organizationId: 'org-1',
      verificationMethod: 'LOCATION',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(),
    },
    {
      id: 'server-4',
      name: 'Solidity Masterclass',
      type: 'CLASSROOM',
      organizationId: 'org-2',
      verificationMethod: 'QR',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    },
    {
      id: 'server-5',
      name: 'Blockchain Security',
      type: 'CLASSROOM',
      organizationId: 'org-2',
      verificationMethod: 'QR',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    },
    {
      id: 'server-6',
      name: 'Weekly Dev Meeting',
      type: 'MEETING',
      organizationId: 'org-3',
      verificationMethod: 'PASSWORD',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    },
    {
      id: 'server-7',
      name: 'Hackathon Planning',
      type: 'MEETING',
      organizationId: 'org-3',
      verificationMethod: 'PASSWORD',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
    {
      id: 'server-8',
      name: 'DeFi Summit',
      type: 'EVENT',
      organizationId: 'org-2',
      verificationMethod: 'LOCATION',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    },
  ];
};

export const getMockAttendanceSessions = (): AttendanceSession[] => {
  return [
    {
      id: 'session-1',
      serverId: 'server-1',
      serverName: 'Blockchain 101',
      organizationId: 'org-1',
      organizationName: 'Web3 University',
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
      attendeeCount: 42,
      status: 'COMPLETED',
    },
    {
      id: 'session-2',
      serverId: 'server-4',
      serverName: 'Solidity Masterclass',
      organizationId: 'org-2',
      organizationName: 'Blockchain Academy',
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      endTime: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
      attendeeCount: 28,
      status: 'COMPLETED',
    },
    {
      id: 'session-3',
      serverId: 'server-6',
      serverName: 'Weekly Dev Meeting',
      organizationId: 'org-3',
      organizationName: 'DApp Developers Guild',
      startTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      attendeeCount: 12,
      status: 'ACTIVE',
    },
  ];
};

export const getMockCredentials = (): Credential[] => {
  return [
    {
      id: 'cred-1',
      title: 'Blockchain 101 Completion',
      description: 'Awarded for completing the Blockchain 101 course',
      imageUrl: 'https://placekitten.com/200/200', // Placeholder image
      issuedTo: '0x1234...5678',
      issuedBy: 'Web3 University',
      issuedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
      metadataUrl: 'ipfs://QmXyZ123',
      type: 'CERTIFICATION',
    },
    {
      id: 'cred-2',
      title: 'Perfect Attendance',
      description: 'Awarded for 100% attendance in the Solidity Masterclass',
      imageUrl: 'https://placekitten.com/201/201', // Placeholder image
      issuedTo: '0x1234...5678',
      issuedBy: 'Blockchain Academy',
      issuedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      metadataUrl: 'ipfs://QmAbc456',
      type: 'ATTENDANCE',
    },
    {
      id: 'cred-3',
      title: 'Hackathon Winner',
      description: 'Awarded for winning the DApp Developers Guild hackathon',
      imageUrl: 'https://placekitten.com/202/202', // Placeholder image
      issuedTo: '0x1234...5678',
      issuedBy: 'DApp Developers Guild',
      issuedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
      metadataUrl: 'ipfs://QmDef789',
      type: 'ACHIEVEMENT',
    },
  ];
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
  
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
  
  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
};
