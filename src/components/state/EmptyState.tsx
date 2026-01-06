import { ReactNode } from "react";
import { FileText, UploadCloud, Search, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ElementType;
  action?: ReactNode;
  className?: string;
}

const defaultIcons = [FileText, UploadCloud, Search, Inbox];

export function EmptyState({
  title = "데이터가 없습니다",
  description = "새로 추가하거나 샘플 데이터를 불러와 시작하세요.",
  icon: Icon = defaultIcons[Math.floor(Math.random() * defaultIcons.length)],
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("text-center py-12 rounded-xl border bg-surface-subtle", className)}>
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      {action || (
        <Button size="sm" variant="primary">새로 추가</Button>
      )}
    </div>
  );
}
