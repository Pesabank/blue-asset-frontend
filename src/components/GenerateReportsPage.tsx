
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, FileText, Download, BarChart3, PieChart, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const GenerateReportsPage = () => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState("");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [format_, setFormat] = useState("");

  const handleGenerateReport = () => {
    if (!reportType) {
      toast({
        title: "Please select a report type",
        description: "Choose the type of report you want to generate.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report Generated Successfully",
      description: `Your ${reportType} report is being prepared and will be downloaded shortly.`,
    });
  };

  const recentReports = [
    {
      name: "Asset Utilization Report",
      type: "Asset Analytics",
      generated: "2024-12-05",
      format: "PDF",
      size: "2.3 MB"
    },
    {
      name: "Maintenance Summary Q4",
      type: "Maintenance",
      generated: "2024-12-03",
      format: "Excel",
      size: "1.8 MB"
    },
    {
      name: "User Activity Report",
      type: "User Analytics",
      generated: "2024-12-01",
      format: "PDF",
      size: "1.2 MB"
    }
  ];

  const reportTemplates = [
    {
      title: "Asset Summary Report",
      description: "Comprehensive overview of all assets, their status, and assignments",
      icon: BarChart3,
      category: "Assets"
    },
    {
      title: "Maintenance Analytics",
      description: "Analysis of maintenance activities, costs, and performance metrics",
      icon: TrendingUp,
      category: "Maintenance"
    },
    {
      title: "User Activity Report",
      description: "User engagement, asset requests, and activity patterns",
      icon: PieChart,
      category: "Users"
    },
    {
      title: "Financial Summary",
      description: "Asset costs, depreciation, and financial impact analysis",
      icon: FileText,
      category: "Financial"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Generate Reports</h1>
        <p className="text-gray-600">Create comprehensive reports and analytics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Configuration</CardTitle>
              <CardDescription>Customize your report parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asset-summary">Asset Summary Report</SelectItem>
                    <SelectItem value="maintenance-analytics">Maintenance Analytics</SelectItem>
                    <SelectItem value="user-activity">User Activity Report</SelectItem>
                    <SelectItem value="financial-summary">Financial Summary</SelectItem>
                    <SelectItem value="compliance-audit">Compliance Audit Report</SelectItem>
                    <SelectItem value="depreciation">Depreciation Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">From Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateFrom && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "PPP") : "Start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">To Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateTo && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, "PPP") : "End date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Export Format</label>
                <Select value={format_} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV File</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleGenerateReport} className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Quick access to common report types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTemplates.map((template, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setReportType(template.title.toLowerCase().replace(/\s+/g, '-'))}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <template.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{template.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                        <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 rounded">
                          {template.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{report.name}</h4>
                      <p className="text-xs text-gray-600">{report.type}</p>
                      <p className="text-xs text-gray-500">
                        {report.generated} • {report.format} • {report.size}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium text-gray-900 mb-2">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Schedule Automated Report
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export All Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
