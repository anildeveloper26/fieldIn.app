import { AuthGuard } from "@/components/auth/AuthGuard";
import { HeaderBar } from "@/components/layout/HeaderBar";
import { BottomTabBar } from "@/components/layout/NavigationTabs";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <HeaderBar />
      <div className="pb-24 md:pb-8">{children}</div>
      <BottomTabBar />
    </AuthGuard>
  );
}
