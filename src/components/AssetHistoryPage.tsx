
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, History, Monitor, Calendar, User, FileText } from "lucide-react";

export const AssetHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const assetHistory = [
    {
      id: "LAP-001",
      name: "MacBook Pro 16\"",
      type: "Laptop",
      status: "Currently Assigned",
      assignedDate: "2024-01-15",
      returnDate: null,
      duration: "11 months (ongoing)",
      condition: "Excellent",
      actions: [
        { date: "2024-01-15", action: "Asset Assigned", details: "Initial assignment for work purposes" },
        { date: "2024-03-20", action: "Maintenance Request", details: "Keyboard cleaning and software update" },
        { date: "2024-06-10", action: "Condition Updated", details: "Condition updated to Excellent after maintenance" }
      ]
    },
    {
      id: "PHN-156",
      name: "iPhone 15 Pro",
      type: "Mobile Device",
      status: "Currently Assigned",
      assignedDate: "2024-02-01",
      returnDate: null,
      duration: "10 months (ongoing)",
      condition: "Good",
      actions: [
        { date: "2024-02-01", action: "Asset Assigned", details: "Business mobile device assignment" },
        { date: "2024-04-15", action: "Software Update", details: "iOS update and security patches applied" }
      ]
    },
    {
      id: "TAB-089",
      name: "iPad Pro 11\"",
      type: "Tablet",
      status: "Returned",
      assignedDate: "2023-08-15",
      returnDate: "2024-01-10",
      duration: "5 months",
      condition: "Good",
      actions: [
        { date: "2023-08-15", action: "Asset Assigned", details: "Temporary assignment for project work" },
        { date: "2023-11-20", action: "Condition Check", details: "Regular condition assessment - Good" },
        { date: "2024-01-10", action: "Asset Returned", details: "Project completed, asset returned in good condition" }
      ]
    },
    {
      id: "LAP-045",
      name: "ThinkPad X1 Carbon",
      type: "Laptop",
      status: "Returned",
      assignedDate: "2023-03-01",
      returnDate: "2023-12-15",
      duration: "9 months",
      condition: "Fair",
      actions: [
        { date: "2023-03-01", action: "Asset Assigned", details: "Primary work laptop assignment" },
        { date: "2023-07-20", action: "Repair Request", details: "Screen replacement due to crack" },
        { date: "2023-08-05", action: "Repair Completed", details: "Screen replaced, device restored" },
        { date: "2023-12-15", action: "Asset Returned", details: "Upgraded to newer model" }
      ]
    }
  ];

  const filteredHistory = assetHistory.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" && asset.status === "Currently Assigned") ||
                         (filterStatus === "returned" && asset.status === "Returned");
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Asset History</h1>
        <p className="text-gray-600">View your complete asset assignment history</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <CardTitle className="flex items-center space-x-2">
              <History className="w-5 h-5" />
              <span>My Asset Timeline</span>
            </CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assets</SelectItem>
                  <SelectItem value="active">Currently Assigned</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredHistory.map((asset) => (
              <div key={asset.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Monitor className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                      <p className="text-sm text-gray-600">ID: {asset.id} • {asset.type}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {asset.assignedDate} - {asset.returnDate || "Present"}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">Duration: {asset.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge variant={asset.status === "Currently Assigned" ? "default" : "secondary"}>
                      {asset.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {asset.condition}
                    </Badge>
                  </div>
                </div>

                <div className="pl-16">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Activity Timeline</span>
                  </h4>
                  <div className="space-y-3">
                    {asset.actions.map((action, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">{action.action}</span>
                            <span className="text-xs text-gray-500">{action.date}</span>
                          </div>
                          <p className="text-sm text-gray-600">{action.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredHistory.length} of {assetHistory.length} assets
            </p>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Export History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
