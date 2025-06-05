
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Edit, Trash2, User } from "lucide-react";

export const ManageUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const users = [
    { 
      id: 1, 
      name: "John Smith", 
      email: "john.smith@company.com", 
      role: "Administrator", 
      department: "IT", 
      status: "Active",
      lastLogin: "2024-12-05"
    },
    { 
      id: 2, 
      name: "Sarah Johnson", 
      email: "sarah.johnson@company.com", 
      role: "Manager", 
      department: "Operations", 
      status: "Active",
      lastLogin: "2024-12-04"
    },
    { 
      id: 3, 
      name: "Mike Davis", 
      email: "mike.davis@company.com", 
      role: "Technician", 
      department: "Maintenance", 
      status: "Active",
      lastLogin: "2024-12-05"
    },
    { 
      id: 4, 
      name: "Lisa Chen", 
      email: "lisa.chen@company.com", 
      role: "Auditor", 
      department: "Compliance", 
      status: "Inactive",
      lastLogin: "2024-11-28"
    },
    { 
      id: 5, 
      name: "Robert Wilson", 
      email: "robert.wilson@company.com", 
      role: "Employee", 
      department: "Sales", 
      status: "Active",
      lastLogin: "2024-12-03"
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <CardTitle>User Directory</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="administrator">Administrator</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="technician">Technician</SelectItem>
                  <SelectItem value="auditor">Auditor</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-500">{user.department} • Last login: {user.lastLogin}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={user.role === "Administrator" ? "default" : "secondary"}>
                    {user.role}
                  </Badge>
                  <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                    {user.status}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
