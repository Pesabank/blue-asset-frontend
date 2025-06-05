
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
  Monitor, 
  Plus, 
  Calendar,
  History,
  AlertTriangle,
  LogOut,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmployeeSidebarProps {
  activeItem: string;
  onItemSelect: (item: string) => void;
  onSignOut: () => void;
}

export const EmployeeSidebar = ({ activeItem, onItemSelect, onSignOut }: EmployeeSidebarProps) => {
  const menuItems = [
    { id: "overview", title: "My Assets", icon: Home },
    { id: "request-asset", title: "Request New Asset", icon: Plus },
    { id: "schedule-return", title: "Schedule Return", icon: Calendar },
    { id: "asset-history", title: "Asset History", icon: History },
    { id: "report-issue", title: "Report Issue", icon: AlertTriangle },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Monitor className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">BlueAssets</h2>
            <p className="text-xs text-gray-500">Employee Portal</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
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
