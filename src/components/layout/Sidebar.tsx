
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { 
  Music, 
  Video, 
  Radio, 
  Users, 
  DollarSign, 
  LayoutDashboard, 
  Menu, 
  X 
} from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard/',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: 'Music',
    href: '/dashboard/music',
    icon: <Music className="h-5 w-5" />,
  },
  {
    label: 'Videos',
    href: '/dashboard/videos',
    icon: <Video className="h-5 w-5" />,
  },
  {
    label: 'Livestreams',
    href: '/dashboard/livestreams',
    icon: <Radio className="h-5 w-5" />,
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: <Users className="h-5 w-5" />,
  },
  {
    label: 'Donations',
    href: '/dashboard/donations',
    icon: <DollarSign className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  

  return (
    <div className={cn(
      "h-screen flex flex-col bg-sidebar border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 flex justify-between items-center border-b border-border">
        {!collapsed && (
          <h1 className="font-bold text-xl gradient-text">MetaTV - CMS</h1>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="flex-1 py-6 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              "hover:bg-sidebar-accent",
              location.pathname === item.href 
                ? "bg-sidebar-accent text-primary" 
                : "text-sidebar-foreground"
            )}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </div>
      
      <div className="mt-auto p-4 border-t border-border">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            MetaTV - CMS v1.0
          </div>
        )}
      </div>
    </div>
  );
}