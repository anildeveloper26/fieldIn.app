import { PageHeader } from "@/components/shared/PageHeader";
import { RewardsStore } from "@/components/rewards/RewardsStore";
import { RvmBanner } from "@/components/rewards/RvmBanner";
import { RvmRedeemer } from "@/components/rewards/RvmRedeemer";
import { TransactionHistory } from "@/components/rewards/TransactionHistory";
import { WalletCard } from "@/components/rewards/WalletCard";

export default function RewardsPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-6">
      <PageHeader
        eyebrow="Eco rewards station"
        title="Recycle. Earn. Play."
        description="Every bottle you drop at an RVM turns into coins for bookings, food and gear."
      />
      <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <WalletCard />
        <div className="grid gap-4">
          <RvmRedeemer />
          <RvmBanner />
        </div>
      </div>
      <RewardsStore />
      <TransactionHistory />
    </main>
  );
}
