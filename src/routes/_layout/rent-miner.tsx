import { createFileRoute } from "@tanstack/react-router";
import MinerPlanCard from "@/components/common/miner-plan-card.tsx";

export const Route = createFileRoute("/_layout/rent-miner")({
  component: RentMiner,
});

function RentMiner() {
  return (
    <section className="p-7 h-[calc(100vh-280px)] overflow-y-auto scroll-smooth no-scrollbar">
      <div className="space-y-7">
        <MinerPlanCard />
      </div>
    </section>
  );
}
