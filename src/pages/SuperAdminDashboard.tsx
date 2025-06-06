import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AuthPage } from "@/components/AuthPage";
import { SuperAdminSidebar } from "@/components/SuperAdminSidebar";
import { RoleManagementPage } from "@/components/RoleManagementPage";
import { SystemSettingsPage } from "@/components/SystemSettingsPage";
import { AdvancedAnalyticsPage } from "@/components/AdvancedAnalyticsPage";
import { AuditLogsPage } from "@/components/AuditLogsPage";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Users, 
  Settings, 
  Activity, 
  AlertTriangle, 
  Database,
  Monitor,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Server,
  Globe,
  Lock
} from "lucide-react";
import { DashboardChart } from "@/components/DashboardChart";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeItem, setActiveItem] = useState("overview");

  const systemStats = [
    {
      title: "Total Organizations",
      value: "47",
      change: "+3%",
      trend: "up",
      icon: Globe,
      color: "blue"
    },
    {
      title: "System Uptime",
      value: "99.9%",
      change: "+0.1%",
      trend: "up",
      icon: Server,
      color: "green"
    },
    {
      title: "Security Alerts",
      value: "2",
      change: "-85%",
      trend: "down",
      icon: Shield,
      color: "red"
    },
    {
      title: "License Usage",
      value: "78%",
      change: "+5%",
      trend: "up",
      icon: Lock,
      color: "orange"
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
      case "role-management":
        return <RoleManagementPage />;
      case "system-settings":
        return <SystemSettingsPage />;
      case "advanced-analytics":
        return <AdvancedAnalyticsPage />;
      case "audit-logs":
        return <AuditLogsPage />;
      default:
        return (
          <div className="p-6">
            {/* System Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {systemStats.map((stat, index) => (
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
            <Tabs defaultValue="system-overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
                <TabsTrigger value="system-overview">System Overview</TabsTrigger>
                <TabsTrigger value="organizations">Organizations</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>

              <TabsContent value="system-overview" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* System Health Chart */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>System Performance</CardTitle>
                      <CardDescription>Real-time system metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DashboardChart />
                    </CardContent>
                  </Card>
                </div>
                
                {/* Critical Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                      Critical Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 border-l-4 border-red-500 bg-red-50 rounded">
                      <p className="text-sm font-medium text-red-800">High CPU Usage</p>
                      <p className="text-xs text-red-600">Server cluster reaching 90% capacity</p>
                    </div>
                    <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded">
                      <p className="text-sm font-medium text-yellow-800">License Expiry</p>
                      <p className="text-xs text-yellow-600">3 organizations expiring this month</p>
                    </div>
                  </CardContent>
                </Card>

                {/* System Actions */}
                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick System Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="h-20 flex-col">
                          <Shield className="h-6 w-6 mb-2" />
                          Security Scan
                        </Button>
                        <Button variant="outline" className="h-20 flex-col">
                          <Database className="h-6 w-6 mb-2" />
                          Backup System
                        </Button>
                        <Button variant="outline" className="h-20 flex-col">
                          <Settings className="h-6 w-6 mb-2" />
                          System Maintenance
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="organizations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Organization Management</CardTitle>
                    <CardDescription>Manage all organizations in the system</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "TechCorp Inc.", users: 245, assets: 1203, status: "Active", plan: "Enterprise" },
                        { name: "Global Solutions", users: 89, assets: 456, status: "Active", plan: "Professional" },
                        { name: "StartupXYZ", users: 23, assets: 67, status: "Trial", plan: "Basic" },
                        { name: "Manufacturing Co.", users: 156, assets: 890, status: "Active", plan: "Enterprise" }
                      ].map((org, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-semibold text-gray-900">{org.name}</h3>
                            <p className="text-sm text-gray-600">{org.users} users • {org.assets} assets</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge variant={org.plan === "Enterprise" ? "default" : "secondary"}>
                              {org.plan}
                            </Badge>
                            <Badge variant={org.status === "Active" ? "default" : "secondary"}>
                              {org.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">System Security Score</span>
                          <span className="text-sm font-medium">94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Failed Login Attempts</span>
                          <span className="text-sm font-medium">12</span>
                        </div>
                        <Progress value={12} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">2FA Adoption Rate</span>
                          <span className="text-sm font-medium">87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Security Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { event: "Successful login", user: "admin@techcorp.com", time: "2 min ago", severity: "low" },
                          { event: "Failed login attempt", user: "unknown@domain.com", time: "15 min ago", severity: "medium" },
                          { event: "Password reset", user: "user@startup.com", time: "1 hour ago", severity: "low" },
                          { event: "Suspicious API access", user: "api-user", time: "2 hours ago", severity: "high" }
                        ].map((event, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded">
                            <div>
                              <p className="text-sm font-medium">{event.event}</p>
                              <p className="text-xs text-gray-600">{event.user}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500">{event.time}</p>
                              <Badge variant={event.severity === "high" ? "destructive" : event.severity === "medium" ? "default" : "secondary"}>
                                {event.severity}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>System Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">CPU Usage</span>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <Progress value={45} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Memory Usage</span>
                          <span className="text-sm font-medium">62%</span>
                        </div>
                        <Progress value={62} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Disk Usage</span>
                          <span className="text-sm font-medium">38%</span>
                        </div>
                        <Progress value={38} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Network I/O</span>
                          <span className="text-sm font-medium">23%</span>
                        </div>
                        <Progress value={23} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Database Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Query Response Time</span>
                          <span className="text-sm font-medium">1.2ms</span>
                        </div>
                        <Progress value={88} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Active Connections</span>
                          <span className="text-sm font-medium">247/500</span>
                        </div>
                        <Progress value={49} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Cache Hit Rate</span>
                          <span className="text-sm font-medium">96.7%</span>
                        </div>
                        <Progress value={97} className="h-2" />
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
        <SuperAdminSidebar 
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

export default SuperAdminDashboard;
