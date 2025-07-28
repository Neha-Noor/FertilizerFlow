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
import { Award, FileCheck, Bell, DollarSign } from "lucide-react";

export default function ContractAward() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [awardForm, setAwardForm] = useState({
    tenderId: "",
    supplierId: "",
    supplierName: "",
    contractValue: "",
    performanceGuarantee: "",
    contractDuration: "",
  });

  const contracts = [
    {
      id: "CON-2024-001",
      tenderId: "TEN-2024-001",
      supplierName: "Global Fertilizer Ltd.",
      contractValue: "2,450,000,000",
      noaIssued: true,
      pgSubmitted: true,
      pgVerified: true,
      contractSigned: true,
      status: "active",
      awardDate: "2024-01-20",
      pgAmount: "245,000,000",
      bankName: "Standard Chartered Bank",
    },
    {
      id: "CON-2024-002",
      tenderId: "TEN-2024-002",
      supplierName: "Agri-Chem Industries",
      contractValue: "480,000,000",
      noaIssued: true,
      pgSubmitted: true,
      pgVerified: false,
      contractSigned: false,
      status: "pg-verification",
      awardDate: "2024-01-22",
      pgAmount: "48,000,000",
      bankName: "Dutch-Bangla Bank",
    },
    {
      id: "CON-2024-003",
      tenderId: "TEN-2024-003",
      supplierName: "Tech Solutions BD",
      contractValue: "95,000,000",
      noaIssued: true,
      pgSubmitted: false,
      pgVerified: false,
      contractSigned: false,
      status: "awaiting-pg",
      awardDate: "2024-01-25",
      pgAmount: "9,500,000",
      bankName: "",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "pg-verification":
        return <Badge className="bg-yellow-100 text-yellow-800">PG Verification</Badge>;
      case "awaiting-pg":
        return <Badge className="bg-orange-100 text-orange-800">Awaiting PG</Badge>;
      case "noa-issued":
        return <Badge className="bg-blue-100 text-blue-800">NOA Issued</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Awarding contract:", awardForm);
    setDialogOpen(false);
    setAwardForm({
      tenderId: "",
      supplierId: "",
      supplierName: "",
      contractValue: "",
      performanceGuarantee: "",
      contractDuration: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header title="Contract Award Process" />
        
        <main className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Manage contract awards including NOA issuance, Performance Guarantee verification, and contract signing processes
            </p>
          </div>

          {/* Process Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Contracts</p>
                    <p className="text-3xl font-bold text-gray-900">{contracts.length}</p>
                  </div>
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Contracts</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {contracts.filter(c => c.status === "active").length}
                    </p>
                  </div>
                  <FileCheck className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending PG</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {contracts.filter(c => !c.pgVerified).length}
                    </p>
                  </div>
                  <Bell className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Value</p>
                    <p className="text-xl font-bold text-gray-900">
                      ৳{contracts.reduce((sum, c) => sum + Number(c.contractValue), 0).toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Award New Contract */}
          <div className="mb-6">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Award className="h-4 w-4 mr-2" />
                  Award New Contract
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Award Contract</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tenderId">Tender ID</Label>
                      <Select onValueChange={(value) => setAwardForm({ ...awardForm, tenderId: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TEN-2024-004">TEN-2024-004</SelectItem>
                          <SelectItem value="TEN-2024-005">TEN-2024-005</SelectItem>
                          <SelectItem value="TEN-2024-006">TEN-2024-006</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="supplierName">Supplier Name</Label>
                      <Input
                        id="supplierName"
                        value={awardForm.supplierName}
                        onChange={(e) => setAwardForm({ ...awardForm, supplierName: e.target.value })}
                        placeholder="Winning supplier name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contractValue">Contract Value (BDT)</Label>
                      <Input
                        id="contractValue"
                        type="number"
                        value={awardForm.contractValue}
                        onChange={(e) => setAwardForm({ ...awardForm, contractValue: e.target.value })}
                        placeholder="2450000000"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="performanceGuarantee">Performance Guarantee (BDT)</Label>
                      <Input
                        id="performanceGuarantee"
                        type="number"
                        value={awardForm.performanceGuarantee}
                        onChange={(e) => setAwardForm({ ...awardForm, performanceGuarantee: e.target.value })}
                        placeholder="245000000"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contractDuration">Contract Duration (Days)</Label>
                    <Input
                      id="contractDuration"
                      type="number"
                      value={awardForm.contractDuration}
                      onChange={(e) => setAwardForm({ ...awardForm, contractDuration: e.target.value })}
                      placeholder="365"
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit">Award Contract</Button>
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Contract List */}
          <Card>
            <CardHeader>
              <CardTitle>Current Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contract ID</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Value (BDT)</TableHead>
                    <TableHead>NOA</TableHead>
                    <TableHead>PG Status</TableHead>
                    <TableHead>Contract</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.id}</TableCell>
                      <TableCell>{contract.supplierName}</TableCell>
                      <TableCell>৳{Number(contract.contractValue).toLocaleString()}</TableCell>
                      <TableCell>
                        {contract.noaIssued ? (
                          <Badge className="bg-green-100 text-green-800">Issued</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {contract.pgVerified ? (
                          <Badge className="bg-green-100 text-green-800">Verified</Badge>
                        ) : contract.pgSubmitted ? (
                          <Badge className="bg-yellow-100 text-yellow-800">Submitted</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {contract.contractSigned ? (
                          <Badge className="bg-green-100 text-green-800">Signed</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(contract.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-primary">
                            View
                          </Button>
                          {!contract.pgVerified && contract.pgSubmitted && (
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              Verify PG
                            </Button>
                          )}
                          {contract.pgVerified && !contract.contractSigned && (
                            <Button variant="ghost" size="sm" className="text-green-600">
                              Sign Contract
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