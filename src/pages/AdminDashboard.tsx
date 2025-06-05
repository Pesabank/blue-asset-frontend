import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AuthPage } from "@/components/AuthPage";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AddAssetPage } from "@/components/AddAssetPage";
import { UploadEmployeesPage } from "@/components/UploadEmployeesPage";
import { ManageUsersPage } from "@/components/ManageUsersPage";
import { ScheduleMaintenancePage } from "@/components/ScheduleMaintenancePage";
import { GenerateReportsPage } from "@/components/GenerateReportsPage";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Users, 
  Settings, 
  Activity, 
  AlertTriangle, 
  Plus,
  Search,
  Calendar,
  Clock,
  Monitor,
  User,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { DashboardChart } from "@/components/DashboardChart";
import { RecentActivity } from "@/components/RecentActivity";
import { AssetOverview } from "@/components/AssetOverview";
import { AlertsPanel } from "@/components/AlertsPanel";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeItem, setActiveItem] = useState("overview");

  // Define the stats array that was missing
  const stats = [
    {
      title: "Total Assets",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Database,
      color: "blue"
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "green"
    },
    {
      title: "Pending Maintenance",
      value: "23",
      change: "-5%",
      trend: "down",
      icon: Settings,
      color: "orange"
    },
    {
      title: "System Health",
      value: "98.5%",
      change: "+2%",
      trend: "up",
      icon: Activity,
      color: "emerald"
    }
  ];

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setActiveItem("overview");
    navigate('/');
  };

  if (!isAuthenticated) {
    return <AuthPage userType="admin" onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    switch (activeItem) {
      case "add-asset":
        return <AddAssetPage />;
      case "upload-employees":
        return <UploadEmployeesPage />;
      case "manage-users":
        return <ManageUsersPage />;
      case "schedule-maintenance":
        return <ScheduleMaintenancePage />;
      case "generate-reports":
        return <GenerateReportsPage />;
      default:
        return (
          <div className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          {stat.trend === "up" ? (
                            <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <span className={`text-sm font-medium ${
                            stat.trend === "up" ? "text-green-600" : "text-red-600"
                          }`}>
                            {stat.change}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">vs last month</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                        <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Asset Distribution Chart */}
                <div className="lg:col-span-2">
                  <DashboardChart />
                </div>
                
                {/* Alerts Panel */}
                <div>
                  <AlertsPanel />
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-2">
                  <RecentActivity />
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Asset
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Maintenance
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Activity className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assets">
                <AssetOverview />
              </TabsContent>

              <TabsContent value="users" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage user roles and permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "John Smith", role: "Administrator", department: "IT", status: "Active" },
                        { name: "Sarah Johnson", role: "Manager", department: "Operations", status: "Active" },
                        { name: "Mike Davis", role: "Technician", department: "Maintenance", status: "Active" },
                        { name: "Lisa Chen", role: "Auditor", department: "Compliance", status: "Inactive" }
                      ].map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <User className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.department}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge variant={user.role === "Administrator" ? "default" : "secondary"}>
                              {user.role}
                            </Badge>
                            <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                              {user.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Scheduled Maintenance</CardTitle>
                      <CardDescription>Upcoming maintenance tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { asset: "Server Rack A-01", type: "Preventive", due: "Tomorrow", priority: "High" },
                          { asset: "Vehicle F-203", type: "Oil Change", due: "Next Week", priority: "Medium" },
                          { asset: "HVAC Unit B-12", type: "Filter Replacement", due: "2 Days", priority: "Low" }
                        ].map((task, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{task.asset}</p>
                              <p className="text-sm text-gray-600">{task.type}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">{task.due}</p>
                              <Badge variant={task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"}>
                                {task.priority}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Maintenance Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Completed This Month</span>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">On Schedule</span>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Asset Uptime</span>
                          <span className="text-sm font-medium">98.5%</span>
                        </div>
                        <Progress value={98.5} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar 
          activeItem={activeItem} 
          onItemSelect={setActiveItem}
          onSignOut={handleSignOut}
        />
        <SidebarInset>
          {renderContent()}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
