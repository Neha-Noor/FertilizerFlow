import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Warehouse, TrendingUp, AlertTriangle, Package } from "lucide-react";

export default function BufferStock() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    location: "",
    fertilizerType: "",
    quantity: "",
    action: "",
  });

  const stockData = [
    {
      id: 1,
      location: "Chittagong Warehouse",
      fertilizerType: "Urea",
      currentStock: 25000,
      minimumLevel: 15000,
      maximumLevel: 50000,
      status: "optimal",
      lastUpdated: "2024-01-15 10:30 AM",
    },
    {
      id: 2,
      location: "Dhaka Distribution Center",
      fertilizerType: "TSP",
      currentStock: 8000,
      minimumLevel: 10000,
      maximumLevel: 30000,
      status: "low",
      lastUpdated: "2024-01-15 09:45 AM",
    },
    {
      id: 3,
      location: "Sylhet Regional Store",
      fertilizerType: "DAP",
      currentStock: 18000,
      minimumLevel: 12000,
      maximumLevel: 35000,
      status: "optimal",
      lastUpdated: "2024-01-15 08:20 AM",
    },
  ];

  const metrics = [
    {
      title: "Total Stock",
      value: "51,000",
      unit: "MT",
      icon: Warehouse,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Stock Utilization",
      value: "68.5",
      unit: "%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Low Stock Alerts",
      value: "1",
      unit: "location",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Active Locations",
      value: "3",
      unit: "warehouses",
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "optimal":
        return <Badge className="bg-green-100 text-green-800">Optimal</Badge>;
      case "low":
        return <Badge className="bg-red-100 text-red-800">Low Stock</Badge>;
      case "high":
        return <Badge className="bg-yellow-100 text-yellow-800">High Stock</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating stock:", updateForm);
    // Handle stock update logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header title="Buffer Stock Updates" />
        
        <main className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Monitor and update buffer stock levels across all storage locations
            </p>
          </div>

          {/* Stock Metrics */}
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

          {/* Stock Update Form and Current Levels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Update Stock Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="location">Storage Location</Label>
                      <Select onValueChange={(value) => setUpdateForm({ ...updateForm, location: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Chittagong Warehouse">Chittagong Warehouse</SelectItem>
                          <SelectItem value="Dhaka Distribution Center">Dhaka Distribution Center</SelectItem>
                          <SelectItem value="Sylhet Regional Store">Sylhet Regional Store</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="fertilizerType">Fertilizer Type</Label>
                      <Select onValueChange={(value) => setUpdateForm({ ...updateForm, fertilizerType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fertilizer type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Urea">Urea</SelectItem>
                          <SelectItem value="TSP">TSP</SelectItem>
                          <SelectItem value="DAP">DAP</SelectItem>
                          <SelectItem value="MoP">MoP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="action">Action</Label>
                      <Select onValueChange={(value) => setUpdateForm({ ...updateForm, action: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="add">Add Stock</SelectItem>
                          <SelectItem value="remove">Remove Stock</SelectItem>
                          <SelectItem value="adjust">Adjust Stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="quantity">Quantity (MT)</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={updateForm.quantity}
                        onChange={(e) => setUpdateForm({ ...updateForm, quantity: e.target.value })}
                        placeholder="Enter quantity"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Update Stock
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Current Stock Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stockData.map((stock) => (
                      <div key={stock.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{stock.location}</h4>
                            <p className="text-sm text-gray-600">{stock.fertilizerType}</p>
                          </div>
                          {getStatusBadge(stock.status)}
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-500">Current Stock</p>
                            <p className="font-semibold text-gray-900">{stock.currentStock.toLocaleString()} MT</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Min Level</p>
                            <p className="font-semibold text-gray-900">{stock.minimumLevel.toLocaleString()} MT</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Max Level</p>
                            <p className="font-semibold text-gray-900">{stock.maximumLevel.toLocaleString()} MT</p>
                          </div>
                        </div>

                        {/* Stock Level Bar */}
                        <div className="mb-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                stock.status === "low" ? "bg-red-500" : 
                                stock.status === "high" ? "bg-yellow-500" : "bg-green-500"
                              }`}
                              style={{ 
                                width: `${(stock.currentStock / stock.maximumLevel) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>

                        <p className="text-xs text-gray-500">Last updated: {stock.lastUpdated}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
