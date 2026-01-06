import { MainLayout } from "@/components/layout/MainLayout";
import { EditorPanel } from "@/components/log-editor/EditorPanel";
import { EvidencePanel } from "@/components/log-editor/EvidencePanel";
import { CommentsPanel } from "@/components/log-editor/CommentsPanel";

export default function LogEditor() {
  return (
    <MainLayout pageTitle="로그 에디터">
      <div className="grid grid-rows-[1fr_auto] h-[calc(100vh-160px)] rounded-xl border bg-card">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] divide-x">
          <EditorPanel />
          <EvidencePanel />
        </div>
        <CommentsPanel />
      </div>
    </MainLayout>
  );
}
