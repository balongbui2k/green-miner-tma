import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import TokenInfoBanner from "@/components/ui/home/token-info-banner.tsx";
import useProfile from "@/data/useProfile.ts";
import Header from "@/components/header.tsx";
import MinerDisplay from "@/components/ui/home/miner-display";

export const Route = createFileRoute("/_layout/")({
  component: Home,
});

function Home() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [listHeight, setListHeight] = useState<string>("auto");

  const { data: profile } = useProfile();

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
      className="w-full overflow-y-auto scroll-smooth no-scrollbar will-change-scroll"
    >
      <Header />

      <div className="p-4">
        <TokenInfoBanner profile={profile} />

        <MinerDisplay />
      </div>
    </section>
  );
}
