import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ProductionPlan } from "@shared/schema";

export default function ProductionPlanning() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    planName: "",
    planYear: new Date().getFullYear(),
    planType: "",
    description: "",
  });
  const { toast } = useToast();

  const { data: productionPlans = [], isLoading } = useQuery<ProductionPlan[]>({
    queryKey: ["/api/production-plans"],
  });

  const createPlanMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/production-plans", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/production-plans"] });
      setFormData({ planName: "", planYear: new Date().getFullYear(), planType: "", description: "" });
      toast({
        title: "Success",
        description: "Production plan created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create production plan",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPlanMutation.mutate(formData);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const stats = {
    activePlans: productionPlans.filter(p => p.status === "active").length,
    completedPlans: productionPlans.filter(p => p.status === "completed").length,
    pendingPlans: productionPlans.filter(p => p.status === "draft").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header title="Production, Import & Distribution Planning" />
        
        <main className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Create and manage comprehensive fertilizer production and distribution plans
            </p>
          </div>

          {/* Planning Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="planName">Plan Name</Label>
                        <Input
                          id="planName"
                          value={formData.planName}
                          onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                          placeholder="Annual Production Plan 2024"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="planYear">Plan Year</Label>
                        <Select onValueChange={(value) => setFormData({ ...formData, planYear: parseInt(value) })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="planType">Plan Type</Label>
                      <Select onValueChange={(value) => setFormData({ ...formData, planType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select plan type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Annual Production Plan">Annual Production Plan</SelectItem>
                          <SelectItem value="Import Plan">Import Plan</SelectItem>
                          <SelectItem value="Distribution Plan">Distribution Plan</SelectItem>
                          <SelectItem value="Integrated Plan">Integrated Plan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Enter plan description..."
                        rows={4}
                      />
                    </div>
                    <div className="flex space-x-4">
                      <Button type="submit" disabled={createPlanMutation.isPending}>
                        {createPlanMutation.isPending ? "Creating..." : "Create Plan"}
                      </Button>
                      <Button type="button" variant="outline">
                        Save as Draft
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Active Plans</span>
                      <span className="font-semibold text-gray-900">{stats.activePlans}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Completed Plans</span>
                      <span className="font-semibold text-gray-900">{stats.completedPlans}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pending Approval</span>
                      <span className="font-semibold text-gray-900">{stats.pendingPlans}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Plans */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Plans</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Loading production plans...</div>
              ) : productionPlans.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No production plans found. Create your first plan above.
                </div>
              ) : (
                <div className="space-y-4">
                  {productionPlans.map((plan) => (
                    <div key={plan.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{plan.planName}</h4>
                        <p className="text-sm text-gray-600">
                          {plan.planType} - {plan.planYear}
                        </p>
                        <p className="text-sm text-gray-600">
                          Created on {new Date(plan.createdAt!).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        {getStatusBadge(plan.status)}
                        <Button variant="ghost" size="sm" className="text-primary">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
