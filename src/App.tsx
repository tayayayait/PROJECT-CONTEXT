import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Upload from "./pages/Upload";
import VectorSearch from "./pages/VectorSearch";
import LogEditor from "./pages/LogEditor";
import Templates from "./pages/Templates";
import TemplateMapping from "./pages/TemplateMapping";
import Approvals from "./pages/Approvals";
import Preview from "./pages/Preview";
import Permissions from "./pages/admin/Permissions";
import Settings from "./pages/admin/Settings";
import Audit from "./pages/admin/Audit";
import NotFound from "./pages/NotFound";
import { RouteGuard } from "@/components/guards/RouteGuard";
import { appRoutes, getRouteById, ROUTE_IDS } from "@/lib/routes";
import type { RouteId } from "@/lib/routes";
import { DocumentStoreProvider } from "@/contexts/DocumentStoreContext";

const queryClient = new QueryClient();

const routeElements: Partial<Record<RouteId, JSX.Element>> = {
  [ROUTE_IDS.dashboard]: <Dashboard />,
  [ROUTE_IDS.projects]: <Projects />,
  [ROUTE_IDS.upload]: <Upload />,
  [ROUTE_IDS.search]: <VectorSearch />,
  [ROUTE_IDS.logEditor]: <LogEditor />,
  [ROUTE_IDS.templates]: <Templates />,
  [ROUTE_IDS.templateMapping]: <TemplateMapping />,
  [ROUTE_IDS.approvals]: <Approvals />,
  [ROUTE_IDS.preview]: <Preview />,
  [ROUTE_IDS.adminPermissions]: <Permissions />,
  [ROUTE_IDS.adminSettings]: <Settings />,
  [ROUTE_IDS.adminAudit]: <Audit />,
};

const App = () => {
  const dashboardPath = getRouteById(ROUTE_IDS.dashboard)?.path ?? "/";
  const routesWithElements = appRoutes.filter((route) => routeElements[route.id]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <DocumentStoreProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to={dashboardPath} replace />} />
              {routesWithElements.map((route) => {
                const element = routeElements[route.id]!;
                return (
                  <Route
                    key={route.id}
                    path={route.path}
                    element={<RouteGuard allowedRoles={route.roles}>{element}</RouteGuard>}
                  />
                );
              })}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DocumentStoreProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

