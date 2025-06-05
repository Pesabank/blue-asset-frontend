
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export const AddAssetPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    serialNumber: "",
    purchasePrice: "",
    vendor: "",
    location: "",
    assignee: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Asset Added Successfully",
      description: `${formData.name} has been added to the system.`,
    });
    setFormData({
      name: "",
      type: "",
      serialNumber: "",
      purchasePrice: "",
      vendor: "",
      location: "",
      assignee: "",
      description: ""
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Asset</h1>
        <p className="text-gray-600">Create a new asset in the system</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asset Information</CardTitle>
          <CardDescription>Enter the details for the new asset</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Asset Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. MacBook Pro 16"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Asset Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laptop">Laptop</SelectItem>
                    <SelectItem value="desktop">Desktop Computer</SelectItem>
                    <SelectItem value="mobile">Mobile Device</SelectItem>
                    <SelectItem value="monitor">Monitor</SelectItem>
                    <SelectItem value="vehicle">Vehicle</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="software">Software License</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="serialNumber">Serial Number</Label>
                <Input
                  id="serialNumber"
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                  placeholder="Enter serial number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchasePrice">Purchase Price</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  value={formData.purchasePrice}
                  onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Input
                  id="vendor"
                  value={formData.vendor}
                  onChange={(e) => setFormData({...formData, vendor: e.target.value})}
                  placeholder="e.g. Apple, Dell, HP"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g. Office Floor 2"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assignee">Assign to Employee (Optional)</Label>
              <Select value={formData.assignee} onValueChange={(value) => setFormData({...formData, assignee: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john.smith">John Smith</SelectItem>
                  <SelectItem value="sarah.johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="mike.davis">Mike Davis</SelectItem>
                  <SelectItem value="lisa.chen">Lisa Chen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Additional notes about this asset..."
                rows={3}
              />
            </div>

            <div className="flex space-x-2">
              <Button type="submit">Add Asset</Button>
              <Button type="button" variant="outline">Save as Draft</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
