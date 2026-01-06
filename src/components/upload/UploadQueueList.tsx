import { UploadItem, UploadStatus, AnalysisStatus } from "@/hooks/useUploadQueue";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Pause, Play, RefreshCw, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadQueueListProps {
  items: UploadItem[];
  onPause: (id: string) => void;
  onResume: (id: string) => void;
  onCancel: (id: string) => void;
  onRetry: (id: string) => void;
  onRetryAnalysis?: (id: string) => void;
}

const statusMeta: Record<UploadStatus, { label: string; color: string; bg: string; icon?: React.ElementType }> = {
  queued: { label: "대기", color: "text-muted-foreground", bg: "bg-muted" },
  uploading: { label: "업로드", color: "text-info", bg: "bg-info/10" },
  parsing: { label: "파싱", color: "text-primary", bg: "bg-primary/10" },
  embedding: { label: "임베딩", color: "text-warning", bg: "bg-warning/10" },
  completed: { label: "완료", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  failed: { label: "실패", color: "text-danger", bg: "bg-danger/10", icon: AlertCircle },
  paused: { label: "일시정지", color: "text-muted-foreground", bg: "bg-muted" },
};

const analysisStatusMeta: Record<
  AnalysisStatus,
  { label: string; color: string; bg: string; icon?: React.ElementType }
> = {
  queued: { label: "분석 대기", color: "text-muted-foreground", bg: "bg-muted" },
  analyzing: { label: "분석 중", color: "text-info", bg: "bg-info/10", icon: RefreshCw },
  ready: { label: "분석 완료", color: "text-success", bg: "bg-success/10", icon: CheckCircle },
  error: { label: "분석 실패", color: "text-danger", bg: "bg-danger/10", icon: AlertCircle },
};

const isProcessing = (status: UploadStatus) => ["uploading", "parsing", "embedding"].includes(status);

export function UploadQueueList({ items, onPause, onResume, onCancel, onRetry }: UploadQueueListProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      {items.map((file) => {
        const meta = statusMeta[file.status];
        const Icon = meta.icon;
        const processing = isProcessing(file.status);
        const analysisMeta = file.analysisStatus ? analysisStatusMeta[file.analysisStatus] : undefined;
        const AnalysisIcon = analysisMeta?.icon;

        return (
          <div
            key={file.id}
            className={cn(
              "flex items-center gap-4 p-4 rounded-lg border bg-card transition-all duration-200",
              file.status === "failed" && "border-danger/30 bg-danger/5"
            )}
          >
            <div className={cn("p-2 rounded-lg", meta.bg)}>
              <span className={cn("text-sm font-medium", meta.color)}>{file.type.toUpperCase()}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground truncate">{file.name}</span>
                <span className="text-sm text-muted-foreground">{file.prettySize}</span>
              </div>

              {processing && (
                <div className="mt-2">
                  <Progress value={file.progress} className="h-1.5" />
                </div>
              )}

              {file.error && (
                <div className="flex items-center gap-1 mt-1 text-sm text-danger">
                  <AlertCircle className="h-3 w-3" />
                  {file.error}
                </div>
              )}
              {analysisMeta && (
                <div className="mt-3 space-y-2 rounded-lg border border-border bg-muted/10 p-3 text-sm text-foreground">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                    <Badge className={cn("px-2 py-0 text-[11px]", analysisMeta.bg, analysisMeta.color)}>
                      {AnalysisIcon && <AnalysisIcon className="mr-1 h-3 w-3" />}
                      {analysisMeta.label}
                    </Badge>
                    {file.analysisStatus === "analyzing" && (
                      <span className="text-xs text-muted-foreground">요약 생성 중...</span>
                    )}
                  </div>
                  {file.analysisSummary && file.analysisStatus === "ready" && (
                    <p className="text-sm leading-relaxed text-foreground">{file.analysisSummary}</p>
                  )}
                  {file.analysisStatus === "error" && file.analysisError && onRetryAnalysis && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-danger">{file.analysisError}</span>
                      <Button variant="ghost" size="sm" className="px-2 text-xs font-semibold uppercase" onClick={() => onRetryAnalysis(file.id)}>
                        재분석
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Badge className={cn("text-xs", meta.bg, meta.color)}>
              {processing && <RefreshCw className="h-3 w-3 mr-1 animate-spin" />}
              {Icon && !processing && <Icon className="h-3 w-3 mr-1" />}
              {meta.label}
              {processing && ` ${file.progress}%`}
            </Badge>

            <div className="flex items-center gap-1">
              {processing && (
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onPause(file.id)}>
                  <Pause className="h-4 w-4" />
                </Button>
              )}
              {file.status === "paused" && (
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onResume(file.id)}>
                  <Play className="h-4 w-4" />
                </Button>
              )}
              {file.status === "failed" && (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={() => onRetry(file.id)}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-danger"
                onClick={() => onCancel(file.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
