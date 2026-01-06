import { cn } from "@/lib/utils";
import { Upload, FileSearch, Brain, CheckCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PipelineStep {
  id: string;
  label: string;
  count: number;
  status: "idle" | "active" | "completed" | "error";
  icon: React.ElementType;
}

const steps: PipelineStep[] = [
  { id: "upload", label: "업로드 대기", count: 3, status: "active", icon: Upload },
  { id: "parsing", label: "파싱 중", count: 2, status: "active", icon: FileSearch },
  { id: "embedding", label: "임베딩 중", count: 1, status: "active", icon: Brain },
  { id: "completed", label: "완료", count: 47, status: "completed", icon: CheckCircle },
  { id: "failed", label: "실패", count: 2, status: "error", icon: AlertCircle },
];

const statusStyles = {
  idle: "bg-muted text-muted-foreground",
  active: "bg-primary/10 text-primary border-primary/20",
  completed: "bg-success/10 text-success border-success/20",
  error: "bg-danger/10 text-danger border-danger/20",
};

export function PipelineStatus() {
  const totalActive = steps.filter((s) => s.status === "active").reduce((acc, s) => acc + s.count, 0);
  const totalCompleted = steps.find((s) => s.id === "completed")?.count || 0;
  const total = steps.reduce((acc, s) => acc + s.count, 0);
  const progressPercent = Math.round((totalCompleted / total) * 100);

  return (
    <div className="rounded-xl border bg-card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">파이프라인 현황</h3>
          <p className="text-sm text-muted-foreground mt-1">현재 {totalActive}개 문서 처리 중</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-foreground">{progressPercent}%</span>
          <p className="text-sm text-muted-foreground">완료율</p>
        </div>
      </div>

      <Progress value={progressPercent} className="h-2 mb-6" />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className={cn(
                "flex flex-col items-center p-4 rounded-lg border transition-all duration-150",
                statusStyles[step.status]
              )}
            >
              <Icon className="h-5 w-5 mb-2" />
              <span className="text-2xl font-bold">{step.count}</span>
              <span className="text-xs text-center mt-1">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
