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
import { Ship, Plus, Navigation, Bell, Clock } from "lucide-react";

export default function ShipmentCoordination() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [vesselForm, setVesselForm] = useState({
    vesselName: "",
    contractId: "",
    layCan: "",
    nominatedDate: "",
    cargoQuantity: "",
    supplier: "",
    shipbroker: "",
  });

  const vessels = [
    {
      id: "VES-2024-001",
      vesselName: "MV Fertilizer Express",
      contractId: "CON-2024-001",
      supplier: "Global Fertilizer Ltd.",
      shipbroker: "Marine Logistics BD",
      cargoQuantity: "50,000",
      layCan: "15-20 Apr 2024",
      status: "nominated",
      approvalStatus: "approved",
      eta: "2024-04-18",
      nor: "pending",
      nominatedDate: "2024-03-15",
    },
    {
      id: "VES-2024-002",
      vesselName: "MV Agri Carrier",
      contractId: "CON-2024-002",
      supplier: "Agri-Chem Industries",
      shipbroker: "Ocean Freight Services",
      cargoQuantity: "25,000",
      layCan: "10-15 May 2024",
      status: "pending-approval",
      approvalStatus: "pending",
      eta: "",
      nor: "not-applicable",
      nominatedDate: "2024-03-20",
    },
    {
      id: "VES-2024-003",
      vesselName: "MV Cargo Master",
      contractId: "CON-2024-001",
      supplier: "Global Fertilizer Ltd.",
      shipbroker: "Shipping Solutions Ltd",
      cargoQuantity: "30,000",
      layCan: "25-30 Jun 2024",
      status: "notified",
      approvalStatus: "approved",
      eta: "2024-06-28",
      nor: "submitted",
      nominatedDate: "2024-04-01",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "nominated":
        return <Badge className="bg-blue-100 text-blue-800">Nominated</Badge>;
      case "pending-approval":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>;
      case "notified":
        return <Badge className="bg-green-100 text-green-800">Notified</Badge>;
      case "arrived":
        return <Badge className="bg-purple-100 text-purple-800">Arrived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getApprovalBadge = (status: string) => {
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

  const getNorBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge className="bg-green-100 text-green-800">Submitted</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "not-applicable":
        return <Badge className="bg-gray-100 text-gray-800">N/A</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nominating vessel:", vesselForm);
    setDialogOpen(false);
    setVesselForm({
      vesselName: "",
      contractId: "",
      layCan: "",
      nominatedDate: "",
      cargoQuantity: "",
      supplier: "",
      shipbroker: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header title="Shipment Coordination" />
        
        <main className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Coordinate vessel nominations, laycan scheduling, competent authority approvals, and real-time shipment notifications to Purchase Division
            </p>
          </div>

          {/* Shipment Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Vessels</p>
                    <p className="text-3xl font-bold text-gray-900">{vessels.length}</p>
                  </div>
                  <Ship className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Approved</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {vessels.filter(v => v.approvalStatus === "approved").length}
                    </p>
                  </div>
                  <Navigation className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {vessels.filter(v => v.approvalStatus === "pending").length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Cargo (MT)</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {vessels.reduce((sum, v) => sum + Number(v.cargoQuantity), 0).toLocaleString()}
                    </p>
                  </div>
                  <Bell className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Nominate New Vessel */}
          <div className="mb-6">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Nominate Mother Vessel
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Nominate Mother Vessel</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vesselName">Vessel Name</Label>
                      <Input
                        id="vesselName"
                        value={vesselForm.vesselName}
                        onChange={(e) => setVesselForm({ ...vesselForm, vesselName: e.target.value })}
                        placeholder="MV Fertilizer Express"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="contractId">Contract ID</Label>
                      <Select onValueChange={(value) => setVesselForm({ ...vesselForm, contractId: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select contract" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CON-2024-001">CON-2024-001</SelectItem>
                          <SelectItem value="CON-2024-002">CON-2024-002</SelectItem>
                          <SelectItem value="CON-2024-003">CON-2024-003</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="supplier">Supplier</Label>
                      <Input
                        id="supplier"
                        value={vesselForm.supplier}
                        onChange={(e) => setVesselForm({ ...vesselForm, supplier: e.target.value })}
                        placeholder="Global Fertilizer Ltd."
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="shipbroker">Shipbroker</Label>
                      <Input
                        id="shipbroker"
                        value={vesselForm.shipbroker}
                        onChange={(e) => setVesselForm({ ...vesselForm, shipbroker: e.target.value })}
                        placeholder="Marine Logistics BD"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cargoQuantity">Cargo Quantity (MT)</Label>
                      <Input
                        id="cargoQuantity"
                        type="number"
                        value={vesselForm.cargoQuantity}
                        onChange={(e) => setVesselForm({ ...vesselForm, cargoQuantity: e.target.value })}
                        placeholder="50000"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="layCan">Laycan Period</Label>
                      <Input
                        id="layCan"
                        value={vesselForm.layCan}
                        onChange={(e) => setVesselForm({ ...vesselForm, layCan: e.target.value })}
                        placeholder="15-20 Apr 2024"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="nominatedDate">Nomination Date</Label>
                    <Input
                      id="nominatedDate"
                      type="date"
                      value={vesselForm.nominatedDate}
                      onChange={(e) => setVesselForm({ ...vesselForm, nominatedDate: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit">Nominate Vessel</Button>
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Vessel List */}
          <Card>
            <CardHeader>
              <CardTitle>Vessel Nominations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vessel ID</TableHead>
                    <TableHead>Vessel Name</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Cargo (MT)</TableHead>
                    <TableHead>Laycan</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead>NOR</TableHead>
                    <TableHead>Approval</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vessels.map((vessel) => (
                    <TableRow key={vessel.id}>
                      <TableCell className="font-medium">{vessel.id}</TableCell>
                      <TableCell>{vessel.vesselName}</TableCell>
                      <TableCell>{vessel.supplier}</TableCell>
                      <TableCell>{Number(vessel.cargoQuantity).toLocaleString()}</TableCell>
                      <TableCell>{vessel.layCan}</TableCell>
                      <TableCell>
                        {vessel.eta ? new Date(vessel.eta).toLocaleDateString() : "TBA"}
                      </TableCell>
                      <TableCell>{getNorBadge(vessel.nor)}</TableCell>
                      <TableCell>{getApprovalBadge(vessel.approvalStatus)}</TableCell>
                      <TableCell>{getStatusBadge(vessel.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-primary">
                            View
                          </Button>
                          {vessel.approvalStatus === "pending" && (
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              Approve
                            </Button>
                          )}
                          {vessel.approvalStatus === "approved" && vessel.status === "nominated" && (
                            <Button variant="ghost" size="sm" className="text-green-600">
                              Notify
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