import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Download, Filter } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { DemandRequest } from "@shared/schema";

export default function ReceivingDemand() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    requestId: "",
    region: "",
    fertilizerType: "",
    quantity: "",
  });
  const { toast } = useToast();

  const { data: demandRequests = [], isLoading } = useQuery<DemandRequest[]>({
    queryKey: ["/api/demand-requests"],
  });

  const createDemandMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/demand-requests", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/demand-requests"] });
      setDialogOpen(false);
      setFormData({ requestId: "", region: "", fertilizerType: "", quantity: "" });
      toast({
        title: "Success",
        description: "Demand request created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create demand request",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDemandMutation.mutate({
      ...formData,
      quantity: parseFloat(formData.quantity),
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header title="Receiving Yearly Demand from MOA" />
        
        <main className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Manage and process yearly fertilizer demand requests from Ministry of Agriculture
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  New Demand Request
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Demand Request</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="requestId">Request ID</Label>
                    <Input
                      id="requestId"
                      value={formData.requestId}
                      onChange={(e) => setFormData({ ...formData, requestId: e.target.value })}
                      placeholder="DR-2024-001"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="region">Region</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, region: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dhaka">Dhaka</SelectItem>
                        <SelectItem value="Chittagong">Chittagong</SelectItem>
                        <SelectItem value="Sylhet">Sylhet</SelectItem>
                        <SelectItem value="Rajshahi">Rajshahi</SelectItem>
                        <SelectItem value="Khulna">Khulna</SelectItem>
                        <SelectItem value="Barisal">Barisal</SelectItem>
                        <SelectItem value="Rangpur">Rangpur</SelectItem>
                        <SelectItem value="Mymensingh">Mymensingh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fertilizerType">Fertilizer Type</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, fertilizerType: value })}>
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
                    <Label htmlFor="quantity">Quantity (MT)</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="50000"
                      required
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Button type="submit" disabled={createDemandMutation.isPending}>
                      {createDemandMutation.isPending ? "Creating..." : "Create Request"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Demand Requests Table */}
          <Card>
            <CardHeader>
              <CardTitle>MOA Demand Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Loading demand requests...</div>
              ) : demandRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No demand requests found. Create your first request above.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Fertilizer Type</TableHead>
                      <TableHead>Quantity (MT)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {demandRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.requestId}</TableCell>
                        <TableCell>{request.region}</TableCell>
                        <TableCell>{request.fertilizerType}</TableCell>
                        <TableCell>{Number(request.quantity).toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>
                          <div className="space-x-2">
                            <Button variant="ghost" size="sm" className="text-primary">
                              View
                            </Button>
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
