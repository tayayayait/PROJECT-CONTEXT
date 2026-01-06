import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const comments = [
  { id: "c1", user: "김철수", initial: "김", text: "톤을 좀 더 공식적으로 변경해주세요.", ts: "2분 전" },
  { id: "c2", user: "박민수", initial: "박", text: "근거 링크 확인했습니다.", ts: "10분 전" },
];

export function CommentsPanel() {
  return (
    <div className="border-t p-4 h-56 bg-surface-subtle">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-foreground">댓글</h4>
        <Badge variant="secondary" className="bg-primary/10 text-primary">{comments.length}</Badge>
      </div>
      <ScrollArea className="h-[160px] space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <Avatar className="h-8 w-8"><AvatarFallback>{c.initial}</AvatarFallback></Avatar>
            <div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-foreground">{c.user}</span>
                <span className="text-xs text-muted-foreground">{c.ts}</span>
              </div>
              <p className="text-sm text-muted-foreground">{c.text}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
