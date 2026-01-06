import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Layers, Save, History } from "lucide-react";

export function StudioTopBar() {
  return (
    <div className="flex items-center justify-between h-12 px-4 border-b bg-card">
      <div className="flex items-center gap-2">
        <Layers className="h-4 w-4 text-primary" />
        <span className="font-semibold text-foreground">템플릿 매핑</span>
        <span className="text-sm text-muted-foreground">v1.0</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <History className="h-4 w-4 mr-1" />이력
        </Button>
        <Button size="sm">
          <Save className="h-4 w-4 mr-1" />저장
        </Button>
      </div>
    </div>
  );
}

export function DataSchemaTree() {
  const nodes = ["project.title", "project.owner", "project.date", "report.summary", "report.items[]"];
  return (
    <ScrollArea className="h-full p-3 space-y-2">
      {nodes.map((n) => (
        <div key={n} className="rounded border bg-surface-subtle px-3 py-2 text-sm text-foreground">
          {n}
        </div>
      ))}
    </ScrollArea>
  );
}

export function TemplateCanvas() {
  return (
    <div className="h-full bg-surface-subtle rounded-lg border flex items-center justify-center text-muted-foreground">
      슬라이드/페이지 미리보기 영역 (PNG)
    </div>
  );
}

export function BindingInspector() {
  return (
    <div className="p-3 space-y-3">
      <div>
        <p className="text-sm font-semibold text-foreground">바인딩 속성</p>
        <p className="text-xs text-muted-foreground">필드 타입/포맷/반복/조건</p>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between"><span>필드</span><span className="text-muted-foreground">project.title</span></div>
        <div className="flex justify-between"><span>타입</span><span className="text-muted-foreground">string</span></div>
        <div className="flex justify-between"><span>포맷</span><span className="text-muted-foreground">텍스트</span></div>
      </div>
      <Button variant="secondary" className="w-full">바인딩 수정</Button>
    </div>
  );
}
