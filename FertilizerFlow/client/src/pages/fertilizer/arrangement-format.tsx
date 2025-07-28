import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Download, Upload, FileText } from "lucide-react";

export default function ArrangementFormat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    documentType: "",
    department: "",
    title: "",
    description: "",
  });

  const documentTemplates = [
    {
      id: 1,
      name: "Production Planning Format",
      type: "Production",
      description: "Standard format for annual production planning documentation",
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      name: "Import Procurement Format",
      type: "Import",
      description: "Format for import and procurement planning documents",
      lastUpdated: "2024-01-12",
    },
    {
      id: 3,
      name: "Distribution Planning Format",
      type: "Distribution",
      description: "Standard format for distribution planning and logistics",
      lastUpdated: "2024-01-10",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating arrangement format:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="lg:pl-64">
        <Header title="Online Arrangement Format" />
        
        <main className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Manage standardized formats for production, import, procurement, and distribution planning
            </p>
          </div>

          {/* Document Creation Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Arrangement Document</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="documentType">Document Type</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, documentType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Production Planning">Production Planning</SelectItem>
                        <SelectItem value="Import Planning">Import Planning</SelectItem>
                        <SelectItem value="Procurement Planning">Procurement Planning</SelectItem>
                        <SelectItem value="Distribution Planning">Distribution Planning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, department: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Production">Production Department</SelectItem>
                        <SelectItem value="Procurement">Procurement Department</SelectItem>
                        <SelectItem value="Distribution">Distribution Department</SelectItem>
                        <SelectItem value="Quality Control">Quality Control</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="title">Document Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter document title"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter document description"
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      Create Document
                    </Button>
                    <Button type="button" variant="outline">
                      Save Draft
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Document</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Drag and drop your files here, or click to browse
                  </p>
                  <Button variant="outline">
                    Choose Files
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: PDF, DOC, DOCX (Max 10MB)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Standard Document Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documentTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Updated: {template.lastUpdated}
                      </span>
                      <Button variant="outline" size="sm">
                        Use Template
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Documents */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Annual Production Plan 2024</p>
                      <p className="text-sm text-gray-600">Production Department • Created 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">View</Button>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Import Requirements Q1 2024</p>
                      <p className="text-sm text-gray-600">Procurement Department • Created 5 days ago</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">View</Button>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
