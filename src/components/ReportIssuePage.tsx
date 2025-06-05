
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Plus, Clock, CheckCircle } from "lucide-react";

export const ReportIssuePage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    asset: "",
    issueType: "",
    priority: "",
    title: "",
    description: "",
    steps: ""
  });

  const myAssets = [
    { id: "LAP-001", name: "MacBook Pro 16\"", type: "Laptop" },
    { id: "PHN-156", name: "iPhone 15 Pro", type: "Mobile Device" },
    { id: "MON-089", name: "Dell UltraSharp 27\"", type: "Monitor" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Issue Reported Successfully",
      description: "Your issue has been submitted to the IT support team. You'll receive updates via email.",
    });
    setFormData({
      asset: "",
      issueType: "",
      priority: "",
      title: "",
      description: "",
      steps: ""
    });
  };

  const openIssues = [
    {
      id: "ISS-001",
      title: "MacBook Pro Battery Draining Quickly",
      asset: "MacBook Pro 16\" (LAP-001)",
      priority: "Medium",
      status: "In Progress",
      submitted: "2024-12-04",
      assignedTo: "IT Support Team"
    },
    {
      id: "ISS-002",
      title: "Monitor Flickering Issue",
      asset: "Dell UltraSharp 27\" (MON-089)",
      priority: "Low",
      status: "Pending",
      submitted: "2024-12-03",
      assignedTo: "Mike Davis"
    }
  ];

  const recentIssues = [
    {
      id: "ISS-003",
      title: "iPhone Screen Crack",
      asset: "iPhone 15 Pro (PHN-156)",
      priority: "High",
      status: "Resolved",
      submitted: "2024-11-28",
      resolved: "2024-11-30"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Report Issue</h1>
        <p className="text-gray-600">Report problems with your assigned assets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Report New Issue</span>
              </CardTitle>
              <CardDescription>Describe the problem you're experiencing</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="asset">Affected Asset *</Label>
                  <Select value={formData.asset} onValueChange={(value) => setFormData({...formData, asset: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the asset with the issue" />
                    </SelectTrigger>
                    <SelectContent>
                      {myAssets.map((asset) => (
                        <SelectItem key={asset.id} value={asset.id}>
                          {asset.name} ({asset.id}) - {asset.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="issueType">Issue Type *</Label>
                    <Select value={formData.issueType} onValueChange={(value) => setFormData({...formData, issueType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hardware">Hardware Problem</SelectItem>
                        <SelectItem value="software">Software Issue</SelectItem>
                        <SelectItem value="performance">Performance Issue</SelectItem>
                        <SelectItem value="connectivity">Connectivity Problem</SelectItem>
                        <SelectItem value="damage">Physical Damage</SelectItem>
                        <SelectItem value="malfunction">General Malfunction</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level *</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="How urgent?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Minor inconvenience</SelectItem>
                        <SelectItem value="medium">Medium - Affects productivity</SelectItem>
                        <SelectItem value="high">High - Blocks work completely</SelectItem>
                        <SelectItem value="critical">Critical - Urgent fix needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Brief description of the problem"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the issue in detail. What happened? When did it start? What were you doing when it occurred?"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="steps">Steps to Reproduce (Optional)</Label>
                  <Textarea
                    id="steps"
                    value={formData.steps}
                    onChange={(e) => setFormData({...formData, steps: e.target.value})}
                    placeholder="List the steps to reproduce the issue:&#10;1. Open application...&#10;2. Click on...&#10;3. Error occurs..."
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Issue Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Open Issues</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {openIssues.map((issue) => (
                  <div key={issue.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{issue.title}</h4>
                        <p className="text-xs text-gray-600">{issue.asset}</p>
                        <p className="text-xs text-gray-500">
                          Submitted: {issue.submitted}
                        </p>
                        <p className="text-xs text-gray-500">
                          Assigned to: {issue.assignedTo}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge variant={
                          issue.priority === "High" ? "destructive" : 
                          issue.priority === "Medium" ? "default" : "secondary"
                        } className="text-xs">
                          {issue.priority}
                        </Badge>
                        <Badge variant={issue.status === "In Progress" ? "default" : "secondary"} className="text-xs">
                          {issue.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Recent Resolutions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentIssues.map((issue) => (
                  <div key={issue.id} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-900 text-sm">{issue.title}</h4>
                    <p className="text-xs text-green-700">{issue.asset}</p>
                    <p className="text-xs text-green-600">
                      Resolved: {issue.resolved}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-900">Response Times:</p>
                  <ul className="text-gray-600 text-xs space-y-1 mt-1">
                    <li>• Critical: 1-2 hours</li>
                    <li>• High: 4-8 hours</li>
                    <li>• Medium: 1-2 business days</li>
                    <li>• Low: 2-5 business days</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Emergency Contact:</p>
                  <p className="text-gray-600 text-xs">IT Helpdesk: ext. 2200</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
