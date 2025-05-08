
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/authContext';
import { Button } from '@/components/ui/button';
import { ProfileMenu } from '@/components/profile/ProfileMenu';
import { useTheme } from '@/context/themeContext';

type SidebarLinkProps = {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive?: boolean;
};

function SidebarLink({ href, icon, children, isActive }: SidebarLinkProps) {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 font-normal",
          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
        )}
      >
        {icon}
        <span>{children}</span>
      </Button>
    </Link>
  );
}

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="h-screen w-64 flex flex-col bg-sidebar fixed left-0 top-0 border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center mr-3">
            <span className="font-bold text-white">D</span>
          </div>
          <h1 className="font-bold text-sidebar-foreground text-lg">D-Attend</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-4 px-2 space-y-1">
        <SidebarLink href="/dashboard" icon={<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>} isActive={isActive("/dashboard")}>
          Dashboard
        </SidebarLink>
        
        <SidebarLink href="/servers" icon={<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>} isActive={isActive("/servers")}>
          Servers
        </SidebarLink>
        
        <SidebarLink href="/credentials" icon={<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.3 8.93 9 11.6l.81 2.93-2.31.78-1.33-2.24-2.86.48-.34-2.5 2.33-1.23L4.97 7.43l2.31-.78 1.33 2.24 2.86-.48.34 2.5-2.33 1.23 2.82 1.79Z" /><path d="M15.34 17.52a3 3 0 1 0 2.82-5.2 3 3 0 0 0-2.82 5.2Z" /><path d="m17 22-3-3" /><path d="m14 6 3-3" /><path d="m11 9 2-2" /></svg>} isActive={isActive("/credentials")}>
          Credentials
        </SidebarLink>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div 
          className="flex items-center cursor-pointer hover:bg-sidebar-accent/50 p-2 rounded-md"
          onClick={() => setProfileOpen(true)}
        >
          <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="font-semibold text-sidebar-foreground">
              {user?.address ? user.address.slice(2, 4).toUpperCase() : '??'}
            </span>
          </div>
          <div className="ml-2 truncate">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.address ? `${user.address.slice(0, 6)}...${user.address.slice(-4)}` : 'Unknown'}
            </p>
            <p className="text-xs text-sidebar-foreground/60">
              {user?.role || 'Guest'}
            </p>
          </div>
        </div>
      </div>

      <ProfileMenu open={profileOpen} onOpenChange={setProfileOpen} />
    </aside>
  );
}
