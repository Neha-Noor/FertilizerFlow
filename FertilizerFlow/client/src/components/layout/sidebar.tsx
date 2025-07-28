import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  ChartPie, 
  Sprout, 
  Factory, 
  ShoppingCart, 
  Truck, 
  ClipboardCheck, 
  BarChart3, 
  ChevronDown,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAuth } from "@/hooks/use-auth";
import bangladeshLogoPath from "@assets/bangladesh-govt-republic-of-bangladesh-logo-png_seeklogo-406974_1753686575776.png";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [location] = useLocation();
  const { user } = useAuth();
  const [demandOpen, setDemandOpen] = useState(false);
  const [productionOpen, setProductionOpen] = useState(false);
  const [procurementOpen, setProcurementOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: ChartPie },
    {
      name: "Demand Generation",
      icon: Sprout,
      children: [
        { name: "Receiving Yearly Demand", href: "/fertilizer/receiving-demand" },
        { name: "Production Planning", href: "/fertilizer/production-planning" },
        { name: "MOA Notifications", href: "/fertilizer/moa-notifications" },
        { name: "Arrangement Format", href: "/fertilizer/arrangement-format" },
      ],
    },
    {
      name: "Production",
      icon: Factory,
      children: [
        { name: "Production Dashboard", href: "/production/production-dashboard" },
        { name: "Buffer Stock Updates", href: "/production/buffer-stock" },
        { name: "Scheduling Panel", href: "/production/scheduling" },
      ],
    },
    {
      name: "Procurement",
      icon: ShoppingCart,
      children: [
        { name: "Procurement Dashboard", href: "/procurement" },
        { name: "Annual Procurement Plan", href: "/procurement/annual-procurement-plan" },
        { name: "Tender Management", href: "/procurement/tender-management" },
        { name: "Contract Award", href: "/procurement/contract-award" },
        { name: "L/C Management", href: "/procurement/lc-management" },
        { name: "Shipment Coordination", href: "/procurement/shipment-coordination" },
        { name: "Arrival Notifications", href: "/procurement/arrival-notifications" },
      ],
    },
    { name: "Distribution", href: "/distribution", icon: Truck },
    { name: "Quality Control", href: "/quality-control", icon: ClipboardCheck },
    { name: "Reports", href: "/reports", icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}>
        
        {/* Logo Section */}
        <div className="flex items-center justify-center h-16 px-4 bg-primary">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <img src={bangladeshLogoPath} alt="Fertilizer Management System" className="w-6 h-6" />
            </div>
            <span className="text-white font-semibold text-lg">FMS</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4 space-y-2">
          {navigation.map((item) => {
            if (item.children) {
              const isExpanded = item.name === "Demand Generation" ? demandOpen : 
                               item.name === "Production" ? productionOpen : procurementOpen;
              const setExpanded = item.name === "Demand Generation" ? setDemandOpen : 
                                item.name === "Production" ? setProductionOpen : setProcurementOpen;
              
              return (
                <Collapsible key={item.name} open={isExpanded} onOpenChange={setExpanded}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.name}
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-8 space-y-1">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-sm ${
                            location === child.href ? "bg-primary text-white hover:bg-primary/90" : "hover:bg-gray-50"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {child.name}
                        </Button>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            }

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    location === item.href ? "bg-primary text-white hover:bg-primary/90" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.fullName?.charAt(0) || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.fullName || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
