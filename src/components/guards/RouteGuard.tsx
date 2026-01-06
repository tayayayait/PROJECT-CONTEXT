import { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import type { Role } from "@/lib/rbac";
import { useCurrentRole, canAccessRoute } from "@/lib/rbac";
import { ROUTE_IDS, getRouteById } from "@/lib/routes";

interface RouteGuardProps {
  allowedRoles?: Role[];
  children: ReactNode;
}

export function RouteGuard({ allowedRoles, children }: RouteGuardProps) {
  const role = useCurrentRole();
  const location = useLocation();

  if (canAccessRoute(role, allowedRoles)) {
    return <>{children}</>;
  }

  const dashboardPath = getRouteById(ROUTE_IDS.dashboard)?.path ?? "/";

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md rounded-xl border bg-card p-6 text-center">
        <h2 className="text-xl font-semibold text-foreground">접근 권한이 없습니다</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          현재 역할로는 이 페이지를 볼 수 없습니다. ({location.pathname})
        </p>
        <Link
          to={dashboardPath}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          대시보드로 이동
        </Link>
      </div>
    </div>
  );
}

