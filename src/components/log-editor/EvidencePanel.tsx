import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const evidence = [
  { id: "chunk_001", doc: "기업계획서_2024.pdf", page: 12, highlight: "디지털 전환" },
  { id: "chunk_045", doc: "마케팅전략.pptx", page: 8, highlight: "온라인 채널" },
];

export function EvidencePanel() {
  return (
    <div className="flex flex-col h-full border-l">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-foreground">근거 미리보기</h3>
        <p className="text-sm text-muted-foreground">선택 문장과 연결된 단락을 확인하세요.</p>
      </div>
      <ScrollArea className="flex-1 p-4 space-y-3">
        {evidence.map((item) => (
          <div key={item.id} className="rounded-lg border p-3 bg-surface-subtle space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Badge variant="outline" className="text-xs">
                {item.doc}
              </Badge>
              <span>p.{item.page}</span>
            </div>
            <p className="text-sm text-muted-foreground">하이라이트: {item.highlight}</p>
            <p className="text-xs text-muted-foreground">청크 {item.id}</p>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
