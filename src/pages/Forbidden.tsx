import { MainLayout } from "@/components/layout/MainLayout";
import { ShieldOff } from "lucide-react";

export default function Forbidden() {
  return (
    <MainLayout pageTitle="접근 불가" showBreadcrumb={false}>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md rounded-xl border bg-card p-8 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-danger/10 flex items-center justify-center">
            <ShieldOff className="h-6 w-6 text-danger" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">접근 권한이 없습니다</h1>
          <p className="text-sm text-muted-foreground">필요한 권한이 있는지 관리자에게 문의하세요.</p>
        </div>
      </div>
    </MainLayout>
  );
}
