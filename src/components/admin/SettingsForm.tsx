import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function SettingsForm() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4 space-y-3">
        <div>
          <Label className="font-semibold">PII 마스킹</Label>
          <p className="text-sm text-muted-foreground">민감정보 자동 마스킹 활성화</p>
        </div>
        <Switch defaultChecked aria-label="PII 마스킹" />
        <Input placeholder="정규식 추가" />
        <Button size="sm" variant="secondary">규칙 저장</Button>
      </Card>

      <Card className="p-4 space-y-3">
        <div>
          <Label className="font-semibold">보존 기간</Label>
          <p className="text-sm text-muted-foreground">기본 1년, 옵션 3/5년</p>
        </div>
        <Input placeholder="기본 보존 기간(일)" type="number" />
        <Switch aria-label="변경 시 확인" defaultChecked />
      </Card>

      <Card className="p-4 space-y-3">
        <div>
          <Label className="font-semibold">API 키</Label>
          <p className="text-sm text-muted-foreground">저장 후 키 원문은 재표시되지 않습니다.</p>
        </div>
        <Input placeholder="새 API 키" type="password" />
        <Button size="sm">저장</Button>
      </Card>
    </div>
  );
}
