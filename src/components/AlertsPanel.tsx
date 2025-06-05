
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Calendar, Settings } from "lucide-react";

export const AlertsPanel = () => {
  const alerts = [
    {
      type: "critical",
      title: "Server Down",
      description: "Mail server offline since 2:30 AM",
      timestamp: "3 hours ago",
      action: "Investigate"
    },
    {
      type: "warning",
      title: "Low Battery",
      description: "Vehicle GPS tracker at 15%",
      timestamp: "1 hour ago",
      action: "Schedule Service"
    },
    {
      type: "maintenance",
      title: "Maintenance Due",
      description: "HVAC Unit B-12 filter replacement",
      timestamp: "Tomorrow",
      action: "Schedule"
    },
    {
      type: "info",
      title: "License Expiry",
      description: "Adobe Creative Suite expires in 30 days",
      timestamp: "30 days",
      action: "Renew"
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "warning":
        return <Clock className="h-4 w-4 text-orange-600" />;
      case "maintenance":
        return <Settings className="h-4 w-4 text-blue-600" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "warning":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Warning</Badge>;
      case "maintenance":
        return <Badge variant="default">Maintenance</Badge>;
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <span>System Alerts</span>
        </CardTitle>
        <CardDescription>Critical notifications requiring attention</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div key={index} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{alert.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  {getAlertBadge(alert.type)}
                  <Button size="sm" variant="outline" className="text-xs">
                    {alert.action}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full mt-4" variant="outline">
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  );
};
