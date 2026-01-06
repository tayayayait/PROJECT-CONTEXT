import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchResult } from "./SearchResults";
import { FileText, ExternalLink, Tag, Quote, Send } from "lucide-react";

interface EvidencePanelProps {
  result: SearchResult | null;
}

export function EvidencePanel({ result }: EvidencePanelProps) {
  return (
    <div className="border rounded-xl bg-card p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Quote className="h-4 w-4 text-primary" />
          근거 미리보기
        </h3>
        {result && (
          <Button variant="ghost" size="sm">
            <ExternalLink className="h-4 w-4 mr-1" />
            원문 보기
          </Button>
        )}
      </div>

      {result ? (
        <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4">
          <div className="p-3 rounded-lg bg-surface-subtle">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{result.document}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>페이지 {result.page}</span>
              <span>청크 {result.chunkId}</span>
            </div>
          </div>

          <div className="p-4 rounded-lg border bg-primary/5">
            <p className="text-sm leading-relaxed">
              {result.snippet.split(result.highlightedText).map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <mark className="bg-primary/20 text-primary font-medium px-1 rounded">
                      {result.highlightedText}
                    </mark>
                  )}
                </span>
              ))}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-1">
              {result.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Button className="w-full mt-4">
            <Send className="h-4 w-4 mr-2" />
            선택 근거를 로그 에디터로 보내기
          </Button>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-center p-6">
          <div>
            <Quote className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">검색 결과를 선택하면</p>
            <p className="text-muted-foreground">근거 내용을 확인할 수 있습니다.</p>
          </div>
        </div>
      )}
    </div>
  );
}
