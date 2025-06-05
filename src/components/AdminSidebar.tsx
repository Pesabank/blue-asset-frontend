
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
  Database, 
  Users, 
  Settings, 
  Plus, 
  Calendar,
  FileText,
  Activity,
  LogOut,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface AdminSidebarProps {
  activeItem: string;
  onItemSelect: (item: string) => void;
  onSignOut: () => void;
}

export const AdminSidebar = ({ activeItem, onItemSelect, onSignOut }: AdminSidebarProps) => {
  const navigate = useNavigate();

  const mainItems = [
    { id: "overview", title: "Dashboard", icon: Home },
    { id: "add-asset", title: "Add Asset", icon: Plus },
    { id: "manage-users", title: "Manage Users", icon: Users },
    { id: "schedule-maintenance", title: "Schedule Maintenance", icon: Calendar },
    { id: "generate-reports", title: "Generate Reports", icon: FileText },
  ];

  const dataItems = [
    { id: "upload-employees", title: "Upload Employee Data", icon: Database },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Database className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">BlueAssets</h2>
            <p className="text-xs text-gray-500">Admin Portal</p>
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
          <SidebarGroupLabel>Data Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dataItems.map((item) => (
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
