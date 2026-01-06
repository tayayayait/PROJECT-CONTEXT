import { MainLayout } from "@/components/layout/MainLayout";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default function Settings() {
  return (
    <MainLayout pageTitle="설정">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">보안 / PII / 보존</h3>
        <SettingsForm />
      </div>
    </MainLayout>
  );
}
