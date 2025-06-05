
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Monitor, Smartphone, Laptop } from "lucide-react";

export const RequestAssetPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    assetType: "",
    purpose: "",
    urgency: "",
    duration: "",
    justification: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Asset Request Submitted",
      description: "Your request has been sent to the admin team for approval.",
    });
    setFormData({
      assetType: "",
      purpose: "",
      urgency: "",
      duration: "",
      justification: ""
    });
  };

  const assetCategories = [
    {
      type: "Laptop",
      icon: Laptop,
      description: "Portable computers for work and travel",
      examples: "MacBook Pro, ThinkPad, Surface Laptop"
    },
    {
      type: "Monitor",
      icon: Monitor,
      description: "External displays for enhanced productivity",
      examples: "4K displays, ultrawide monitors"
    },
    {
      type: "Mobile Device",
      icon: Smartphone,
      description: "Smartphones and tablets for mobile work",
      examples: "iPhone, iPad, Android devices"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Request New Asset</h1>
        <p className="text-gray-600">Submit a request for equipment or resources you need</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Asset Request Form</span>
              </CardTitle>
              <CardDescription>Please provide details about the asset you need</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="assetType">Asset Type *</Label>
                  <Select value={formData.assetType} onValueChange={(value) => setFormData({...formData, assetType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of asset you need" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laptop">Laptop / Notebook</SelectItem>
                      <SelectItem value="desktop">Desktop Computer</SelectItem>
                      <SelectItem value="monitor">Monitor / Display</SelectItem>
                      <SelectItem value="mobile">Mobile Device</SelectItem>
                      <SelectItem value="tablet">Tablet</SelectItem>
                      <SelectItem value="accessories">Accessories (Mouse, Keyboard, etc.)</SelectItem>
                      <SelectItem value="software">Software License</SelectItem>
                      <SelectItem value="other">Other Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose of Use *</Label>
                  <Select value={formData.purpose} onValueChange={(value) => setFormData({...formData, purpose: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Why do you need this asset?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary-work">Primary work device</SelectItem>
                      <SelectItem value="project-specific">Specific project requirement</SelectItem>
                      <SelectItem value="replacement">Replace damaged/old equipment</SelectItem>
                      <SelectItem value="temporary">Temporary/short-term use</SelectItem>
                      <SelectItem value="remote-work">Remote work setup</SelectItem>
                      <SelectItem value="presentation">Presentations/meetings</SelectItem>
                      <SelectItem value="development">Software development</SelectItem>
                      <SelectItem value="training">Training/learning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Priority Level *</Label>
                    <Select value={formData.urgency} onValueChange={(value) => setFormData({...formData, urgency: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="How urgent?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Can wait 2+ weeks</SelectItem>
                        <SelectItem value="medium">Medium - Needed within 1 week</SelectItem>
                        <SelectItem value="high">High - Needed within 2-3 days</SelectItem>
                        <SelectItem value="urgent">Urgent - Needed immediately</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Expected Duration</Label>
                    <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="How long?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-week">1 week</SelectItem>
                        <SelectItem value="1-month">1 month</SelectItem>
                        <SelectItem value="3-months">3 months</SelectItem>
                        <SelectItem value="6-months">6 months</SelectItem>
                        <SelectItem value="permanent">Permanent assignment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="justification">Business Justification *</Label>
                  <Textarea
                    id="justification"
                    value={formData.justification}
                    onChange={(e) => setFormData({...formData, justification: e.target.value})}
                    placeholder="Please explain why you need this asset and how it will help with your work..."
                    rows={4}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Asset Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assetCategories.map((category, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <category.icon className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{category.type}</h4>
                        <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{category.examples}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Request Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm font-medium text-yellow-900">Pending Review</p>
                  <p className="text-xs text-yellow-700">MacBook Pro request submitted 2 days ago</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-900">Approved</p>
                  <p className="text-xs text-green-700">Monitor request approved, ready for pickup</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
