import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Ship, Plus, Navigation, Bell, Anchor } from "lucide-react";

export default function ArrivalNotifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [etaForm, setEtaForm] = useState({
    vesselId: "",
    vesselName: "",
    port: "",
    eta: "",
    cargoQuantity: "",
    norStatus: "",
  });

  const arrivals = [
    {
      id: "ARR-2024-001",
      vesselName: "MV Fertilizer Express",
      contractId: "CON-2024-001",
      port: "Chattogram",
      cargoQuantity: "50,000",
      eta: "2024-04-18",
      actualArrival: "2024-04-18",
      norSubmitted: true,
      norTime: "2024-04-18 14:30",
      status: "arrived",
      operationalStatus: "ready",
    },
    {
      id: "ARR-2024-002",
      vesselName: "MV Agri Carrier",
      contractId: "CON-2024-002",
      port: "Mongla",
      cargoQuantity: "25,000",
      eta: "2024-05-12",
      actualArrival: "",
      norSubmitted: false,
      norTime: "",
      status: "en-route",
      operationalStatus: "monitoring",
    },
    {
      id: "ARR-2024-003",
      vesselName: "MV Cargo Master",
      contractId: "CON-2024-003",
      port: "Payra",
      cargoQuantity: "30,000",
      eta: "2024-06-28",
      actualArrival: "",
      norSubmitted: false,
      norTime: "",
      status: "scheduled",
      operationalStatus: "planning",
    },
  ];

  const ports = ["Chattogram", "Mongla", "Payra"];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "arrived":
        return <Badge className="bg-green-100 text-green-800">Arrived</Badge>;
      case "en-route":
        return <Badge className="bg-blue-100 text-blue-800">En Route</Badge>;
      case "scheduled":
        return <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>;
      case "delayed":
        return <Badge className="bg-red-100 text-red-800">Delayed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getOperationalBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-green-100 text-green-800">Ready</Badge>;
      case "monitoring":
        return <Badge className="bg-blue-100 text-blue-800">Monitoring</Badge>;
      case "planning":
        return <Badge className="bg-yellow-100 text-yellow-800">Planning</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating ETA:", etaForm);
    setDialogOpen(false);
    setEtaForm({
      vesselId: "",
      vesselName: "",
      port: "",
      eta: "",
      cargoQuantity: "",
      norStatus: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header title="Arrival Notifications" />
        
        <main className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Monitor vessel arrivals at designated ports with ETA tracking and Notice of Readiness (NOR) management for operational planning
            </p>
          </div>

          {/* Arrival Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Vessels</p>
                    <p className="text-3xl font-bold text-gray-900">{arrivals.length}</p>
                  </div>
                  <Ship className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Arrived</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {arrivals.filter(a => a.status === "arrived").length}
                    </p>
                  </div>
                  <Anchor className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">En Route</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {arrivals.filter(a => a.status === "en-route").length}
                    </p>
                  </div>
                  <Navigation className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">NOR Submitted</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {arrivals.filter(a => a.norSubmitted).length}
                    </p>
                  </div>
                  <Bell className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Update ETA */}
          <div className="mb-6">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Update ETA/Arrival
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Update Vessel ETA/Arrival</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vesselName">Vessel Name</Label>
                      <Input
                        id="vesselName"
                        value={etaForm.vesselName}
                        onChange={(e) => setEtaForm({ ...etaForm, vesselName: e.target.value })}
                        placeholder="MV Fertilizer Express"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="port">Arrival Port</Label>
                      <Select onValueChange={(value) => setEtaForm({ ...etaForm, port: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select port" />
                        </SelectTrigger>
                        <SelectContent>
                          {ports.map((port) => (
                            <SelectItem key={port} value={port}>{port}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eta">Expected Time of Arrival</Label>
                      <Input
                        id="eta"
                        type="datetime-local"
                        value={etaForm.eta}
                        onChange={(e) => setEtaForm({ ...etaForm, eta: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cargoQuantity">Cargo Quantity (MT)</Label>
                      <Input
                        id="cargoQuantity"
                        type="number"
                        value={etaForm.cargoQuantity}
                        onChange={(e) => setEtaForm({ ...etaForm, cargoQuantity: e.target.value })}
                        placeholder="50000"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="norStatus">NOR Status</Label>
                    <Select onValueChange={(value) => setEtaForm({ ...etaForm, norStatus: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select NOR status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit">Update</Button>
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Arrival List */}
          <Card>
            <CardHeader>
              <CardTitle>Vessel Arrivals</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Arrival ID</TableHead>
                    <TableHead>Vessel Name</TableHead>
                    <TableHead>Port</TableHead>
                    <TableHead>Cargo (MT)</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>Actual Arrival</TableHead>
                    <TableHead>NOR Status</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {arrivals.map((arrival) => (
                    <TableRow key={arrival.id}>
                      <TableCell className="font-medium">{arrival.id}</TableCell>
                      <TableCell>{arrival.vesselName}</TableCell>
                      <TableCell>{arrival.port}</TableCell>
                      <TableCell>{Number(arrival.cargoQuantity).toLocaleString()}</TableCell>
                      <TableCell>
                        {new Date(arrival.eta).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {arrival.actualArrival ? new Date(arrival.actualArrival).toLocaleDateString() : "Pending"}
                      </TableCell>
                      <TableCell>
                        {arrival.norSubmitted ? (
                          <Badge className="bg-green-100 text-green-800">Submitted</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(arrival.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-primary">
                            View
                          </Button>
                          {arrival.status === "en-route" && (
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              Update ETA
                            </Button>
                          )}
                          {arrival.status === "arrived" && !arrival.norSubmitted && (
                            <Button variant="ghost" size="sm" className="text-green-600">
                              Submit NOR
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}