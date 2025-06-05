
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Monitor, Package } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const ScheduleReturnPage = () => {
  const { toast } = useToast();
  const [selectedAsset, setSelectedAsset] = useState("");
  const [returnDate, setReturnDate] = useState<Date>();
  const [returnReason, setReturnReason] = useState("");
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");

  const myAssets = [
    {
      id: "LAP-001",
      name: "MacBook Pro 16\"",
      type: "Laptop",
      assignedDate: "2024-01-15",
      condition: "Excellent"
    },
    {
      id: "PHN-156",
      name: "iPhone 15 Pro",
      type: "Mobile Device",
      assignedDate: "2024-02-01",
      condition: "Good"
    },
    {
      id: "MON-089",
      name: "Dell UltraSharp 27\"",
      type: "Monitor",
      assignedDate: "2024-01-15",
      condition: "Good"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Return Scheduled Successfully",
      description: "Your asset return has been scheduled. You'll receive a confirmation email shortly.",
    });
    setSelectedAsset("");
    setReturnDate(undefined);
    setReturnReason("");
    setCondition("");
    setNotes("");
  };

  const selectedAssetData = myAssets.find(asset => asset.id === selectedAsset);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Schedule Asset Return</h1>
        <p className="text-gray-600">Return an asset that you no longer need</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>Return Request Form</span>
              </CardTitle>
              <CardDescription>Select an asset and schedule its return</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="asset">Select Asset to Return *</Label>
                  <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an asset from your assignments" />
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

                {selectedAssetData && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Monitor className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900">{selectedAssetData.name}</h4>
                        <p className="text-sm text-blue-700">
                          Assigned: {selectedAssetData.assignedDate} • Current condition: {selectedAssetData.condition}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Return *</Label>
                  <Select value={returnReason} onValueChange={setReturnReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Why are you returning this asset?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-longer-needed">No longer needed</SelectItem>
                      <SelectItem value="project-completed">Project completed</SelectItem>
                      <SelectItem value="role-change">Role change</SelectItem>
                      <SelectItem value="upgrade-requested">Requesting upgrade</SelectItem>
                      <SelectItem value="technical-issues">Technical issues</SelectItem>
                      <SelectItem value="leaving-company">Leaving company</SelectItem>
                      <SelectItem value="temporary-return">Temporary return</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Preferred Return Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !returnDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {returnDate ? format(returnDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={setReturnDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Current Condition *</Label>
                    <Select value={condition} onValueChange={setCondition}>
                      <SelectTrigger>
                        <SelectValue placeholder="Asset condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent - Like new</SelectItem>
                        <SelectItem value="good">Good - Minor wear</SelectItem>
                        <SelectItem value="fair">Fair - Noticeable wear</SelectItem>
                        <SelectItem value="poor">Poor - Needs repair</SelectItem>
                        <SelectItem value="damaged">Damaged - Requires attention</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional information about the asset condition, issues, or special instructions..."
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={!selectedAsset || !returnDate || !returnReason || !condition}>
                  Schedule Return
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Return Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Submit Request</p>
                    <p className="text-xs text-gray-600">Fill out the return form</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Confirmation</p>
                    <p className="text-xs text-gray-600">Receive email confirmation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Return Asset</p>
                    <p className="text-xs text-gray-600">Bring to designated location</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">4</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Inspection</p>
                    <p className="text-xs text-gray-600">Asset condition verified</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Scheduled Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Presentation Remote</p>
                      <p className="text-xs text-gray-600">Due: Dec 6, 2024</p>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Returns are typically processed within 1-2 business days
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
