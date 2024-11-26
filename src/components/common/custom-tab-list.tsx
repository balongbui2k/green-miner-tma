import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/index.tsx";
import DailyCheckInHeader from "../ui/header/daily-check-in";

interface TabsProps {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
  children: React.ReactNode;
}

interface TabProps {
  isActive?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

interface TabPanelProps {
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<
  TabsProps & { handleOpenBottomModal: () => void }
> = ({
  activeTabIndex,
  setActiveTabIndex,
  children,
  handleOpenBottomModal,
}) => {
  const tabs = React.Children.toArray(children).filter(
    (child) => (child as React.ReactElement).type === Tab
  );
  const tabPanels = React.Children.toArray(children).filter(
    (child) => (child as React.ReactElement).type === TabPanel
  );

  return (
    <div>
      <TabList handleOpenBottomModal={handleOpenBottomModal}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            isActive={activeTabIndex === index}
            onClick={() => setActiveTabIndex(index)}
          >
            {(tab as React.ReactElement).props.children}
          </Tab>
        ))}
      </TabList>
      <div>{tabPanels[activeTabIndex]}</div>
    </div>
  );
};

export const TabList: React.FC<{
  children: React.ReactNode;
  handleOpenBottomModal: () => void;
}> = ({ children, handleOpenBottomModal }) => {
  return (
    <div className="bg-[#73FF69] p-5 border-black border-b relative z-[2]">
      <DailyCheckInHeader handleOpenBottomModal={handleOpenBottomModal} />
      <div className="flex items-center whitespace-nowrap gap-x-2 mt-7">
        {children}
      </div>
    </div>
  );
};

export const Tab: React.FC<TabProps> = ({ children, isActive, onClick }) => {
  return (
    <button
      className={cn(
        "w-fit bg-white border border-black rounded-xl py-2 px-5 shadow-[3px_3px_black] z-[1]",
        !isActive
          ? "active:translate-x-[3px] translate-y-[3px]"
          : "shadow-none mt-2 bg-[#DFDFDF]"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const TabPanel: React.FC<TabPanelProps> = ({ children, className }) => {
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
    <div
      ref={listRef}
      style={{ height: listHeight }}
      className={cn(
        "py-5 no-scrollbar overflow-y-auto scroll-smooth will-change-scroll",
        className
      )}
    >
      {children}
    </div>
  );
};
