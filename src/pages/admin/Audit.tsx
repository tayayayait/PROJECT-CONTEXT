import { MainLayout } from "@/components/layout/MainLayout";
import { AuditTable } from "@/components/admin/AuditTable";
import { Button } from "@/components/ui/button";

export default function Audit() {
  return (
    <MainLayout pageTitle="감사 로그">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">감사 로그</h3>
            <p className="text-sm text-muted-foreground">필터/검색/내보내기</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">CSV</Button>
            <Button variant="outline" size="sm">PDF</Button>
          </div>
        </div>
        <AuditTable />
      </div>
    </MainLayout>
  );
}
