import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search, Sparkles } from "lucide-react";

interface QueryBuilderProps {
  query: string;
  onQueryChange: (value: string) => void;
  similarity: number;
  onSimilarityChange: (value: number) => void;
  project: string;
  onProjectChange: (value: string) => void;
  docType: string;
  onDocTypeChange: (value: string) => void;
  onSearch: () => void;
}

export function QueryBuilder({
  query,
  onQueryChange,
  similarity,
  onSimilarityChange,
  project,
  onProjectChange,
  docType,
  onDocTypeChange,
  onSearch,
}: QueryBuilderProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="검색어를 입력하세요..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="pl-10 pr-4 h-12"
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
        </div>
        <Button onClick={onSearch} className="h-12 px-6">
          <Sparkles className="h-4 w-4 mr-2" />
          검색
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 p-4 rounded-lg bg-surface-subtle border">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">필터</span>
        </div>

        <Select value={project} onValueChange={onProjectChange}>
          <SelectTrigger className="w-[160px] h-9">
            <SelectValue placeholder="프로젝트" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 프로젝트</SelectItem>
            <SelectItem value="project1">사업계획서</SelectItem>
            <SelectItem value="project2">마케팅 전략</SelectItem>
          </SelectContent>
        </Select>

        <Select value={docType} onValueChange={onDocTypeChange}>
          <SelectTrigger className="w-[140px] h-9">
            <SelectValue placeholder="파일 형식" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="pptx">PPTX</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-3 flex-1 min-w-[220px]">
          <span className="text-sm text-muted-foreground whitespace-nowrap">유사도</span>
          <Slider
            value={[similarity]}
            onValueChange={([v]) => onSimilarityChange(v)}
            min={0}
            max={1}
            step={0.01}
            className="flex-1"
          />
          <span className="text-sm font-medium w-12">{Math.round(similarity * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
