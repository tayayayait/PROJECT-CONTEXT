import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ExpiringLinkForm() {
  return (
    <Card className="p-4 space-y-3">
      <div className="space-y-1">
        <Label>유효 일수</Label>
        <Input placeholder="7" type="number" min={1} max={30} />
      </div>
      <div className="space-y-1">
        <Label>비밀번호</Label>
        <Input placeholder="공유용 비밀번호" type="password" />
      </div>
      <div className="space-y-1">
        <Label className="flex items-center gap-2">
          <Input type="checkbox" className="h-4 w-4" />
          다운로드 허용
        </Label>
      </div>
      <Button className="w-full">만료 링크 생성</Button>
    </Card>
  );
}
