
import React from "react";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useAuth } from "@/context/authContext";
import { Separator } from "@/components/ui/separator";

interface ProfileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileMenu({ open, onOpenChange }: ProfileMenuProps) {
  const { user, logout } = useAuth();
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
          <SheetDescription>
            Manage your account and settings
          </SheetDescription>
        </SheetHeader>

        <div className="py-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-semibold text-primary">
                {user?.address ? user.address.slice(2, 4).toUpperCase() : '??'}
              </span>
            </div>
            <div>
              <h3 className="font-medium">
                {user?.address ? `${user.address.slice(0, 6)}...${user.address.slice(-4)}` : 'Unknown'}
              </h3>
              <p className="text-sm text-muted-foreground">{user?.role || 'Guest'}</p>
            </div>
          </div>

          <Separator className="my-4" />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Theme</h4>
                <p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
              </div>
              <ThemeToggle />
            </div>

            <Separator className="my-4" />

            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={() => {
                logout();
                onOpenChange(false);
              }}
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </Button>
          </div>
        </div>
        
        <SheetFooter>
          <p className="text-xs text-center w-full text-muted-foreground">
            D-Attend v1.0.0
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
