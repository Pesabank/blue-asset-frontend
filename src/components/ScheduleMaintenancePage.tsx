
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Plus, Settings, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const ScheduleMaintenancePage = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    asset: "",
    type: "",
    priority: "",
    technician: "",
    description: "",
    estimatedDuration: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Maintenance Scheduled",
      description: `Maintenance for ${formData.asset} has been scheduled successfully.`,
    });
    setFormData({
      asset: "",
      type: "",
      priority: "",
      technician: "",
      description: "",
      estimatedDuration: ""
    });
    setSelectedDate(undefined);
  };

  const upcomingMaintenance = [
    {
      id: 1,
      asset: "Server Rack A-01",
      type: "Preventive Maintenance",
      scheduled: "2024-12-06",
      technician: "Mike Davis",
      priority: "High",
      status: "Scheduled"
    },
    {
      id: 2,
      asset: "Vehicle F-203",
      type: "Oil Change",
      scheduled: "2024-12-08",
      technician: "Sarah Johnson",
      priority: "Medium",
      status: "Scheduled"
    },
    {
      id: 3,
      asset: "HVAC Unit B-12",
      type: "Filter Replacement",
      scheduled: "2024-12-10",
      technician: "Mike Davis",
      priority: "Low",
      status: "Scheduled"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Schedule Maintenance</h1>
        <p className="text-gray-600">Plan and organize asset maintenance tasks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Schedule New Maintenance</span>
            </CardTitle>
            <CardDescription>Create a new maintenance task</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="asset">Select Asset *</Label>
                <Select value={formData.asset} onValueChange={(value) => setFormData({...formData, asset: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="server-rack-a01">Server Rack A-01</SelectItem>
                    <SelectItem value="vehicle-f203">Vehicle F-203</SelectItem>
                    <SelectItem value="hvac-b12">HVAC Unit B-12</SelectItem>
                    <SelectItem value="laptop-001">MacBook Pro LAP-001</SelectItem>
                    <SelectItem value="printer-main">Main Office Printer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Maintenance Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preventive">Preventive Maintenance</SelectItem>
                    <SelectItem value="corrective">Corrective Maintenance</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                    <SelectItem value="calibration">Calibration</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                    <SelectItem value="replacement">Part Replacement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority *</Label>
                  <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.estimatedDuration}
                    onChange={(e) => setFormData({...formData, estimatedDuration: e.target.value})}
                    placeholder="2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="technician">Assign Technician</Label>
                <Select value={formData.technician} onValueChange={(value) => setFormData({...formData, technician: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select technician" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mike.davis">Mike Davis</SelectItem>
                    <SelectItem value="sarah.johnson">Sarah Johnson</SelectItem>
                    <SelectItem value="john.smith">John Smith</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Scheduled Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the maintenance work to be performed..."
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full">
                Schedule Maintenance
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Upcoming Maintenance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMaintenance.map((maintenance) => (
                <div key={maintenance.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="bg-orange-100 p-2 rounded-lg">
                        <Settings className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{maintenance.asset}</h4>
                        <p className="text-sm text-gray-600">{maintenance.type}</p>
                        <p className="text-xs text-gray-500">
                          Assigned to: {maintenance.technician}
                        </p>
                        <p className="text-xs text-gray-500">
                          Scheduled: {maintenance.scheduled}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge variant={
                        maintenance.priority === "High" ? "destructive" : 
                        maintenance.priority === "Medium" ? "default" : "secondary"
                      }>
                        {maintenance.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {maintenance.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
