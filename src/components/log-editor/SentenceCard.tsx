import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Edit3 } from "lucide-react";

interface SentenceCardProps {
  id: string;
  text: string;
  confidence: string;
  status: "pending" | "approved" | "rejected";
}

export function SentenceCard({ id, text, confidence, status }: SentenceCardProps) {
  return (
    <div className="rounded-lg border p-4 space-y-2 bg-card">
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="text-xs">{confidence}</Badge>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon"><Edit3 className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="text-success"><CheckCircle className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="text-danger"><XCircle className="h-4 w-4" /></Button>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-foreground">{text}</p>
      <p className="text-xs text-muted-foreground">문장 ID: {id} · 상태: {status}</p>
    </div>
  );
}
