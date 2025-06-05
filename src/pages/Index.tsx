
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Settings, User, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/employee-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Database className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Blue<span className="text-blue-600">Assets</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade asset management platform designed to help organizations efficiently track, 
            manage, maintain, and optimize both physical and digital assets across their entire lifecycle.
          </p>
        </div>

        {/* Role Selection */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Choose Your Dashboard
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Admin Dashboard Card */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 cursor-pointer" 
                  onClick={() => handleRoleSelect('admin')}>
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-fit group-hover:bg-blue-200 transition-colors">
                  <Settings className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Admin Dashboard</CardTitle>
                <CardDescription className="text-lg">
                  Comprehensive management and oversight
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Complete asset lifecycle management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Real-time analytics and reporting</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>User and role management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Maintenance scheduling and alerts</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700" size="lg">
                  <Settings className="mr-2 h-4 w-4" />
                  Access Admin Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Employee Dashboard Card */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200 cursor-pointer"
                  onClick={() => handleRoleSelect('employee')}>
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit group-hover:bg-green-200 transition-colors">
                  <User className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Employee Dashboard</CardTitle>
                <CardDescription className="text-lg">
                  Self-service portal for your assets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>View your assigned assets</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Request maintenance and support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Check-in/check-out assets</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Asset history and documentation</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-green-600 hover:bg-green-700" size="lg">
                  <User className="mr-2 h-4 w-4" />
                  Access Employee Portal
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Enterprise Features at Your Fingertips
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-50 p-3 rounded-lg w-fit mx-auto mb-3">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">Asset Tracking</p>
            </div>
            <div className="text-center">
              <div className="bg-green-50 p-3 rounded-lg w-fit mx-auto mb-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">Team Management</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 p-3 rounded-lg w-fit mx-auto mb-3">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">Maintenance</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-50 p-3 rounded-lg w-fit mx-auto mb-3">
                <User className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">Mobile Ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
