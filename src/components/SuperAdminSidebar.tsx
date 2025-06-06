
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  Shield, 
  Users, 
  Settings, 
  Activity,
  LogOut,
  Home,
  Database,
  BarChart3,
  FileText,
  Globe,
  Lock,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuperAdminSidebarProps {
  activeItem: string;
  onItemSelect: (item: string) => void;
  onSignOut: () => void;
}

export const SuperAdminSidebar = ({ activeItem, onItemSelect, onSignOut }: SuperAdminSidebarProps) => {
  const mainItems = [
    { id: "overview", title: "System Overview", icon: Home },
    { id: "role-management", title: "Role Management", icon: Users },
    { id: "system-settings", title: "System Settings", icon: Settings },
    { id: "advanced-analytics", title: "Advanced Analytics", icon: BarChart3 },
    { id: "audit-logs", title: "Audit Logs", icon: FileText },
  ];

  const systemItems = [
    { id: "organizations", title: "Organizations", icon: Globe },
    { id: "licenses", title: "License Management", icon: Lock },
    { id: "monitoring", title: "System Monitoring", icon: Monitor },
    { id: "security", title: "Security Center", icon: Shield },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">BlueAssets</h2>
            <p className="text-xs text-gray-500">SuperAdmin Portal</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeItem === item.id}
                    onClick={() => onItemSelect(item.id)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeItem === item.id}
                    onClick={() => onItemSelect(item.id)}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button variant="outline" onClick={onSignOut} className="w-full justify-start">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
