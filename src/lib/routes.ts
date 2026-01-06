import {
  LayoutDashboard,
  FolderKanban,
  Upload,
  Search,
  FileText,
  Layers,
  CheckSquare,
  Shield,
  Settings,
  ScrollText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Role } from "@/lib/rbac";

export const ROUTE_IDS = {
  dashboard: "dashboard",
  projects: "projects",
  upload: "upload",
  search: "search",
  logEditor: "logEditor",
  templates: "templates",
  templateMapping: "templateMapping",
  preview: "preview",
  approvals: "approvals",
  adminRoot: "adminRoot",
  adminPermissions: "adminPermissions",
  adminSettings: "adminSettings",
  adminAudit: "adminAudit",
} as const;

export type RouteId = (typeof ROUTE_IDS)[keyof typeof ROUTE_IDS];
export type RouteSection = "core" | "admin" | "hidden";
export type MenuVisibility = "hide" | "disable";

export interface AppRoute {
  id: RouteId;
  path: string;
  label: string;
  breadcrumb?: string | null;
  parentId?: RouteId;
  roles?: Role[];
  section: RouteSection;
  nav: boolean;
  icon?: LucideIcon;
  shortcut?: string;
  menuVisibility?: MenuVisibility;
}

export const appRoutes: AppRoute[] = [
  {
    id: ROUTE_IDS.dashboard,
    path: "/dashboard",
    label: "대시보드",
    breadcrumb: "대시보드",
    section: "core",
    nav: true,
    icon: LayoutDashboard,
    shortcut: "D",
  },
  {
    id: ROUTE_IDS.projects,
    path: "/projects",
    label: "프로젝트",
    breadcrumb: "프로젝트",
    section: "core",
    nav: true,
    icon: FolderKanban,
    shortcut: "G P",
  },
  {
    id: ROUTE_IDS.upload,
    path: "/upload",
    label: "업로드",
    breadcrumb: "업로드",
    section: "core",
    nav: true,
    icon: Upload,
    shortcut: "U",
  },
  {
    id: ROUTE_IDS.search,
    path: "/search",
    label: "벡터 검색",
    breadcrumb: "벡터 검색",
    section: "core",
    nav: true,
    icon: Search,
    shortcut: "V",
  },
  {
    id: ROUTE_IDS.logEditor,
    path: "/logs/editor",
    label: "로그 에디터",
    breadcrumb: "로그 에디터",
    section: "core",
    nav: true,
    icon: FileText,
    shortcut: "L",
  },
  {
    id: ROUTE_IDS.templates,
    path: "/templates",
    label: "템플릿",
    breadcrumb: "템플릿",
    section: "core",
    nav: true,
    icon: Layers,
    shortcut: "T",
  },
  {
    id: ROUTE_IDS.templateMapping,
    path: "/templates/:templateId/mapping",
    label: "템플릿 매핑",
    breadcrumb: "매핑",
    parentId: ROUTE_IDS.templates,
    section: "hidden",
    nav: false,
  },
  {
    id: ROUTE_IDS.preview,
    path: "/preview/:docId",
    label: "미리보기",
    breadcrumb: "미리보기",
    section: "hidden",
    nav: false,
  },
  {
    id: ROUTE_IDS.approvals,
    path: "/approvals",
    label: "결재",
    breadcrumb: "결재",
    section: "core",
    nav: true,
    icon: CheckSquare,
    shortcut: "A",
    roles: ["admin", "pm"],
    menuVisibility: "disable",
  },
  {
    id: ROUTE_IDS.adminRoot,
    path: "/admin",
    label: "관리",
    breadcrumb: "관리",
    section: "hidden",
    nav: false,
    roles: ["admin", "auditor"],
  },
  {
    id: ROUTE_IDS.adminPermissions,
    path: "/admin/permissions",
    label: "권한 관리",
    breadcrumb: "권한 관리",
    parentId: ROUTE_IDS.adminRoot,
    section: "admin",
    nav: true,
    icon: Shield,
    roles: ["admin"],
  },
  {
    id: ROUTE_IDS.adminSettings,
    path: "/admin/settings",
    label: "설정",
    breadcrumb: "설정",
    parentId: ROUTE_IDS.adminRoot,
    section: "admin",
    nav: true,
    icon: Settings,
    roles: ["admin"],
  },
  {
    id: ROUTE_IDS.adminAudit,
    path: "/admin/audit",
    label: "감사 로그",
    breadcrumb: "감사 로그",
    parentId: ROUTE_IDS.adminRoot,
    section: "admin",
    nav: true,
    icon: ScrollText,
    roles: ["admin", "auditor"],
  },
];

const routeMap = new Map<RouteId, AppRoute>(appRoutes.map((route) => [route.id, route]));
const matchableRoutes = [...appRoutes].sort((a, b) => b.path.length - a.path.length);

export const getRouteById = (id: RouteId) => routeMap.get(id);

export const getNavRoutes = (section: RouteSection) =>
  appRoutes.filter((route) => route.nav && route.section === section);

const normalizePath = (path: string) => (path === "/" ? "/" : path.replace(/\/+$/g, ""));

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const routePathToRegex = (path: string) => {
  const parts = normalizePath(path)
    .split("/")
    .filter(Boolean)
    .map((part) => (part.startsWith(":") ? "[^/]+" : escapeRegex(part)));
  return new RegExp(`^/${parts.join("/")}$`);
};

export const matchRoute = (pathname: string) => {
  const normalized = normalizePath(pathname);

  for (const route of matchableRoutes) {
    const regex = routePathToRegex(route.path);
    if (regex.test(normalized)) {
      return route;
    }
  }

  return undefined;
};

export const getBreadcrumbs = (pathname: string) => {
  const route = matchRoute(pathname);
  if (!route) return [];

  const crumbs: AppRoute[] = [];
  let current: AppRoute | undefined = route;

  while (current) {
    if (current.breadcrumb !== null) {
      crumbs.unshift(current);
    }
    current = current.parentId ? getRouteById(current.parentId) : undefined;
  }

  return crumbs.map((crumb, index) => ({
    id: crumb.id,
    label: crumb.breadcrumb ?? crumb.label,
    path: index === crumbs.length - 1 ? normalizePath(pathname) : crumb.path,
  }));
};

