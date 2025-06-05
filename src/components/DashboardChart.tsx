
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const barData = [
  { name: "Jan", assets: 240, maintenance: 18 },
  { name: "Feb", assets: 280, maintenance: 22 },
  { name: "Mar", assets: 320, maintenance: 15 },
  { name: "Apr", assets: 380, maintenance: 28 },
  { name: "May", assets: 420, maintenance: 12 },
  { name: "Jun", assets: 450, maintenance: 35 },
];

const pieData = [
  { name: "IT Equipment", value: 1245, color: "#3B82F6" },
  { name: "Vehicles", value: 456, color: "#10B981" },
  { name: "Furniture", value: 789, color: "#F59E0B" },
  { name: "Machinery", value: 234, color: "#EF4444" },
  { name: "Software", value: 123, color: "#8B5CF6" },
];

export const DashboardChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Asset Growth & Maintenance</CardTitle>
          <CardDescription>Monthly trends for the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="assets" fill="#3B82F6" name="Assets" />
              <Bar dataKey="maintenance" fill="#F59E0B" name="Maintenance" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Asset Distribution</CardTitle>
          <CardDescription>Assets by category</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} assets`, "Count"]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
