
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Settings, Plus, AlertTriangle } from "lucide-react";

export const RecentActivity = () => {
  const activities = [
    {
      type: "asset_added",
      user: "John Smith",
      description: "Added new MacBook Pro to inventory",
      timestamp: "2 minutes ago",
      icon: Plus,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      type: "maintenance",
      user: "Sarah Johnson",
      description: "Scheduled maintenance for Server Rack A-01",
      timestamp: "15 minutes ago",
      icon: Settings,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      type: "checkout",
      user: "Mike Davis",
      description: "Checked out iPad Pro for field work",
      timestamp: "1 hour ago",
      icon: User,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      type: "alert",
      user: "System",
      description: "Low battery alert for Vehicle F-203 GPS tracker",
      timestamp: "2 hours ago",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      type: "return",
      user: "Lisa Chen",
      description: "Returned conference room projector",
      timestamp: "3 hours ago",
      icon: User,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
        <CardDescription>Latest actions across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`p-2 rounded-full ${activity.bgColor}`}>
                <activity.icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.description}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">by {activity.user}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{activity.timestamp}</span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {activity.type.replace('_', ' ')}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
