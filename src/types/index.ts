
export type User = {
  id: string;
  address: string;
  name?: string;
  email?: string;
  avatar?: string;
  role: 'ADMIN' | 'USER' | 'TEACHER' | 'EVENT_MANAGER';
  organizationId?: string;
  organizationName?: string;
  permissions?: {
    read: boolean;
    write: boolean;
  };
};

export type Organization = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  members: number;
};

export type Server = {
  id: string;
  name: string;
  type: 'CLASSROOM' | 'EVENT' | 'MEETING';
  organizationId: string;
  createdAt: string;
};

export type AttendanceSession = {
  id: string;
  serverId: string;
  serverName: string;
  organizationId: string;
  organizationName: string;
  startTime: string;
  endTime?: string;
  attendeeCount: number;
  status: 'ACTIVE' | 'COMPLETED';
};

export type Attendance = {
  id: string;
  sessionId: string;
  userId: string;
  userName: string;
  userAddress: string;
  email?: string;
  checkInTime: string;
  status: 'PRESENT' | 'LATE' | 'ABSENT';
};

export type Credential = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  issuedTo: string;
  issuedBy: string;
  issuedAt: string;
  metadataUrl: string;
  type: 'ATTENDANCE' | 'ACHIEVEMENT' | 'CERTIFICATION';
};

export type DashboardStats = {
  totalOrganizations: number;
  totalServers: number;
  totalSessions: number;
  totalCredentials: number;
  recentActivity: Array<{
    id: string;
    type: 'SESSION_CREATED' | 'CREDENTIAL_ISSUED' | 'USER_JOINED';
    entityId: string;
    entityName: string;
    timestamp: string;
  }>;
  attendanceTrend: Array<{
    date: string;
    count: number;
  }>;
};

export type ServerInvite = {
  id: string;
  serverId: string;
  walletAddress: string;
  role: 'ADMIN' | 'USER' | 'TEACHER' | 'EVENT_MANAGER';
  permissions: {
    read: boolean;
    write: boolean;
  };
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
};

export type NFTCredential = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  recipientAddress: string;
  recipientName: string;
  issuerName: string;
  issuedAt: string;
  type: 'ATTENDANCE' | 'PARTICIPATION' | 'ACHIEVEMENT';
};
