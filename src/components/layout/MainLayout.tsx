import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { Breadcrumb } from "./Breadcrumb";
import { useShortcutNavigation } from "@/hooks/useShortcutNavigation";

interface MainLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  showBreadcrumb?: boolean;
}

export function MainLayout({ children, pageTitle, showBreadcrumb = true }: MainLayoutProps) {
  useShortcutNavigation();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader pageTitle={pageTitle} />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="p-6">
            {showBreadcrumb && <Breadcrumb />}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
