import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import TokenInfoBanner from "@/components/ui/home/token-info-banner.tsx";
import useProfile from "@/data/useProfile.ts";
import MinerDisplay from "@/components/ui/home/miner-display";

export const Route = createFileRoute("/_layout/")({
  component: Home,
});

function Home() {
  const { data: profile } = useProfile();

  const listRef = useRef<HTMLDivElement | null>(null);
  const [listHeight, setListHeight] = useState<string>("auto");

  useEffect(() => {
    const updateHeight = () => {
      if (listRef.current) {
        const windowHeight = window.innerHeight;
        const listTop = listRef.current.getBoundingClientRect().top;
        const navBarHeight = 90;
        const newHeight = Math.round(windowHeight - listTop - navBarHeight);
        setListHeight(`${newHeight}px`);
      }
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);

    const resizeObserver = new ResizeObserver(updateHeight);
    if (listRef.current) resizeObserver.observe(listRef.current);

    return () => {
      window.removeEventListener("resize", updateHeight);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={listRef}
      style={{ height: listHeight }}
      className="w-full overflow-y-auto scroll-smooth no-scrollbar will-change-scroll"
    >
      <div className="p-4">
        <TokenInfoBanner profile={profile} />

        <MinerDisplay />
      </div>
    </section>
  );
}
