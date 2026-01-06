import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getNavRoutes, getRouteById, matchRoute } from "@/lib/routes";
import { useCurrentRole, canAccessRoute } from "@/lib/rbac";

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const role = useCurrentRole();
  const currentRoute = matchRoute(location.pathname);

  const isActive = (routeId: string) => {
    let route = currentRoute;
    while (route) {
      if (route.id === routeId) return true;
      route = route.parentId ? getRouteById(route.parentId) : undefined;
    }
    return false;
  };

  const renderNavItem = (route: ReturnType<typeof getNavRoutes>[number]) => {
    const Icon = route.icon;
    const active = isActive(route.id);
    const allowed = canAccessRoute(role, route.roles);
    const visibility = route.menuVisibility ?? "hide";

    if (!allowed && visibility === "hide") return null;

    const disabled = !allowed && visibility === "disable";

    const linkContent = (
      <Link
        to={route.path}
        onClick={(event) => {
          if (disabled) event.preventDefault();
        }}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ease-ui group",
          active
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        {Icon && <Icon className={cn("h-5 w-5 flex-shrink-0", active && "text-primary")} />}
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{route.label}</span>
            {route.shortcut && (
              <kbd className="hidden lg:inline-flex h-5 items-center px-1.5 rounded bg-muted text-[10px] font-mono text-muted-foreground">
                {route.shortcut}
              </kbd>
            )}
          </>
        )}
      </Link>
    );

    const tooltipContent = (
      <TooltipContent side="right" className="flex items-center gap-2">
        <span>{route.label}</span>
        {route.shortcut && (
          <kbd className="h-5 items-center px-1.5 rounded bg-muted text-[10px] font-mono text-muted-foreground">
            {route.shortcut}
          </kbd>
        )}
        {disabled && <span className="text-xs text-muted-foreground">권한이 없습니다</span>}
      </TooltipContent>
    );

    if (collapsed) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          {tooltipContent}
        </Tooltip>
      );
    }

    if (disabled) {
      return (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="right">권한이 없습니다</TooltipContent>
        </Tooltip>
      );
    }

    return linkContent;
  };

  const coreNavItems = getNavRoutes("core");
  const adminNavItems = getNavRoutes("admin");
  const showAdminSection = adminNavItems.some((route) => {
    const allowed = canAccessRoute(role, route.roles);
    const visibility = route.menuVisibility ?? "hide";
    return allowed || visibility === "disable";
  });

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-200 ease-ui",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center h-16 px-4 border-b border-sidebar-border", collapsed && "justify-center")}>
        {collapsed ? (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">D</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">D</span>
            </div>
            <span className="font-semibold text-foreground">DocAuto</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3">
        {/* Core Section */}
        <div className="space-y-1">
          {!collapsed && (
            <span className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Core</span>
          )}
          <div className="mt-2 space-y-1">
            {coreNavItems.map((item) => {
              const rendered = renderNavItem(item);
              if (!rendered) return null;
              return <div key={item.id}>{rendered}</div>;
            })}
          </div>
        </div>

        {/* Admin Section */}
        {showAdminSection && (
          <div className="mt-6 space-y-1">
            {!collapsed && (
              <span className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Admin</span>
            )}
            <div className="mt-2 space-y-1">
              {adminNavItems.map((item) => {
                const rendered = renderNavItem(item);
                if (!rendered) return null;
                return <div key={item.id}>{rendered}</div>;
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("w-full justify-center", !collapsed && "justify-start")}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span className="ml-2">접기</span>}
        </Button>
      </div>
    </aside>
  );
}
