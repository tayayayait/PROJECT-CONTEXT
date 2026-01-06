import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchResult {
  id: string;
  title: string;
  document: string;
  page: number;
  chunkId: string;
  similarity: number;
  snippet: string;
  highlightedText: string;
  tags: string[];
}

const getConfidenceBadge = (similarity: number) => {
  if (similarity >= 0.9) return { label: "매우 높음", color: "bg-success/10 text-success" };
  if (similarity >= 0.8) return { label: "높음", color: "bg-primary/10 text-primary" };
  if (similarity >= 0.7) return { label: "보통", color: "bg-warning/10 text-warning" };
  return { label: "낮음", color: "bg-muted text-muted-foreground" };
};

interface SearchResultsProps {
  results: SearchResult[];
  selectedId?: string | null;
  onSelect: (result: SearchResult) => void;
}

export function SearchResults({ results, selectedId, onSelect }: SearchResultsProps) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin space-y-3">
      {results.map((result) => {
        const confidence = getConfidenceBadge(result.similarity);
        const isSelected = selectedId === result.id;

        return (
          <div
            key={result.id}
            onClick={() => onSelect(result)}
            className={cn(
              "p-4 rounded-lg border cursor-pointer transition-all duration-200",
              isSelected ? "border-primary bg-primary/5 shadow-md" : "bg-card hover:border-primary/50 hover:shadow-sm"
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground">{result.title}</span>
              </div>
              <Badge className={cn("text-xs", confidence.color)}>
                {Math.round(result.similarity * 100)}% · {confidence.label}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{result.snippet}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                {result.document}
              </span>
              <span>페이지 {result.page}</span>
              <div className="flex items-center gap-1 ml-auto">
                {result.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
