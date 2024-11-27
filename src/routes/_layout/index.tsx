import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import TokenInfoBanner from "@/components/ui/home/token-info-banner.tsx";
import useProfile from "@/data/useProfile.ts";
import MinerDisplay from "@/components/ui/home/miner-display";
import Header from "@/components/header";
import usePendingReward, { type PendingReward } from "@/data/usePendingReward";
import useClaimMutation from "@/data/useClaimMutation";
import { toast } from "react-hot-toast";

export const Route = createFileRoute("/_layout/")({
  component: Home,
});

function Home() {
  const { data: profile } = useProfile();
  const { data: pendingReward } = usePendingReward();
  const { claimReward } = useClaimMutation();

  const [userBalance, setUserBalance] = useState<number>(profile?.balance || 0);
  const [claimPendingReward, setClaimPendingReward] = useState<PendingReward[]>(
    pendingReward || []
  );

  useEffect(() => {
    if (profile) setUserBalance(profile.balance || 0);
    if (pendingReward) setClaimPendingReward(pendingReward);
  }, [profile, pendingReward]);

  const totalPendingReward = claimPendingReward.reduce(
    (sum, item) => sum + item.pending_reward,
    0
  );

  const handleClaimReward = async () => {
    if (totalPendingReward > 0) {
      try {
        const response = await claimReward.mutateAsync();
        if (response?.status === 201) {
          setUserBalance((prevBalance) => prevBalance + totalPendingReward);
          setClaimPendingReward([]);
          toast.success("Reward claimed successfully!");
        } else {
          toast.error("Unable to claim reward. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred while claiming reward.");
      }
    } else {
      toast.error("No rewards available to claim.");
    }
  };

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
      <Header />

      <div className="p-4">
        <TokenInfoBanner userBalance={userBalance} />

        <MinerDisplay
          claimReward={claimPendingReward}
          handleClaimReward={handleClaimReward}
        />
      </div>
    </section>
  );
}
