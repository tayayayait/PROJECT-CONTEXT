import { AlertTriangle, AlertCircle, WifiOff, ShieldOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onRetry?: () => void;
  type?: "network" | "permission" | "validation" | "server";
  className?: string;
}

const typeIcon = {
  network: WifiOff,
  permission: ShieldOff,
  validation: AlertTriangle,
  server: AlertCircle,
};

export function ErrorState({
  title = "문제가 발생했습니다",
  description = "잠시 후 다시 시도해 주세요.",
  actionLabel = "다시 시도",
  onRetry,
  type = "server",
  className,
}: ErrorStateProps) {
  const Icon = typeIcon[type] || AlertCircle;

  return (
    <div className={cn("text-center py-12 rounded-xl border bg-card", className)} role="alert">
      <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-danger/10">
        <Icon className="h-6 w-6 text-danger" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      {onRetry && (
        <Button size="sm" onClick={onRetry} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
