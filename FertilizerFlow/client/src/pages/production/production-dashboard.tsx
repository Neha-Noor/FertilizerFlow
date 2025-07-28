import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductionChart } from "@/components/charts/production-chart";
import { Factory, TrendingUp, Settings, Award } from "lucide-react";
import type { ProductionData } from "@shared/schema";

export default function ProductionDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: productionData = [], isLoading } = useQuery<ProductionData[]>({
    queryKey: ["/api/production-data"],
  });

  // Sample data for charts
  const productionLabels = ["Urea", "TSP", "DAP", "MoP"];
  const productionValues = [25000, 18000, 22000, 12000];

  const metrics = [
    {
      title: "Daily Production",
      value: "1,245",
      unit: "MT",
      icon: Factory,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Efficiency Rate",
      value: "94.5",
      unit: "%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Lines",
      value: "12",
      unit: "of 15",
      icon: Settings,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Quality Score",
      value: "98.2",
      unit: "%",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const factories = [
    {
      name: "PUFF Factory - Chittagong",
      status: "operational",
      efficiency: 95,
      production: "450 MT/day",
    },
    {
      name: "CFL Factory - Fenchuganj",
      status: "operational",
      efficiency: 92,
      production: "380 MT/day",
    },
    {
      name: "JFCL Factory - Ghorashal",
      status: "maintenance",
      efficiency: 0,
      production: "0 MT/day",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500";
      case "maintenance":
        return "bg-yellow-500";
      case "stopped":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header title="Production Dashboard" />
        
        <main className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Monitor real-time production metrics and factory performance
            </p>
          </div>

          {/* Production Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {metric.value}
                      </p>
                      <p className="text-sm text-gray-600">{metric.unit}</p>
                    </div>
                    <div className={`p-3 ${metric.bgColor} rounded-full`}>
                      <metric.icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Factory Status and Production Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Factory Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {factories.map((factory, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 ${getStatusColor(factory.status)} rounded-full`}></div>
                        <div>
                          <span className="font-medium text-gray-900">{factory.name}</span>
                          <p className="text-sm text-gray-600">{factory.production}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-600 capitalize">{factory.status}</span>
                        {factory.efficiency > 0 && (
                          <p className="text-xs text-gray-500">{factory.efficiency}% efficiency</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Production by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ProductionChart data={productionValues} labels={productionLabels} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Production Data Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Production Data</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Loading production data...</div>
              ) : productionData.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No production data available.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Factory
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fertilizer Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Daily Production
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Target
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Efficiency
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {productionData.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.factoryName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.fertilizerType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {Number(item.dailyProduction)} MT
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {Number(item.targetProduction)} MT
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {Number(item.efficiencyRate)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
