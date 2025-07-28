import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function AnnualProcurementPlan() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [planForm, setPlanForm] = useState({
    planName: "",
    fiscalYear: "",
    budgetAllocation: "",
    procurementCategory: "",
    description: "",
    priority: "",
  });

  const procurementPlans = [
    {
      id: 1,
      planName: "Urea Import Plan FY 2024-25",
      fiscalYear: "2024-25",
      budgetAllocation: "5,000,000,000",
      category: "Fertilizer Import",
      status: "board-approved",
      priority: "high",
      createdDate: "2024-01-10",
    },
    {
      id: 2,
      planName: "Raw Material Procurement Plan",
      fiscalYear: "2024-25",
      budgetAllocation: "2,500,000,000",
      category: "Raw Materials",
      status: "pending-approval",
      priority: "medium",
      createdDate: "2024-01-08",
    },
    {
      id: 3,
      planName: "Machinery & Equipment Plan",
      fiscalYear: "2024-25",
      budgetAllocation: "1,200,000,000",
      category: "Equipment",
      status: "draft",
      priority: "low",
      createdDate: "2024-01-05",
    },
  ];

  const metrics = [
    {
      title: "Total Plans",
      value: procurementPlans.length,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Board Approved",
      value: procurementPlans.filter(p => p.status === "board-approved").length,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Approval",
      value: procurementPlans.filter(p => p.status === "pending-approval").length,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "High Priority",
      value: procurementPlans.filter(p => p.priority === "high").length,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "board-approved":
        return <Badge className="bg-green-100 text-green-800">Board Approved</Badge>;
      case "pending-approval":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High Priority</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low Priority</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating procurement plan:", planForm);
    setDialogOpen(false);
    setPlanForm({
      planName: "",
      fiscalYear: "",
      budgetAllocation: "",
      procurementCategory: "",
      description: "",
      priority: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header title="Annual Procurement Plan (APP)" />
        
        <main className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Create and manage annual procurement plans with budget considerations, timelines, and BCIC Board approval processes
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                    </div>
                    <div className={`p-3 ${metric.bgColor} rounded-full`}>
                      <metric.icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Plan Creation and List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Create New Plan</CardTitle>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="h-4 w-4 mr-2" />
                        New APP
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create Annual Procurement Plan</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="planName">Plan Name</Label>
                          <Input
                            id="planName"
                            value={planForm.planName}
                            onChange={(e) => setPlanForm({ ...planForm, planName: e.target.value })}
                            placeholder="Urea Import Plan FY 2024-25"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fiscalYear">Fiscal Year</Label>
                            <Select onValueChange={(value) => setPlanForm({ ...planForm, fiscalYear: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select fiscal year" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2024-25">2024-25</SelectItem>
                                <SelectItem value="2025-26">2025-26</SelectItem>
                                <SelectItem value="2026-27">2026-27</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="budgetAllocation">Budget Allocation (BDT)</Label>
                            <Input
                              id="budgetAllocation"
                              type="number"
                              value={planForm.budgetAllocation}
                              onChange={(e) => setPlanForm({ ...planForm, budgetAllocation: e.target.value })}
                              placeholder="5000000000"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="procurementCategory">Procurement Category</Label>
                            <Select onValueChange={(value) => setPlanForm({ ...planForm, procurementCategory: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Fertilizer Import">Fertilizer Import</SelectItem>
                                <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                                <SelectItem value="Equipment">Equipment</SelectItem>
                                <SelectItem value="Services">Services</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="priority">Priority Level</Label>
                            <Select onValueChange={(value) => setPlanForm({ ...planForm, priority: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high">High Priority</SelectItem>
                                <SelectItem value="medium">Medium Priority</SelectItem>
                                <SelectItem value="low">Low Priority</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={planForm.description}
                            onChange={(e) => setPlanForm({ ...planForm, description: e.target.value })}
                            placeholder="Detailed description of procurement needs and strategy..."
                            rows={4}
                          />
                        </div>

                        <div className="flex space-x-4">
                          <Button type="submit">Create Plan</Button>
                          <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Current Procurement Plans</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {procurementPlans.map((plan) => (
                      <div key={plan.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{plan.planName}</h4>
                            <p className="text-sm text-gray-600">FY {plan.fiscalYear} • {plan.category}</p>
                            <p className="text-sm text-gray-600">
                              Budget: ৳{Number(plan.budgetAllocation).toLocaleString()} BDT
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getPriorityBadge(plan.priority)}
                            {getStatusBadge(plan.status)}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">
                            Created: {new Date(plan.createdDate).toLocaleDateString()}
                          </p>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="text-primary">
                              View Details
                            </Button>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            {plan.status === "draft" && (
                              <Button variant="ghost" size="sm" className="text-blue-600">
                                Submit for Approval
                              </Button>
                            )}
                          </div>
                        </div>
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