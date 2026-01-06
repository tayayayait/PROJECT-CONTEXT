import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export function ApprovalActions() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="secondary" size="sm">
        <X className="h-4 w-4 mr-1" /> 반려
      </Button>
      <Button size="sm">
        <Check className="h-4 w-4 mr-1" /> 승인
      </Button>
    </div>
  );
}

export function ApprovalList() {
  const steps = [
    { id: 1, actor: "PM 김철수", status: "pending" },
    { id: 2, actor: "관리자", status: "waiting" },
  ];
  return (
    <div className="space-y-3">
      {steps.map((s) => (
        <div key={s.id} className="flex items-center justify-between rounded-lg border p-3 bg-card">
          <div>
            <p className="font-medium text-foreground">{s.actor}</p>
            <p className="text-xs text-muted-foreground">순서 {s.id}</p>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">{s.status}</Badge>
        </div>
      ))}
    </div>
  );
}
