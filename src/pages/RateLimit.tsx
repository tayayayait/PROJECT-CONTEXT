import { MainLayout } from "@/components/layout/MainLayout";
import { TimerOff } from "lucide-react";

export default function RateLimit() {
  return (
    <MainLayout pageTitle="요청이 많습니다" showBreadcrumb={false}>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md rounded-xl border bg-card p-8 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-warning/10 flex items-center justify-center">
            <TimerOff className="h-6 w-6 text-warning" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">요청 제한</h1>
          <p className="text-sm text-muted-foreground">잠시 후 다시 시도해 주세요. 여러 번 반복되면 관리자에게 문의하세요.</p>
        </div>
      </div>
    </MainLayout>
  );
}
