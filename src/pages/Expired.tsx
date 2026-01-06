import { MainLayout } from "@/components/layout/MainLayout";
import { Clock4 } from "lucide-react";

export default function Expired() {
  return (
    <MainLayout pageTitle="링크 만료" showBreadcrumb={false}>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md rounded-xl border bg-card p-8 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
            <Clock4 className="h-6 w-6 text-muted-foreground" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">링크가 만료되었습니다</h1>
          <p className="text-sm text-muted-foreground">요청하신 링크의 유효 기간이 지났습니다. 새 링크를 요청해 주세요.</p>
        </div>
      </div>
    </MainLayout>
  );
}
