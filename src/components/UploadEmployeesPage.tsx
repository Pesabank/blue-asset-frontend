
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, Users, CheckCircle } from "lucide-react";

export const UploadEmployeesPage = () => {
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleProcessFile = async () => {
    if (!uploadedFile) return;

    setIsUploading(true);
    // Simulate file processing
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Employee Data Imported Successfully",
        description: `${uploadedFile.name} processed. 25 employees added to the system.`,
      });
      setUploadedFile(null);
    }, 2000);
  };

  const downloadTemplate = () => {
    toast({
      title: "Template Downloaded",
      description: "CSV template file has been downloaded to your computer.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upload Employee Data</h1>
        <p className="text-gray-600">Import employee information to assign assets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload CSV File</span>
            </CardTitle>
            <CardDescription>
              Upload a CSV file containing employee information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="csvFile">Select CSV File</Label>
              <Input
                id="csvFile"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
              />
            </div>

            {uploadedFile && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">
                    File ready: {uploadedFile.name}
                  </span>
                </div>
              </div>
            )}

            <Button 
              onClick={handleProcessFile} 
              disabled={!uploadedFile || isUploading}
              className="w-full"
            >
              {isUploading ? "Processing..." : "Import Employee Data"}
            </Button>

            <Button variant="outline" onClick={downloadTemplate} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download CSV Template
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>CSV Format Requirements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Required Columns:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <code className="bg-gray-100 px-1 rounded">employee_id</code> - Unique identifier</li>
                  <li>• <code className="bg-gray-100 px-1 rounded">first_name</code> - Employee first name</li>
                  <li>• <code className="bg-gray-100 px-1 rounded">last_name</code> - Employee last name</li>
                  <li>• <code className="bg-gray-100 px-1 rounded">email</code> - Email address</li>
                  <li>• <code className="bg-gray-100 px-1 rounded">department</code> - Department name</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Optional Columns:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <code className="bg-gray-100 px-1 rounded">job_title</code> - Job position</li>
                  <li>• <code className="bg-gray-100 px-1 rounded">location</code> - Work location</li>
                  <li>• <code className="bg-gray-100 px-1 rounded">manager</code> - Manager name</li>
                  <li>• <code className="bg-gray-100 px-1 rounded">phone</code> - Phone number</li>
                </ul>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Tip:</strong> Download the template file for the correct format and column headers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Imports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { file: "employees_2024_december.csv", date: "Dec 5, 2024", count: 25, status: "Success" },
              { file: "new_hires_november.csv", date: "Nov 28, 2024", count: 8, status: "Success" },
              { file: "department_updates.csv", date: "Nov 15, 2024", count: 15, status: "Success" }
            ].map((import_, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{import_.file}</p>
                  <p className="text-sm text-gray-600">{import_.date} • {import_.count} employees</p>
                </div>
                <span className="text-sm text-green-600 font-medium">{import_.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
