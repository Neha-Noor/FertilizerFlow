import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Eye, Archive, AlertCircle } from "lucide-react";

export default function MoaNotifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Urgent: Fertilizer Demand Update for Boro Season",
      message: "Ministry of Agriculture has updated the fertilizer demand requirements for the upcoming Boro season. Please review and update production schedules accordingly.",
      type: "urgent",
      status: "unread",
      date: "2024-01-15 10:30 AM",
      from: "Ministry of Agriculture",
    },
    {
      id: 2,
      title: "New Policy Guidelines for Fertilizer Distribution",
      message: "Updated guidelines for fertilizer distribution across regions have been issued. All regional managers must acknowledge receipt.",
      type: "policy",
      status: "read",
      date: "2024-01-14 2:15 PM",
      from: "MOA Policy Division",
    },
    {
      id: 3,
      title: "Quality Standards Update",
      message: "Revised quality standards for TSP and DAP fertilizers effective from February 1, 2024.",
      type: "quality",
      status: "unread",
      date: "2024-01-13 9:00 AM",
      from: "MOA Quality Control",
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case "policy":
        return <Bell className="h-5 w-5 text-blue-600" />;
      case "quality":
        return <Eye className="h-5 w-5 text-yellow-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case "policy":
        return <Badge className="bg-blue-100 text-blue-800">Policy</Badge>;
      case "quality":
        return <Badge className="bg-yellow-100 text-yellow-800">Quality</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header title="MOA Notifications" />
        
        <main className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Receive and manage notifications from Ministry of Agriculture
            </p>
          </div>

          {/* Notification Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Unread Notifications</p>
                    <p className="text-2xl font-bold text-gray-900">2</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100">
                    <Bell className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                    <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100">
                    <Archive className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Archived</p>
                    <p className="text-2xl font-bold text-gray-900">15</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Notifications
                <Button variant="outline" size="sm">
                  Mark All as Read
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 rounded-lg border transition-colors ${
                      notification.status === "unread" ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {notification.title}
                          </h4>
                          <div className="flex items-center space-x-2">
                            {getTypeBadge(notification.type)}
                            {notification.status === "unread" && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            <span className="font-medium">From:</span> {notification.from} • {notification.date}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="text-primary">
                              View Details
                            </Button>
                            <Button variant="ghost" size="sm">
                              Archive
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
