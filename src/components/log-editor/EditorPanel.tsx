import { ScrollArea } from "@/components/ui/scroll-area";
import { SentenceCard } from "./SentenceCard";

const sample = [
  { id: "s1", text: "AI 기반 자동화로 반복 작업을 30% 줄였습니다.", confidence: "높음", status: "pending" },
  { id: "s2", text: "모바일 업로드는 최대 200MB까지 지원됩니다.", confidence: "보통", status: "pending" },
  { id: "s3", text: "PII는 기본 마스킹 처리 후 검토됩니다.", confidence: "높음", status: "approved" },
];

export function EditorPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-foreground">편집</h3>
        <p className="text-sm text-muted-foreground">문장 단위로 수정·승인하세요.</p>
      </div>
      <ScrollArea className="flex-1 p-4 space-y-3">
        {sample.map((s) => (
          <SentenceCard key={s.id} {...s} />
        ))}
      </ScrollArea>
    </div>
  );
}
