import { Bell, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { useCurrentRole, canAccessRoute } from "@/lib/rbac";
import { getRouteById, ROUTE_IDS } from "@/lib/routes";

interface AppHeaderProps {
  pageTitle?: string;
}

export function AppHeader({ pageTitle = "대시보드" }: AppHeaderProps) {
  const role = useCurrentRole();
  const settingsRoute = getRouteById(ROUTE_IDS.adminSettings);
  const showSettings = settingsRoute ? canAccessRoute(role, settingsRoute.roles) : false;

  return (
    <header className="sticky top-0 z-40 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left: Page Title */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>
        </div>

        {/* Center: Global Search */}
        <div className="flex-1 max-w-md mx-8">
          <GlobalSearch />
        </div>

        {/* Right: Notifications & User */}
        <div className="flex items-center gap-2">
          {showSettings && settingsRoute && (
            <Button variant="ghost" size="icon" asChild>
              <Link to={settingsRoute.path} aria-label="설정">
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                  3
                </Badge>
                <span className="sr-only">알림</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>알림</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">문서 파싱 완료</span>
                <span className="text-sm text-muted-foreground">project-report.pdf 처리가 완료되었습니다.</span>
                <span className="text-xs text-muted-foreground">2분 전</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">결재 요청</span>
                <span className="text-sm text-muted-foreground">김철수가 결재를 요청했습니다.</span>
                <span className="text-xs text-muted-foreground">15분 전</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <span className="font-medium">업로드 실패</span>
                <span className="text-sm text-muted-foreground">large-file.pptx 업로드에 실패했습니다.</span>
                <span className="text-xs text-muted-foreground">1시간 전</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="사용자" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">관</AvatarFallback>
                </Avatar>
                <span className="sr-only">사용자 메뉴</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">관리자</p>
                  <p className="text-xs text-muted-foreground">admin@company.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                프로필
              </DropdownMenuItem>
              <DropdownMenuItem>설정</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-danger">로그아웃</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

