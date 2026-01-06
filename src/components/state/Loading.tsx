import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  label?: string;
  inline?: boolean;
  className?: string;
}

export function Loading({ label = "로딩 중...", inline = false, className }: LoadingProps) {
  const content = (
    <div className={cn("flex items-center gap-2 text-muted-foreground", className)}>
      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      <span className="text-sm">{label}</span>
    </div>
  );

  if (inline) return content;

  return (
    <div className="flex items-center justify-center py-10" role="status" aria-live="polite">
      {content}
    </div>
  );
}
