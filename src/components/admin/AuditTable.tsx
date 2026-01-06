import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const logs = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  timestamp: `2026-01-05 12:3${i}`,
  user: `user${i}`,
  action: "DOWNLOAD",
  target: `doc-${i}`,
  detail: "파일 다운로드",
}));

export function AuditTable() {
  return (
    <Table aria-label="감사 로그">
      <TableHeader>
        <TableRow>
          <TableHead>시간</TableHead>
          <TableHead>사용자</TableHead>
          <TableHead>액션</TableHead>
          <TableHead>대상</TableHead>
          <TableHead>세부</TableHead>
          <TableHead className="w-28">내보내기</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.timestamp}</TableCell>
            <TableCell>{row.user}</TableCell>
            <TableCell>{row.action}</TableCell>
            <TableCell>{row.target}</TableCell>
            <TableCell className="text-muted-foreground">{row.detail}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">CSV</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
