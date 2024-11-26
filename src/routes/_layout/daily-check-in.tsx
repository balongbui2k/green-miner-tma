import BottomModal from "@/components/common/bottom-modal";
import { TabPanel } from "@/components/common/custom-tab-list";
import { Tab } from "@/components/common/custom-tab-list";
import { Tabs } from "@/components/common/custom-tab-list";
import Header from "@/components/header";
import CheckIn from "@/components/ui/daily-check-in";
import LeaderBoard from "@/components/ui/daily-check-in/leader-board";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/_layout/daily-check-in")({
  component: DailyCheckIn,
});

function DailyCheckIn() {
  const [isOpenBottomModal, setIsOpenBottomModal] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);
  const [listHeight, setListHeight] = useState<string>("auto");

  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get("tab");
  const defaultIndex =
    tabParam === "daily-check-in" ? 0 : tabParam === "leader-board" ? 1 : 0;
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);

  const handleCloseBottomModal = () => {
    setIsOpenBottomModal(false);
  };

  const handleOpenBottomModal = () => {
    setIsOpenBottomModal(true);
  };

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
      className="overflow-y-auto no-scrollbar"
    >
      <Header handleOpenBottomModal={handleOpenBottomModal} />

      <Tabs
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
      >
        <Tab>Daily Check-in</Tab>
        <Tab>Leader board</Tab>

        <TabPanel>
          <CheckIn />
        </TabPanel>

        <TabPanel>
          <LeaderBoard />
        </TabPanel>
      </Tabs>

      <BottomModal
        title="How it works?"
        isOpen={isOpenBottomModal}
        handleCloseBottomModal={handleCloseBottomModal}
      >
        <ul className="list-disc dm-mono-regular text-[13px] text-[#A1A1A1] space-y-8">
          <li>
            Complete all the tasks below, which involve making transactions of
            $TON, within a single day to unlock a substantial reward and receive
            a bonus of Free $GREEN
          </li>

          <li>
            If you fail to complete all tasks within the same day, your progress
            will reset, and you’ll need to start again from the beginning in the
            next day.
          </li>
        </ul>
      </BottomModal>
    </section>
  );
}

export default DailyCheckIn;
