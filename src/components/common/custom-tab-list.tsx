import React from "react";
import { cn } from "@/utils/index.tsx";

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

export const Tabs: React.FC<TabsProps> = ({
  activeTabIndex,
  setActiveTabIndex,
  children,
}) => {
  const tabs = React.Children.toArray(children).filter(
    (child) => (child as React.ReactElement).type === Tab
  );
  const tabPanels = React.Children.toArray(children).filter(
    (child) => (child as React.ReactElement).type === TabPanel
  );

  return (
    <div>
      <TabList>
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
}> = ({ children }) => {
  return (
    <div className="flex items-center whitespace-nowrap gap-x-2 bg-[#73FF69] h-20 border-black border-b relative pl-5 pb-2">
      {children}
    </div>
  );
};

export const Tab: React.FC<TabProps> = ({ children, isActive, onClick }) => {
  return (
    <button
      className={cn(
        "w-fit bg-white border border-black rounded-xl py-2 px-5 shadow-[3px_3px_black] z-[2] ease-linear duration-75",
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

export const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return <div className="pt-5 py-7">{children}</div>;
};
