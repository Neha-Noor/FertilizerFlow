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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, FileText, Eye, Download, Upload } from "lucide-react";

export default function TenderManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tenderForm, setTenderForm] = useState({
    tenderTitle: "",
    tenderType: "",
    estimatedValue: "",
    submissionDeadline: "",
    openingDate: "",
    description: "",
  });

  const tenders = [
    {
      id: "TEN-2024-001",
      title: "Urea Import - 50,000 MT",
      type: "International",
      estimatedValue: "2,500,000,000",
      status: "evaluation",
      submissions: 5,
      floatedDate: "2024-01-10",
      submissionDeadline: "2024-02-15",
      openingDate: "2024-02-16",
    },
    {
      id: "TEN-2024-002", 
      title: "Raw Material Procurement",
      type: "Domestic",
      estimatedValue: "500,000,000",
      status: "floating",
      submissions: 0,
      floatedDate: "2024-01-12",
      submissionDeadline: "2024-02-20",
      openingDate: "2024-02-21",
    },
    {
      id: "TEN-2024-003",
      title: "Equipment Maintenance Services",
      type: "Domestic",
      estimatedValue: "100,000,000",
      status: "awarded",
      submissions: 8,
      floatedDate: "2023-12-15",
      submissionDeadline: "2024-01-20",
      openingDate: "2024-01-21",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "floating":
        return <Badge className="bg-blue-100 text-blue-800">Floating</Badge>;
      case "evaluation":
        return <Badge className="bg-yellow-100 text-yellow-800">Under Evaluation</Badge>;
      case "awarded":
        return <Badge className="bg-green-100 text-green-800">Awarded</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating tender:", tenderForm);
    setDialogOpen(false);
    setTenderForm({
      tenderTitle: "",
      tenderType: "",
      estimatedValue: "",
      submissionDeadline: "",
      openingDate: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header title="Tender Management" />
        
        <main className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Manage tender processes including floating, opening, evaluation, and approval workflows with transparency and competitiveness
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Float New Tender
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Float New Tender</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="tenderTitle">Tender Title</Label>
                    <Input
                      id="tenderTitle"
                      value={tenderForm.tenderTitle}
                      onChange={(e) => setTenderForm({ ...tenderForm, tenderTitle: e.target.value })}
                      placeholder="Urea Import - 50,000 MT"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tenderType">Tender Type</Label>
                      <Select onValueChange={(value) => setTenderForm({ ...tenderForm, tenderType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tender type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="International">International</SelectItem>
                          <SelectItem value="Domestic">Domestic</SelectItem>
                          <SelectItem value="Limited">Limited</SelectItem>
                          <SelectItem value="Single Source">Single Source</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="estimatedValue">Estimated Value (BDT)</Label>
                      <Input
                        id="estimatedValue"
                        type="number"
                        value={tenderForm.estimatedValue}
                        onChange={(e) => setTenderForm({ ...tenderForm, estimatedValue: e.target.value })}
                        placeholder="2500000000"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="submissionDeadline">Submission Deadline</Label>
                      <Input
                        id="submissionDeadline"
                        type="datetime-local"
                        value={tenderForm.submissionDeadline}
                        onChange={(e) => setTenderForm({ ...tenderForm, submissionDeadline: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="openingDate">Opening Date</Label>
                      <Input
                        id="openingDate"
                        type="datetime-local"
                        value={tenderForm.openingDate}
                        onChange={(e) => setTenderForm({ ...tenderForm, openingDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Tender Description</Label>
                    <Textarea
                      id="description"
                      value={tenderForm.description}
                      onChange={(e) => setTenderForm({ ...tenderForm, description: e.target.value })}
                      placeholder="Detailed tender specifications and requirements..."
                      rows={4}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit">Float Tender</Button>
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Documents
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Tender Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Tenders</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {tenders.filter(t => t.status === "floating" || t.status === "evaluation").length}
                    </p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Under Evaluation</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {tenders.filter(t => t.status === "evaluation").length}
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {tenders.reduce((sum, t) => sum + t.submissions, 0)}
                    </p>
                  </div>
                  <Upload className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Awarded</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {tenders.filter(t => t.status === "awarded").length}
                    </p>
                  </div>
                  <Download className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tender List */}
          <Card>
            <CardHeader>
              <CardTitle>Current Tenders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tender ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Estimated Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenders.map((tender) => (
                    <TableRow key={tender.id}>
                      <TableCell className="font-medium">{tender.id}</TableCell>
                      <TableCell>{tender.title}</TableCell>
                      <TableCell>{tender.type}</TableCell>
                      <TableCell>৳{Number(tender.estimatedValue).toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(tender.status)}</TableCell>
                      <TableCell>{tender.submissions}</TableCell>
                      <TableCell>
                        {new Date(tender.submissionDeadline).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-primary">
                            View
                          </Button>
                          {tender.status === "floating" && (
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              Open
                            </Button>
                          )}
                          {tender.status === "evaluation" && (
                            <Button variant="ghost" size="sm" className="text-green-600">
                              Evaluate
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