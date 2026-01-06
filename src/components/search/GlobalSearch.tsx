import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface GlobalSearchProps {
  className?: string;
}

export function GlobalSearch({ className }: GlobalSearchProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        id="global-search-input"
        type="search"
        placeholder="통합 검색..."
        aria-label="통합 검색"
        className={cn(
          "pl-10 pr-12 h-10 bg-surface-subtle border-border transition-all duration-150",
          focused && "ring-2 ring-ring bg-background",
        )}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
        <span>/</span>
      </kbd>
    </div>
  );
}

