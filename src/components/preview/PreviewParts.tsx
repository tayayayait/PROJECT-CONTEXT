import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Eye } from "lucide-react";

const thumbs = Array.from({ length: 6 }, (_, i) => i + 1);

export function Thumbnails() {
  return (
    <ScrollArea className="h-full w-24 border-r bg-surface-subtle">
      <div className="p-2 space-y-2">
        {thumbs.map((n) => (
          <div key={n} className="rounded border bg-card aspect-[3/4] flex items-center justify-center text-sm text-muted-foreground">
            {n}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export function PageViewer() {
  return (
    <div className="flex-1 bg-muted/20 flex items-center justify-center">
      <div className="w-[70%] aspect-[3/4] bg-white rounded shadow-lg border flex flex-col items-center justify-center text-muted-foreground">
        페이지 미리보기
      </div>
    </div>
  );
}

export function PreviewHeader() {
  return (
    <div className="h-12 px-4 border-b flex items-center justify-between bg-card">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-primary" />
        <span className="font-semibold text-foreground">preview-doc.pdf</span>
        <Badge variant="secondary" className="bg-primary/10 text-primary">v1</Badge>
      </div>
      <Button variant="secondary" size="sm">
        <Eye className="h-4 w-4 mr-1" /> 워터마크 토글
      </Button>
    </div>
  );
}
