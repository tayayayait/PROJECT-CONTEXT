import { MainLayout } from "@/components/layout/MainLayout";
import { Thumbnails, PageViewer, PreviewHeader } from "@/components/preview/PreviewParts";
import { ApprovalList, ApprovalActions } from "@/components/approval/Approvals";
import { ExpiringLinkForm } from "@/components/export/ExpiringLinkForm";

export default function Preview() {
  return (
    <MainLayout pageTitle="미리보기">
      <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr_320px] h-[calc(100vh-160px)] rounded-xl border bg-card overflow-hidden">
        <Thumbnails />
        <div className="flex flex-col">
          <PreviewHeader />
          <PageViewer />
        </div>
        <div className="border-l p-4 space-y-4 bg-surface-subtle">
          <div>
            <h3 className="font-semibold text-foreground mb-2">결재 흐름</h3>
            <ApprovalList />
            <div className="mt-3"><ApprovalActions /></div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">만료 링크</h3>
            <ExpiringLinkForm />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
