import { FileText, Upload, CheckSquare, Clock, Users, TrendingUp } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { PipelineStatus } from "@/components/dashboard/PipelineStatus";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { PendingApprovals } from "@/components/dashboard/PendingApprovals";
import { RecentFailures } from "@/components/dashboard/RecentFailures";
import { Stepper } from "@/components/ui/stepper";

const workflowSteps = [
  { id: "upload", label: "업로드" },
  { id: "parsing", label: "파싱" },
  { id: "review", label: "검토" },
  { id: "mapping", label: "매핑" },
  { id: "preview", label: "미리보기" },
  { id: "approval", label: "결재" },
  { id: "export", label: "내보내기" },
];

export default function Dashboard() {
  return (
    <MainLayout pageTitle="대시보드" showBreadcrumb={false}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">오늘의 작업 현황</h2>
            <p className="text-muted-foreground mt-1">문서 자동화 파이프라인 상태를 한눈에 확인하세요.</p>
          </div>
          <div className="hidden lg:block">
            <Stepper steps={workflowSteps} currentStep={3} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="처리된 문서"
            value="1,284"
            subtitle="전주 대비 +127"
            icon={<FileText className="h-5 w-5" />}
            trend={{ value: 12.5, label: "전주 대비" }}
          />
          <KPICard
            title="진행 중 업로드"
            value="6"
            subtitle="실패 업로드: 3건"
            icon={<Upload className="h-5 w-5" />}
            variant="info"
          />
          <KPICard
            title="결재 대기"
            value="3"
            subtitle="긴급: 1건"
            icon={<CheckSquare className="h-5 w-5" />}
            variant="warning"
          />
          <KPICard
            title="평균 처리 시간"
            value="2.4분"
            subtitle="목표: 5분 이내"
            icon={<Clock className="h-5 w-5" />}
            trend={{ value: -18.3, label: "전주 대비" }}
            variant="success"
          />
        </div>

        <PipelineStatus />

        <RecentFailures />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PendingApprovals />
          <RecentActivity />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border bg-card p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">활성 사용자</p>
              <p className="text-2xl font-bold text-foreground">24</p>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-success/10">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">완료율 증가</p>
              <p className="text-2xl font-bold text-foreground">+23%</p>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-info/10">
              <FileText className="h-6 w-6 text-info" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">이번 주 생성 문서</p>
              <p className="text-2xl font-bold text-foreground">15건</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
