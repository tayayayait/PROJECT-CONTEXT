import { FileText } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";

interface PagePlaceholderProps {
  title: string;
  description?: string;
}

export function PagePlaceholder({ title, description = "이 화면은 아직 구현되지 않았습니다." }: PagePlaceholderProps) {
  return (
    <MainLayout pageTitle={title}>
      <div className="rounded-xl border bg-card p-8 text-center">
        <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-foreground mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </MainLayout>
  );
}

