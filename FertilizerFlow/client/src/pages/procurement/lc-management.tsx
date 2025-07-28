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
import { CreditCard, Plus, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function LCManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lcForm, setLcForm] = useState({
    contractId: "",
    lcAmount: "",
    lcType: "",
    beneficiary: "",
    bankName: "",
    expiryDate: "",
    shipmentDate: "",
  });

  const letterOfCredits = [
    {
      id: "LC-2024-001",
      contractId: "CON-2024-001",
      lcNumber: "LC001234567890",
      amount: "2,450,000,000",
      beneficiary: "Global Fertilizer Ltd.",
      bankName: "Standard Chartered Bank",
      status: "active",
      financeCheck: "approved",
      purchaseVetting: "approved",
      openingDate: "2024-01-25",
      expiryDate: "2024-06-25",
      shipmentDate: "2024-04-15",
    },
    {
      id: "LC-2024-002",
      contractId: "CON-2024-002",
      lcNumber: "LC001234567891",
      amount: "480,000,000",
      beneficiary: "Agri-Chem Industries",
      bankName: "Dutch-Bangla Bank",
      status: "pending",
      financeCheck: "pending",
      purchaseVetting: "approved",
      openingDate: "",
      expiryDate: "2024-07-20",
      shipmentDate: "2024-05-10",
    },
    {
      id: "LC-2024-003",
      contractId: "CON-2024-003",
      lcNumber: "LC001234567892",
      amount: "95,000,000",
      beneficiary: "Tech Solutions BD",
      bankName: "BRAC Bank",
      status: "initiated",
      financeCheck: "checking",
      purchaseVetting: "pending",
      openingDate: "",
      expiryDate: "2024-08-30",
      shipmentDate: "2024-06-15",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "initiated":
        return <Badge className="bg-blue-100 text-blue-800">Initiated</Badge>;
      case "expired":
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getCheckBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "checking":
        return <Badge className="bg-blue-100 text-blue-800">Checking</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Initiating LC:", lcForm);
    setDialogOpen(false);
    setLcForm({
      contractId: "",
      lcAmount: "",
      lcType: "",
      beneficiary: "",
      bankName: "",
      expiryDate: "",
      shipmentDate: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header title="Letter of Credit (L/C) Management" />
        
        <main className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Manage Letter of Credit processes including initiation, Finance Division checking, Purchase Division vetting, and compliance verification
            </p>
          </div>

          {/* LC Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total L/Cs</p>
                    <p className="text-3xl font-bold text-gray-900">{letterOfCredits.length}</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {letterOfCredits.filter(lc => lc.status === "active").length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Finance</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {letterOfCredits.filter(lc => lc.financeCheck === "pending" || lc.financeCheck === "checking").length}
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
                    <p className="text-sm font-medium text-gray-600">Total Value</p>
                    <p className="text-xl font-bold text-gray-900">
                      ৳{letterOfCredits.reduce((sum, lc) => sum + Number(lc.amount), 0).toLocaleString()}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Initiate New LC */}
          <div className="mb-6">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Initiate L/C Opening
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Initiate Letter of Credit Opening</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contractId">Contract ID</Label>
                      <Select onValueChange={(value) => setLcForm({ ...lcForm, contractId: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select contract" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CON-2024-004">CON-2024-004</SelectItem>
                          <SelectItem value="CON-2024-005">CON-2024-005</SelectItem>
                          <SelectItem value="CON-2024-006">CON-2024-006</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="lcAmount">L/C Amount (BDT)</Label>
                      <Input
                        id="lcAmount"
                        type="number"
                        value={lcForm.lcAmount}
                        onChange={(e) => setLcForm({ ...lcForm, lcAmount: e.target.value })}
                        placeholder="2450000000"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="lcType">L/C Type</Label>
                      <Select onValueChange={(value) => setLcForm({ ...lcForm, lcType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select L/C type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sight">Sight L/C</SelectItem>
                          <SelectItem value="usance">Usance L/C</SelectItem>
                          <SelectItem value="transferable">Transferable L/C</SelectItem>
                          <SelectItem value="standby">Standby L/C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="beneficiary">Beneficiary</Label>
                      <Input
                        id="beneficiary"
                        value={lcForm.beneficiary}
                        onChange={(e) => setLcForm({ ...lcForm, beneficiary: e.target.value })}
                        placeholder="Supplier company name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bankName">Opening Bank</Label>
                    <Select onValueChange={(value) => setLcForm({ ...lcForm, bankName: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Standard Chartered Bank">Standard Chartered Bank</SelectItem>
                        <SelectItem value="Dutch-Bangla Bank">Dutch-Bangla Bank</SelectItem>
                        <SelectItem value="BRAC Bank">BRAC Bank</SelectItem>
                        <SelectItem value="City Bank">City Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        type="date"
                        value={lcForm.expiryDate}
                        onChange={(e) => setLcForm({ ...lcForm, expiryDate: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="shipmentDate">Latest Shipment Date</Label>
                      <Input
                        id="shipmentDate"
                        type="date"
                        value={lcForm.shipmentDate}
                        onChange={(e) => setLcForm({ ...lcForm, shipmentDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit">Initiate L/C</Button>
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* LC List */}
          <Card>
            <CardHeader>
              <CardTitle>Letter of Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>L/C ID</TableHead>
                    <TableHead>L/C Number</TableHead>
                    <TableHead>Beneficiary</TableHead>
                    <TableHead>Amount (BDT)</TableHead>
                    <TableHead>Bank</TableHead>
                    <TableHead>Finance Check</TableHead>
                    <TableHead>Purchase Vetting</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {letterOfCredits.map((lc) => (
                    <TableRow key={lc.id}>
                      <TableCell className="font-medium">{lc.id}</TableCell>
                      <TableCell>{lc.lcNumber}</TableCell>
                      <TableCell>{lc.beneficiary}</TableCell>
                      <TableCell>৳{Number(lc.amount).toLocaleString()}</TableCell>
                      <TableCell>{lc.bankName}</TableCell>
                      <TableCell>{getCheckBadge(lc.financeCheck)}</TableCell>
                      <TableCell>{getCheckBadge(lc.purchaseVetting)}</TableCell>
                      <TableCell>{getStatusBadge(lc.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-primary">
                            View
                          </Button>
                          {lc.financeCheck === "pending" && (
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              Check
                            </Button>
                          )}
                          {lc.purchaseVetting === "pending" && lc.financeCheck === "approved" && (
                            <Button variant="ghost" size="sm" className="text-green-600">
                              Vet
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