import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AuthPage } from "@/components/AuthPage";
import { EmployeeSidebar } from "@/components/EmployeeSidebar";
import { RequestAssetPage } from "@/components/RequestAssetPage";
import { ScheduleReturnPage } from "@/components/ScheduleReturnPage";
import { AssetHistoryPage } from "@/components/AssetHistoryPage";
import { ReportIssuePage } from "@/components/ReportIssuePage";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Monitor, 
  User, 
  Clock, 
  Calendar,
  Settings,
  AlertTriangle,
  CheckCircle,
  Plus,
  Search
} from "lucide-react";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeItem, setActiveItem] = useState("overview");

  const myAssets = [
    {
      id: "LAP-001",
      name: "MacBook Pro 16\"",
      type: "Laptop",
      status: "Active",
      assignedDate: "2024-01-15",
      condition: "Excellent",
      location: "Office - Desk 24"
    },
    {
      id: "PHN-156",
      name: "iPhone 15 Pro",
      type: "Mobile Device",
      status: "Active",
      assignedDate: "2024-02-01",
      condition: "Good",
      location: "Personal Use"
    },
    {
      id: "MON-089",
      name: "Dell UltraSharp 27\"",
      type: "Monitor",
      status: "Active",
      assignedDate: "2024-01-15",
      condition: "Good",
      location: "Office - Desk 24"
    }
  ];

  const recentActivity = [
    {
      action: "Asset Check-out",
      asset: "Presentation Remote",
      timestamp: "2 hours ago",
      status: "completed"
    },
    {
      action: "Maintenance Request",
      asset: "MacBook Pro 16\"",
      timestamp: "1 day ago",
      status: "pending"
    },
    {
      action: "Asset Return",
      asset: "Conference Camera",
      timestamp: "3 days ago",
      status: "completed"
    }
  ];

  const pendingRequests = [
    {
      type: "Maintenance",
      asset: "MacBook Pro 16\"",
      issue: "Keyboard replacement needed",
      submitted: "2024-12-04",
      status: "In Progress"
    },
    {
      type: "Return",
      asset: "Presentation Remote",
      issue: "No longer needed",
      submitted: "2024-12-05",
      status: "Pending"
    }
  ];

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setActiveItem("overview");
    navigate('/');
  };

  if (!isAuthenticated) {
    return <AuthPage userType="employee" onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    switch (activeItem) {
      case "request-asset":
        return <RequestAssetPage />;
      case "schedule-return":
        return <ScheduleReturnPage />;
      case "asset-history":
        return <AssetHistoryPage />;
      case "report-issue":
        return <ReportIssuePage />;
      default:
        return (
          <div className="p-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">My Assets</p>
                      <p className="text-3xl font-bold text-gray-900">{myAssets.length}</p>
                    </div>
                    <Monitor className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Active Requests</p>
                      <p className="text-3xl font-bold text-gray-900">2</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Due Returns</p>
                      <p className="text-3xl font-bold text-gray-900">1</p>
                    </div>
                    <Calendar className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Total Value</p>
                      <p className="text-3xl font-bold text-gray-900">$8,250</p>
                    </div>
                    <User className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="assets" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-[300px]">
                <TabsTrigger value="assets">My Assets</TabsTrigger>
                <TabsTrigger value="requests">Requests</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="assets" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Assigned Assets</CardTitle>
                    <CardDescription>Assets currently assigned to you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {myAssets.map((asset, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="bg-blue-100 p-3 rounded-lg">
                                <Monitor className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                                <p className="text-sm text-gray-600">ID: {asset.id} • {asset.type}</p>
                                <p className="text-sm text-gray-500">Assigned: {asset.assignedDate}</p>
                              </div>
                            </div>
                            <div className="text-right space-y-2">
                              <Badge variant={asset.status === "Active" ? "default" : "secondary"}>
                                {asset.status}
                              </Badge>
                              <p className="text-sm text-gray-600">{asset.location}</p>
                              <Badge variant="outline" className="text-xs">
                                {asset.condition}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <Button size="sm" variant="outline">
                              <Settings className="h-4 w-4 mr-2" />
                              Request Maintenance
                            </Button>
                            <Button size="sm" variant="outline">
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule Return
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requests" className="space-y-6">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Requests</CardTitle>
                      <CardDescription>Your active maintenance and return requests</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pendingRequests.map((request, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className={`p-2 rounded-full ${
                                  request.type === "Maintenance" ? "bg-orange-100" : "bg-blue-100"
                                }`}>
                                  {request.type === "Maintenance" ? (
                                    <Settings className={`h-4 w-4 ${
                                      request.type === "Maintenance" ? "text-orange-600" : "text-blue-600"
                                    }`} />
                                  ) : (
                                    <Calendar className="h-4 w-4 text-blue-600" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{request.type} Request</h4>
                                  <p className="text-sm text-gray-600">{request.asset}</p>
                                  <p className="text-sm text-gray-500">{request.issue}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant={request.status === "In Progress" ? "default" : "secondary"}>
                                  {request.status}
                                </Badge>
                                <p className="text-sm text-gray-500 mt-1">
                                  Submitted: {request.submitted}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                      <Button className="h-20 flex-col space-y-2">
                        <Plus className="h-6 w-6" />
                        <span>Request New Asset</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col space-y-2">
                        <Settings className="h-6 w-6" />
                        <span>Report Issue</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col space-y-2">
                        <Calendar className="h-6 w-6" />
                        <span>Schedule Return</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col space-y-2">
                        <Search className="h-6 w-6" />
                        <span>Asset History</span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your asset-related activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                          <div className={`p-2 rounded-full ${
                            activity.status === "completed" ? "bg-green-100" : "bg-yellow-100"
                          }`}>
                            {activity.status === "completed" ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Clock className="h-4 w-4 text-yellow-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{activity.action}</p>
                            <p className="text-sm text-gray-600">{activity.asset}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">{activity.timestamp}</p>
                            <Badge variant={activity.status === "completed" ? "default" : "secondary"} className="text-xs">
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <EmployeeSidebar 
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

export default EmployeeDashboard;
