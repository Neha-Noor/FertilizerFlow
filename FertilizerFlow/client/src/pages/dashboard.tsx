import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductionChart } from "@/components/charts/production-chart";
import { DistributionChart } from "@/components/charts/distribution-chart";
import { Sprout, Warehouse, Truck, AlertTriangle } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data for demonstration
  const productionData = [65000, 59000, 80000, 81000, 56000, 75000];
  const productionLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const distributionData = [35, 25, 25, 15];
  const distributionLabels = ["Urea", "TSP", "DAP", "MoP"];

  const stats = [
    {
      title: "Total Production",
      value: "1,245,678",
      unit: "MT",
      change: "+5.2% from last month",
      icon: Sprout,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Stock Level",
      value: "85,432",
      unit: "MT",
      change: "Optimal level",
      icon: Warehouse,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Deliveries",
      value: "127",
      unit: "",
      change: "12 urgent",
      icon: Truck,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Quality Issues",
      value: "3",
      unit: "",
      change: "Needs attention",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      message: "Production order #PO-2024-001 completed",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      message: "New demand request from Dhaka region",
      time: "4 hours ago",
      type: "info",
    },
    {
      id: 3,
      message: "Quality check completed for TSP fertilizer",
      time: "6 hours ago",
      type: "warning",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header title="Dashboard" />
        
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value} {stat.unit && <span className="text-sm">{stat.unit}</span>}
                      </p>
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Production Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ProductionChart data={productionData} labels={productionLabels} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fertilizer Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <DistributionChart data={distributionData} labels={distributionLabels} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "success" ? "bg-green-500" : 
                      activity.type === "info" ? "bg-blue-500" : "bg-yellow-500"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
