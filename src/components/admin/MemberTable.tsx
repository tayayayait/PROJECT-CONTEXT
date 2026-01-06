import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const members = [
  { id: 1, name: "김철수", email: "kim@example.com", role: "admin" },
  { id: 2, name: "박민수", email: "park@example.com", role: "pm" },
  { id: 3, name: "이영희", email: "lee@example.com", role: "contributor" },
  { id: 4, name: "최감사", email: "audit@example.com", role: "auditor" },
];

export function MemberTable() {
  return (
    <Table aria-label="프로젝트 멤버">
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
          <TableHead className="w-32">액션</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((m) => (
          <TableRow key={m.id}>
            <TableCell>{m.name}</TableCell>
            <TableCell className="text-muted-foreground">{m.email}</TableCell>
            <TableCell>
              <Select defaultValue={m.role}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">관리자</SelectItem>
                  <SelectItem value="pm">PM</SelectItem>
                  <SelectItem value="contributor">실무자</SelectItem>
                  <SelectItem value="auditor">외부감사</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">제외</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
