import { Clock, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ApprovalItem {
  id: string;
  title: string;
  requester: string;
  requestedAt: string;
  priority: "low" | "medium" | "high";
  type: string;
}

const approvals: ApprovalItem[] = [
  {
    id: "1",
    title: "2024년 마케팅 전략 보고서",
    requester: "이영희",
    requestedAt: "2시간 전",
    priority: "high",
    type: "HWP",
  },
  {
    id: "2",
    title: "신규 프로젝트 제안서",
    requester: "박민수",
    requestedAt: "5시간 전",
    priority: "medium",
    type: "PPTX",
  },
  {
    id: "3",
    title: "연간 실적 리포트",
    requester: "김철수",
    requestedAt: "1일 전",
    priority: "low",
    type: "PDF",
  },
];

const priorityStyles = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning/10 text-warning border-warning/30",
  high: "bg-danger/10 text-danger border-danger/30",
};

const priorityLabels = {
  low: "낮음",
  medium: "보통",
  high: "긴급",
};

export function PendingApprovals() {
  return (
    <div className="rounded-xl border bg-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">결재 대기</h3>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {approvals.length}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          전체 보기
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {approvals.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-lg border bg-surface-subtle hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground truncate">{item.title}</span>
                <Badge variant="outline" className="text-xs">
                  {item.type}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <span>{item.requester}</span>
                <span>·</span>
                <Clock className="h-3 w-3" />
                <span>{item.requestedAt}</span>
              </div>
            </div>

            <Badge className={cn("text-xs", priorityStyles[item.priority])}>
              {priorityLabels[item.priority]}
            </Badge>

            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              검토
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
