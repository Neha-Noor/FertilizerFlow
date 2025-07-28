import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Plus, Clock, Factory, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Scheduling() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    factoryName: "",
    fertilizerType: "",
    productionTarget: "",
    startDate: "",
    endDate: "",
    shift: "",
    priority: "",
    notes: "",
  });

  const schedules = [
    {
      id: 1,
      factoryName: "PUFF Factory - Chittagong",
      fertilizerType: "Urea",
      productionTarget: 500,
      startDate: "2024-01-16",
      endDate: "2024-01-20",
      shift: "Day Shift",
      priority: "high",
      status: "scheduled",
      progress: 0,
    },
    {
      id: 2,
      factoryName: "CFL Factory - Fenchuganj",
      fertilizerType: "TSP",
      productionTarget: 300,
      startDate: "2024-01-15",
      endDate: "2024-01-18",
      shift: "Night Shift",
      priority: "medium",
      status: "in-progress",
      progress: 45,
    },
    {
      id: 3,
      factoryName: "JFCL Factory - Ghorashal",
      fertilizerType: "DAP",
      productionTarget: 400,
      startDate: "2024-01-14",
      endDate: "2024-01-17",
      shift: "Day Shift",
      priority: "high",
      status: "completed",
      progress: 100,
    },
  ];

  const metrics = [
    {
      title: "Active Schedules",
      value: schedules.filter(s => s.status === "scheduled" || s.status === "in-progress").length,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Factories Running",
      value: schedules.filter(s => s.status === "in-progress").length,
      icon: Factory,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "High Priority",
      value: schedules.filter(s => s.priority === "high" && s.status !== "completed").length,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Completion Rate",
      value: `${Math.round((schedules.filter(s => s.status === "completed").length / schedules.length) * 100)}%`,
      icon: CalendarIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "delayed":
        return <Badge className="bg-red-100 text-red-800">Delayed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating production schedule:", scheduleForm);
    setDialogOpen(false);
    setScheduleForm({
      factoryName: "",
      fertilizerType: "",
      productionTarget: "",
      startDate: "",
      endDate: "",
      shift: "",
      priority: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header title="Production Scheduling Panel" />
        
        <main className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Manage and coordinate production schedules across all BCIC factories
            </p>
          </div>

          {/* Scheduling Metrics */}
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

          {/* Schedule Creation and Calendar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Production Schedules</CardTitle>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="h-4 w-4 mr-2" />
                        New Schedule
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create Production Schedule</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="factoryName">Factory</Label>
                            <Select onValueChange={(value) => setScheduleForm({ ...scheduleForm, factoryName: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select factory" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="PUFF Factory - Chittagong">PUFF Factory - Chittagong</SelectItem>
                                <SelectItem value="CFL Factory - Fenchuganj">CFL Factory - Fenchuganj</SelectItem>
                                <SelectItem value="JFCL Factory - Ghorashal">JFCL Factory - Ghorashal</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="fertilizerType">Fertilizer Type</Label>
                            <Select onValueChange={(value) => setScheduleForm({ ...scheduleForm, fertilizerType: value })}>
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
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="productionTarget">Production Target (MT)</Label>
                            <Input
                              id="productionTarget"
                              type="number"
                              value={scheduleForm.productionTarget}
                              onChange={(e) => setScheduleForm({ ...scheduleForm, productionTarget: e.target.value })}
                              placeholder="500"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="shift">Shift</Label>
                            <Select onValueChange={(value) => setScheduleForm({ ...scheduleForm, shift: value })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select shift" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Day Shift">Day Shift (6AM - 6PM)</SelectItem>
                                <SelectItem value="Night Shift">Night Shift (6PM - 6AM)</SelectItem>
                                <SelectItem value="Double Shift">Double Shift (24 Hours)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                              id="startDate"
                              type="date"
                              value={scheduleForm.startDate}
                              onChange={(e) => setScheduleForm({ ...scheduleForm, startDate: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                              id="endDate"
                              type="date"
                              value={scheduleForm.endDate}
                              onChange={(e) => setScheduleForm({ ...scheduleForm, endDate: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="priority">Priority Level</Label>
                          <Select onValueChange={(value) => setScheduleForm({ ...scheduleForm, priority: value })}>
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

                        <div>
                          <Label htmlFor="notes">Notes</Label>
                          <Textarea
                            id="notes"
                            value={scheduleForm.notes}
                            onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
                            placeholder="Additional notes or special instructions..."
                            rows={3}
                          />
                        </div>

                        <div className="flex space-x-4">
                          <Button type="submit">Create Schedule</Button>
                          <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schedules.map((schedule) => (
                      <div key={schedule.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{schedule.factoryName}</h4>
                            <p className="text-sm text-gray-600">
                              {schedule.fertilizerType} - {schedule.productionTarget} MT
                            </p>
                            <p className="text-sm text-gray-600">{schedule.shift}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getPriorityBadge(schedule.priority)}
                            {getStatusBadge(schedule.status)}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-500">Start Date</p>
                            <p className="font-medium text-gray-900">
                              {new Date(schedule.startDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">End Date</p>
                            <p className="font-medium text-gray-900">
                              {new Date(schedule.endDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{schedule.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                schedule.status === "completed" ? "bg-green-500" : 
                                schedule.status === "in-progress" ? "bg-blue-500" : "bg-gray-400"
                              }`}
                              style={{ width: `${schedule.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-primary">
                            View Details
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          {schedule.status === "scheduled" && (
                            <Button variant="ghost" size="sm" className="text-green-600">
                              Start Production
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Production Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                  
                  {selectedDate && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">
                        {format(selectedDate, "PPPP")}
                      </h4>
                      <p className="text-sm text-gray-600">
                        No scheduled productions for this date.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Emergency Schedule</div>
                    <div className="text-sm text-gray-600">Create urgent production schedule</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Maintenance Window</div>
                    <div className="text-sm text-gray-600">Schedule factory maintenance</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="text-left">
                    <div className="font-medium">Capacity Planning</div>
                    <div className="text-sm text-gray-600">Optimize production capacity</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
