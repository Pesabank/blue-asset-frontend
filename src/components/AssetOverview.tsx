
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Monitor, Settings, User, Plus, Search } from "lucide-react";

export const AssetOverview = () => {
  const assets = [
    {
      id: "LAP-001",
      name: "MacBook Pro 16\"",
      category: "IT Equipment",
      assignedTo: "John Smith",
      status: "Active",
      location: "Office - Desk 24",
      value: "$2,499",
      lastMaintenance: "2024-10-15",
      condition: "Excellent"
    },
    {
      id: "VEH-203",
      name: "Ford Transit Van",
      category: "Vehicle",
      assignedTo: "Mike Davis",
      status: "Active",
      location: "Fleet Garage",
      value: "$32,000",
      lastMaintenance: "2024-11-20",
      condition: "Good"
    },
    {
      id: "SRV-045",
      name: "Dell PowerEdge Server",
      category: "IT Infrastructure",
      assignedTo: "Unassigned",
      status: "Maintenance",
      location: "Data Center",
      value: "$8,500",
      lastMaintenance: "2024-12-01",
      condition: "Under Repair"
    },
    {
      id: "FUR-089",
      name: "Ergonomic Office Chair",
      category: "Furniture",
      assignedTo: "Sarah Johnson",
      status: "Active",
      location: "Office - Desk 12",
      value: "$450",
      lastMaintenance: "N/A",
      condition: "Good"
    },
    {
      id: "MOB-156",
      name: "iPhone 15 Pro",
      category: "Mobile Device",
      assignedTo: "Lisa Chen",
      status: "Active",
      location: "Personal Use",
      value: "$999",
      lastMaintenance: "N/A",
      condition: "Excellent"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Maintenance":
        return "destructive";
      case "Available":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return "text-green-600 bg-green-100";
      case "Good":
        return "text-blue-600 bg-blue-100";
      case "Fair":
        return "text-yellow-600 bg-yellow-100";
      case "Under Repair":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Asset Management</CardTitle>
              <CardDescription>Comprehensive view of all organizational assets</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Filter Assets
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {assets.map((asset, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Monitor className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                      <p className="text-sm text-gray-600">ID: {asset.id} • {asset.category}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">
                          Assigned to: {asset.assignedTo}
                        </span>
                        <span className="text-sm text-gray-500">
                          Location: {asset.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(asset.status)}>
                        {asset.status}
                      </Badge>
                      <span className={`text-xs px-2 py-1 rounded-full ${getConditionColor(asset.condition)}`}>
                        {asset.condition}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{asset.value}</p>
                    <p className="text-xs text-gray-500">
                      Last Maintenance: {asset.lastMaintenance}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Maintenance
                  </Button>
                  <Button size="sm" variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    Reassign
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
