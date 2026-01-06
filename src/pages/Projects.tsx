import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  FolderKanban,
  Users,
  FileText,
  Calendar,
  Star,
  StarOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  description: string;
  documentsCount: number;
  membersCount: number;
  lastUpdated: string;
  status: "active" | "archived" | "draft";
  starred: boolean;
}

const projects: Project[] = [
  {
    id: "1",
    name: "2024년 사업계획서",
    description: "연간 사업계획 및 예산 문서 자동화 프로젝트",
    documentsCount: 47,
    membersCount: 8,
    lastUpdated: "2시간 전",
    status: "active",
    starred: true,
  },
  {
    id: "2",
    name: "마케팅 전략 보고서",
    description: "분기별 마케팅 전략 및 성과 분석",
    documentsCount: 23,
    membersCount: 5,
    lastUpdated: "1일 전",
    status: "active",
    starred: true,
  },
  {
    id: "3",
    name: "신규 프로젝트 제안",
    description: "신규 사업 기획서 및 제안서",
    documentsCount: 12,
    membersCount: 3,
    lastUpdated: "3일 전",
    status: "draft",
    starred: false,
  },
  {
    id: "4",
    name: "2023년 연간 보고서",
    description: "지난연도 성과 및 재무 보고서",
    documentsCount: 89,
    membersCount: 12,
    lastUpdated: "1주 전",
    status: "archived",
    starred: false,
  },
];

const statusStyles = {
  active: "bg-success/10 text-success border-success/30",
  draft: "bg-warning/10 text-warning border-warning/30",
  archived: "bg-muted text-muted-foreground",
};

const statusLabels = {
  active: "진행 중",
  draft: "초안",
  archived: "보관",
};

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout pageTitle="프로젝트">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="프로젝트 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-primary hover:bg-primary-700">
            <Plus className="h-4 w-4 mr-2" />
            새 프로젝트
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-xl border bg-card p-6 hover:shadow-md transition-all duration-200 cursor-pointer animate-fade-in"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FolderKanban className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <Badge className={cn("text-xs mt-1", statusStyles[project.status])}>
                      {statusLabels[project.status]}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-warning"
                  >
                    {project.starred ? (
                      <Star className="h-4 w-4 fill-warning text-warning" />
                    ) : (
                      <StarOff className="h-4 w-4" />
                    )}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>열기</DropdownMenuItem>
                      <DropdownMenuItem>편집</DropdownMenuItem>
                      <DropdownMenuItem>복제</DropdownMenuItem>
                      <DropdownMenuItem className="text-danger">삭제</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>{project.documentsCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{project.membersCount}</span>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  <Calendar className="h-4 w-4" />
                  <span>{project.lastUpdated}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 rounded-xl border bg-surface-subtle">
            <FolderKanban className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">프로젝트가 없습니다</h3>
            <p className="text-muted-foreground mb-4">새 프로젝트를 만들어 시작하세요.</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              새 프로젝트 만들기
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
