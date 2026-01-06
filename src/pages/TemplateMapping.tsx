import { MainLayout } from "@/components/layout/MainLayout";
import { StudioTopBar, DataSchemaTree, TemplateCanvas, BindingInspector } from "@/components/template-mapping/Studio";

export default function TemplateMapping() {
  return (
    <MainLayout pageTitle="템플릿 매핑" showBreadcrumb>
      <div className="flex flex-col h-[calc(100vh-160px)] rounded-xl border bg-card overflow-hidden">
        <StudioTopBar />
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] h-full">
          <div className="border-r bg-surface-subtle">
            <DataSchemaTree />
          </div>
          <div className="p-4">
            <TemplateCanvas />
          </div>
          <div className="border-l bg-card">
            <BindingInspector />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
