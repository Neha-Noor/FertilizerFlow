import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import ReceivingDemand from "@/pages/fertilizer/receiving-demand";
import ProductionPlanning from "@/pages/fertilizer/production-planning";
import MoaNotifications from "@/pages/fertilizer/moa-notifications";
import ArrangementFormat from "@/pages/fertilizer/arrangement-format";
import ProductionDashboard from "@/pages/production/production-dashboard";
import BufferStock from "@/pages/production/buffer-stock";
import Scheduling from "@/pages/production/scheduling";
import AnnualProcurementPlan from "@/pages/procurement/annual-procurement-plan";
import TenderManagement from "@/pages/procurement/tender-management";
import ContractAward from "@/pages/procurement/contract-award";
import LCManagement from "@/pages/procurement/lc-management";
import ShipmentCoordination from "@/pages/procurement/shipment-coordination";
import ArrivalNotifications from "@/pages/procurement/arrival-notifications";
import ProcurementDashboard from "@/pages/procurement/procurement-dashboard";

function Router() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/fertilizer/receiving-demand" component={ReceivingDemand} />
      <ProtectedRoute path="/fertilizer/production-planning" component={ProductionPlanning} />
      <ProtectedRoute path="/fertilizer/moa-notifications" component={MoaNotifications} />
      <ProtectedRoute path="/fertilizer/arrangement-format" component={ArrangementFormat} />
      <ProtectedRoute path="/production/production-dashboard" component={ProductionDashboard} />
      <ProtectedRoute path="/production/buffer-stock" component={BufferStock} />
      <ProtectedRoute path="/production/scheduling" component={Scheduling} />
      <ProtectedRoute path="/procurement" component={ProcurementDashboard} />
      <ProtectedRoute path="/procurement/annual-procurement-plan" component={AnnualProcurementPlan} />
      <ProtectedRoute path="/procurement/tender-management" component={TenderManagement} />
      <ProtectedRoute path="/procurement/contract-award" component={ContractAward} />
      <ProtectedRoute path="/procurement/lc-management" component={LCManagement} />
      <ProtectedRoute path="/procurement/shipment-coordination" component={ShipmentCoordination} />
      <ProtectedRoute path="/procurement/arrival-notifications" component={ArrivalNotifications} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
