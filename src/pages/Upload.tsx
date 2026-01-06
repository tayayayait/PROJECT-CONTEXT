import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MainLayout } from "@/components/layout/MainLayout";
import { UploadDropzone } from "@/components/upload/UploadDropzone";
import { UploadQueueList } from "@/components/upload/UploadQueueList";
import { useUploadQueue } from "@/hooks/useUploadQueue";
import { useDocumentStore } from "@/contexts/DocumentStoreContext";
import { EmptyState } from "@/components/state/EmptyState";

export default function Upload() {
  const { items, activeCount, concurrencyLimit, enqueue, pause, resume, cancel, retry, retryAnalysis } =
    useUploadQueue();
  const { upsertDocument } = useDocumentStore();

  useEffect(() => {
    items.forEach((item) => upsertDocument(item));
  }, [items, upsertDocument]);

  return (
    <MainLayout pageTitle="업로드">
      <div className="space-y-6">
        <div className="flex items-center gap-3 p-4 rounded-lg bg-warning/10 border border-warning/30">
          <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">개인정보 보호 안내</p>
            <p className="text-sm text-muted-foreground">
              업로드하는 문서에 개인정보가 포함되어 있는지 확인해 주세요. 민감정보는 자동으로 마스킹됩니다.
            </p>
          </div>
          <Button variant="outline" size="sm">
            마스킹 설정
          </Button>
        </div>

        <UploadDropzone onFiles={enqueue}>
          <div className="flex items-center gap-2">
            <Button>파일 선택</Button>
            <Button variant="outline">샘플 선택</Button>
          </div>
        </UploadDropzone>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-foreground">업로드 현황</h3>
            {activeCount > 0 && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {activeCount}/{concurrencyLimit} 처리 중
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>동시 업로드 제한: {concurrencyLimit}</span>
          </div>
        </div>

        {items.length > 0 ? (
          <UploadQueueList
            items={items}
            onPause={pause}
            onResume={resume}
            onCancel={cancel}
            onRetry={retry}
            onRetryAnalysis={retryAnalysis}
          />
        ) : (
          <EmptyState
            title="업로드된 파일이 없습니다"
            description="드래그 앤 드롭 또는 파일 선택 버튼으로 업로드를 시작하세요."
            action={
              <Button size="sm">
                파일 선택
              </Button>
            }
          />
        )}
      </div>
    </MainLayout>
  );
}
