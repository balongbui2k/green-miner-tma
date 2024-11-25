import { createFileRoute } from "@tanstack/react-router";
import Earning from "@/components/ui/invite/earning.tsx";
import DailyTasks from "@/components/ui/invite/daily-tasks.tsx";
import { useRef, useState, useEffect } from "react";

export const Route = createFileRoute("/_layout/invite")({
  component: Invite,
});

function Invite() {
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
      className="overflow-y-auto scroll-smooth no-scrollbar"
    >
      <div className="px-4 py-14">
        <Earning />

        <DailyTasks />
      </div>
    </section>
  );
}

export default Invite;
