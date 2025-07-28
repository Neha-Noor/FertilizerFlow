import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, TrendingUp, Clock, CheckCircle, Ship, CreditCard } from "lucide-react";

export default function ProcurementDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const metrics = [
    {
      title: "Total Contracts",
      value: "45",
      change: "+5",
      changeType: "positive",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Tenders",
      value: "12",
      change: "+2",
      changeType: "positive",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Approvals",
      value: "8",
      change: "-3",
      changeType: "negative",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Completed Deliveries",
      value: "156",
      change: "+12",
      changeType: "positive",
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const recentTenders = [
    {
      id: "TEN-2024-001",
      title: "Urea Import - 50,000 MT",
      status: "evaluation",
      submissions: 5,
      deadline: "2024-02-15",
    },
    {
      id: "TEN-2024-002",
      title: "Raw Material Procurement",
      status: "floating",
      submissions: 0,
      deadline: "2024-02-20",
    },
    {
      id: "TEN-2024-003",
      title: "Equipment Maintenance",
      status: "awarded",
      submissions: 8,
      deadline: "2024-01-20",
    },
  ];

  const upcomingArrivals = [
    {
      vesselName: "MV Fertilizer Express",
      port: "Chattogram",
      eta: "2024-04-18",
      cargo: "50,000 MT",
      status: "en-route",
    },
    {
      vesselName: "MV Agri Carrier",
      port: "Mongla",
      eta: "2024-05-12",
      cargo: "25,000 MT",
      status: "scheduled",
    },
  ];

  const activeLCs = [
    {
      id: "LC-2024-001",
      beneficiary: "Global Fertilizer Ltd.",
      amount: "2,450,000,000",
      status: "active",
      expiry: "2024-06-25",
    },
    {
      id: "LC-2024-002",
      beneficiary: "Agri-Chem Industries",
      amount: "480,000,000",
      status: "pending",
      expiry: "2024-07-20",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "evaluation":
        return <Badge className="bg-blue-100 text-blue-800">Evaluation</Badge>;
      case "floating":
        return <Badge className="bg-purple-100 text-purple-800">Floating</Badge>;
      case "awarded":
        return <Badge className="bg-green-100 text-green-800">Awarded</Badge>;
      case "en-route":
        return <Badge className="bg-blue-100 text-blue-800">En Route</Badge>;
      case "scheduled":
        return <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header title="Procurement Dashboard" />
        
        <main className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Comprehensive overview of procurement activities including tenders, contracts, shipments, and financial instruments
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                      <p className={`text-sm ${
                        metric.changeType === "positive" ? "text-green-600" : "text-red-600"
                      }`}>
                        {metric.change} from last month
                      </p>
                    </div>
                    <div className={`p-3 ${metric.bgColor} rounded-full`}>
                      <metric.icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dashboard Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Tenders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Recent Tenders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTenders.map((tender) => (
                    <div key={tender.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{tender.title}</h4>
                        <p className="text-sm text-gray-600">{tender.id} • {tender.submissions} submissions</p>
                        <p className="text-xs text-gray-500">Deadline: {new Date(tender.deadline).toLocaleDateString()}</p>
                      </div>
                      <div>
                        {getStatusBadge(tender.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Arrivals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Ship className="h-5 w-5 mr-2" />
                  Upcoming Vessel Arrivals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingArrivals.map((arrival, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{arrival.vesselName}</h4>
                        <p className="text-sm text-gray-600">{arrival.port} • {arrival.cargo}</p>
                        <p className="text-xs text-gray-500">ETA: {new Date(arrival.eta).toLocaleDateString()}</p>
                      </div>
                      <div>
                        {getStatusBadge(arrival.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active L/Cs */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Active Letters of Credit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>L/C ID</TableHead>
                    <TableHead>Beneficiary</TableHead>
                    <TableHead>Amount (BDT)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expiry Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeLCs.map((lc) => (
                    <TableRow key={lc.id}>
                      <TableCell className="font-medium">{lc.id}</TableCell>
                      <TableCell>{lc.beneficiary}</TableCell>
                      <TableCell>৳{Number(lc.amount).toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(lc.status)}</TableCell>
                      <TableCell>{new Date(lc.expiry).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Create Procurement Plan</h3>
                <p className="text-sm text-gray-600">Initiate new annual procurement planning</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Float New Tender</h3>
                <p className="text-sm text-gray-600">Launch tender process for suppliers</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Ship className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Track Shipments</h3>
                <p className="text-sm text-gray-600">Monitor vessel arrivals and cargo</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}