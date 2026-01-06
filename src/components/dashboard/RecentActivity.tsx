import { cn } from "@/lib/utils";
import { FileText, Upload, CheckCircle, AlertCircle, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Activity {
  id: string;
  type: "upload" | "parsing" | "approval" | "edit" | "error";
  title: string;
  description: string;
  user: { name: string; initials: string };
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "approval",
    title: "문서 결재 완료",
    description: "2024년 사업계획서.hwp가 승인되었습니다.",
    user: { name: "김철수", initials: "김" },
    timestamp: "5분 전",
  },
  {
    id: "2",
    type: "upload",
    title: "파일 업로드",
    description: "project-specs.pdf 외 3개 파일이 업로드되었습니다.",
    user: { name: "이영희", initials: "이" },
    timestamp: "12분 전",
  },
  {
    id: "3",
    type: "parsing",
    title: "파싱 완료",
    description: "quarterly-report.pptx 처리가 완료되었습니다.",
    user: { name: "Susan", initials: "S" },
    timestamp: "25분 전",
  },
  {
    id: "4",
    type: "edit",
    title: "문서 수정",
    description: "마케팅전략 문서에 3개 문장이 수정되었습니다.",
    user: { name: "박민수", initials: "박" },
    timestamp: "1시간 전",
  },
  {
    id: "5",
    type: "error",
    title: "처리 실패",
    description: "large-dataset.xlsx 파일 파싱에 실패했습니다.",
    user: { name: "Susan", initials: "S" },
    timestamp: "2시간 전",
  },
];

const typeIcons = {
  upload: Upload,
  parsing: FileText,
  approval: CheckCircle,
  edit: Edit,
  error: AlertCircle,
};

const typeStyles = {
  upload: "text-info",
  parsing: "text-primary",
  approval: "text-success",
  edit: "text-warning",
  error: "text-danger",
};

export function RecentActivity() {
  return (
    <div className="rounded-xl border bg-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">최근 활동</h3>
        <button className="text-sm text-primary hover:underline">전체 보기</button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = typeIcons[activity.type];
          return (
            <div
              key={activity.id}
              className={cn(
                "flex items-start gap-4 p-3 rounded-lg hover:bg-surface-subtle transition-colors",
                index === 0 && "animate-slide-down"
              )}
            >
              <div className={cn("p-2 rounded-lg bg-muted", typeStyles[activity.type])}>
                <Icon className="h-4 w-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{activity.title}</span>
                  {activity.type === "error" && (
                    <Badge variant="destructive" className="text-xs">
                      실패
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {activity.user.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.timestamp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
