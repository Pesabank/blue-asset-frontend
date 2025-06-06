
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, Edit, Trash2, Shield, Users, Settings } from "lucide-react";

export const RoleManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const roles = [
    { 
      id: 1, 
      name: "Super Administrator", 
      description: "Full system access and control",
      users: 2,
      permissions: ["system_admin", "user_management", "role_management", "audit_logs", "system_settings"],
      color: "purple"
    },
    { 
      id: 2, 
      name: "Organization Admin", 
      description: "Admin access within their organization",
      users: 8,
      permissions: ["asset_management", "user_management", "reports", "maintenance"],
      color: "blue"
    },
    { 
      id: 3, 
      name: "Manager", 
      description: "Departmental management access",
      users: 23,
      permissions: ["asset_view", "user_view", "reports", "assign_assets"],
      color: "green"
    },
    { 
      id: 4, 
      name: "Technician", 
      description: "Maintenance and technical operations",
      users: 45,
      permissions: ["asset_view", "maintenance", "work_orders"],
      color: "orange"
    },
    { 
      id: 5, 
      name: "Auditor", 
      description: "Read-only access for compliance",
      users: 12,
      permissions: ["asset_view", "reports", "audit_logs"],
      color: "gray"
    },
    { 
      id: 6, 
      name: "Employee", 
      description: "Basic asset access and requests",
      users: 156,
      permissions: ["asset_request", "view_assigned"],
      color: "blue"
    }
  ];

  const allPermissions = [
    { id: "system_admin", label: "System Administration", category: "System" },
    { id: "user_management", label: "User Management", category: "Users" },
    { id: "role_management", label: "Role Management", category: "Users" },
    { id: "asset_management", label: "Asset Management", category: "Assets" },
    { id: "asset_view", label: "View Assets", category: "Assets" },
    { id: "asset_request", label: "Request Assets", category: "Assets" },
    { id: "assign_assets", label: "Assign Assets", category: "Assets" },
    { id: "maintenance", label: "Maintenance Operations", category: "Operations" },
    { id: "work_orders", label: "Work Orders", category: "Operations" },
    { id: "reports", label: "Generate Reports", category: "Reporting" },
    { id: "audit_logs", label: "View Audit Logs", category: "Reporting" },
    { id: "system_settings", label: "System Settings", category: "System" },
    { id: "view_assigned", label: "View Assigned Assets", category: "Assets" }
  ];

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const groupedPermissions = allPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, typeof allPermissions>);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
          <p className="text-gray-600">Manage system roles and permissions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>
                Define a new role with specific permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input id="role-name" placeholder="Enter role name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-description">Description</Label>
                <Input id="role-description" placeholder="Enter role description" />
              </div>
              <div className="space-y-4">
                <Label>Permissions</Label>
                {Object.entries(groupedPermissions).map(([category, permissions]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-700">{category}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox id={permission.id} />
                          <Label htmlFor={permission.id} className="text-sm">
                            {permission.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button>Create Role</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <CardTitle>System Roles</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRoles.map((role) => (
              <Card key={role.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full bg-${role.color}-100`}>
                        <Shield className={`h-6 w-6 text-${role.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {role.users} users
                          </span>
                          <span className="flex items-center">
                            <Settings className="h-4 w-4 mr-1" />
                            {role.permissions.length} permissions
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {role.permissions.slice(0, 3).map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission.replace('_', ' ')}
                            </Badge>
                          ))}
                          {role.permissions.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.permissions.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
