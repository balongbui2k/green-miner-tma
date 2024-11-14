import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import TokenInfoBanner from "@/components/ui/home/token-info-banner.tsx";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import Participate from "@/components/ui/home/participate.tsx";
import Todo from "@/components/ui/home/todo.tsx";
import useProfile from "@/data/useProfile.ts";

export const Route = createFileRoute("/_layout/")({
  component: Home,
});

const participants = "5,469,519";

function Home() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [listHeight, setListHeight] = useState<string>("auto");

  const tonAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const { data: profile } = useProfile();

  const handleConnectWalletClick = async () => {
    try {
      if (!tonAddress) {
        await tonConnectUI.openModal();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

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
      className="w-full py-5 overflow-y-auto scroll-smooth no-scrollbar px-5"
      style={{ height: listHeight }}
    >
      <TokenInfoBanner profile={profile} />

      <Participate
        tonAddress={tonAddress}
        participants={participants}
        handleConnectWalletClick={handleConnectWalletClick}
      />

      <hr className="my-5 border border-black mx-4" />

      <Todo />
    </section>
  );
}
