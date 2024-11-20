import { createFileRoute } from "@tanstack/react-router";
import MinerPlanCard from "@/components/common/miner-plan-card.tsx";
import { useRef, useState, useEffect } from "react";

export const Route = createFileRoute("/_layout/rent-miner")({
  component: RentMiner,
});

function RentMiner() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [listHeight, setListHeight] = useState<string>("auto");

  useEffect(() => {
    const updateHeight = () => {
      if (listRef.current) {
        const windowHeight = window.innerHeight;
        const listTop = listRef.current.getBoundingClientRect().top;
        const navBarHeight = 86;
        const newHeight = Math.round(windowHeight - listTop - navBarHeight);
        setListHeight(`${newHeight}px`);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, [listHeight]);
  return (
    <section
      ref={listRef}
      style={{ height: listHeight }}
      className="p-7 overflow-y-auto scroll-smooth no-scrollbar"
    >
      <div className="space-y-7">
        <MinerPlanCard />
      </div>
    </section>
  );
}
