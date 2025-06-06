
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Filter, Eye, Calendar } from "lucide-react";

export const AuditLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState("all");
  const [filterUser, setFilterUser] = useState("all");

  const auditLogs = [
    {
      id: 1,
      timestamp: "2024-12-05 14:32:15",
      user: "admin@techcorp.com",
      action: "USER_LOGIN",
      resource: "Authentication System",
      ip: "192.168.1.100",
      status: "Success",
      details: "Successful login from Chrome browser"
    },
    {
      id: 2,
      timestamp: "2024-12-05 14:30:42",
      user: "john.doe@techcorp.com",
      action: "ASSET_CREATE",
      resource: "Laptop-L001",
      ip: "192.168.1.105",
      status: "Success",
      details: "Created new laptop asset"
    },
    {
      id: 3,
      timestamp: "2024-12-05 14:28:33",
      user: "superadmin@system.com",
      action: "ROLE_UPDATE",
      resource: "Manager Role",
      ip: "192.168.1.101",
      status: "Success",
      details: "Updated role permissions"
    },
    {
      id: 4,
      timestamp: "2024-12-05 14:25:17",
      user: "unknown@attacker.com",
      action: "USER_LOGIN",
      resource: "Authentication System",
      ip: "203.0.113.12",
      status: "Failed",
      details: "Invalid credentials"
    },
    {
      id: 5,
      timestamp: "2024-12-05 14:15:54",
      user: "sarah.jones@techcorp.com",
      action: "ASSET_ASSIGN",
      resource: "Laptop-L001",
      ip: "192.168.1.110",
      status: "Success",
      details: "Assigned to John Doe"
    },
    {
      id: 6,
      timestamp: "2024-12-05 14:05:38",
      user: "admin@techcorp.com",
      action: "SYSTEM_CONFIG",
      resource: "Email Settings",
      ip: "192.168.1.100",
      status: "Success",
      details: "Updated SMTP configuration"
    },
    {
      id: 7,
      timestamp: "2024-12-05 14:03:21",
      user: "sarah.jones@techcorp.com",
      action: "REPORT_GENERATE",
      resource: "Assets Report",
      ip: "192.168.1.110",
      status: "Failed",
      details: "Permission denied"
    },
    {
      id: 8,
      timestamp: "2024-12-05 14:01:07",
      user: "mike.wilson@techcorp.com",
      action: "MAINTENANCE_SCHEDULE",
      resource: "Server-S001",
      ip: "192.168.1.115",
      status: "Success",
      details: "Scheduled maintenance for 2024-12-10"
    }
  ];

  // Users for the filter dropdown
  const users = [...new Set(auditLogs.map(log => log.user))];
  
  // Action types for the filter dropdown
  const actions = [...new Set(auditLogs.map(log => log.action))];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = filterAction === "all" || log.action === filterAction;
    const matchesUser = filterUser === "all" || log.user === filterUser;
    
    return matchesSearch && matchesAction && matchesUser;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600">Track and review all system actions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <CardTitle>System Activity</CardTitle>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-full md:w-64"
                />
              </div>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {actions.map(action => (
                    <SelectItem key={action} value={action}>{action}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterUser} onValueChange={setFilterUser}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="User" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {users.map(user => (
                    <SelectItem key={user} value={user}>{user.split('@')[0]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="hidden md:table-cell">Resource</TableHead>
                  <TableHead className="hidden md:table-cell">IP Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.timestamp}</TableCell>
                    <TableCell>{log.user.split('@')[0]}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.action}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{log.resource}</TableCell>
                    <TableCell className="hidden md:table-cell">{log.ip}</TableCell>
                    <TableCell>
                      <Badge variant={log.status === "Success" ? "default" : "destructive"}>
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredLogs.length} of {auditLogs.length} logs
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
