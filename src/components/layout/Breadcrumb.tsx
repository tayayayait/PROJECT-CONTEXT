import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { getBreadcrumbs, getRouteById, ROUTE_IDS } from "@/lib/routes";

export function Breadcrumb() {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);
  const homePath = getRouteById(ROUTE_IDS.dashboard)?.path ?? "/";

  if (breadcrumbs.length === 0) return null;

  return (
    <nav aria-label="현재 위치" className="flex items-center text-sm text-muted-foreground mb-4">
      <Link to={homePath} className="flex items-center hover:text-foreground transition-colors" aria-label="홈">
        <Home className="h-4 w-4" />
      </Link>

      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return (
          <div key={crumb.id} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-2" />
            {isLast ? (
              <span className="text-foreground font-medium" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link to={crumb.path} className="hover:text-foreground transition-colors">
                {crumb.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

