import { createFileRoute } from "@tanstack/react-router";
import MinerPlanCard from "@/components/common/miner-plan-card.tsx";
import Header from "@/components/header";
import useDeviceHeightObserver from "@/hooks/useDeviceHeightObserver";

export const Route = createFileRoute("/_layout/rent-miner")({
  component: RentMiner,
});

function RentMiner() {
  const { listHeight, listRef } = useDeviceHeightObserver();
  return (
    <section
      ref={listRef}
      style={{ height: listHeight }}
      className="overflow-y-auto scroll-smooth no-scrollbar"
    >
      <Header />

      <div className="space-y-7 p-5">
        <MinerPlanCard />
      </div>
    </section>
  );
}
