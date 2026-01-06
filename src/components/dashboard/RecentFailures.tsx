import { AlertTriangle, RefreshCw, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FailureItem {
  id: string;
  fileName: string;
  errorType: string;
  errorMessage: string;
  timestamp: string;
  canRetry: boolean;
}

const failures: FailureItem[] = [
  {
    id: "1",
    fileName: "large-dataset.xlsx",
    errorType: "파싱 오류",
    errorMessage: "파일 크기가 제한을 초과했습니다 (200MB 초과)",
    timestamp: "2시간 전",
    canRetry: false,
  },
  {
    id: "2",
    fileName: "corrupted-file.pdf",
    errorType: "파일 손상",
    errorMessage: "PDF 파일을 읽을 수 없습니다",
    timestamp: "4시간 전",
    canRetry: true,
  },
];

export function RecentFailures() {
  if (failures.length === 0) return null;

  return (
    <div className="rounded-xl border border-danger/20 bg-danger/5 p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-danger" />
        <h3 className="text-lg font-semibold text-foreground">최근 실패</h3>
        <span className="text-sm text-muted-foreground">({failures.length})</span>
      </div>

      <div className="space-y-3">
        {failures.map((failure) => (
          <div
            key={failure.id}
            className="flex items-start gap-4 p-4 rounded-lg bg-background border border-danger/10"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{failure.fileName}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-danger/10 text-danger">
                  {failure.errorType}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{failure.errorMessage}</p>
              <span className="text-xs text-muted-foreground mt-2 block">{failure.timestamp}</span>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {failure.canRetry && (
                <Button variant="outline" size="sm" className="h-8">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  재시도
                </Button>
              )}
              <Button variant="ghost" size="sm" className="h-8">
                <Eye className="h-3 w-3 mr-1" />
                상세
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
