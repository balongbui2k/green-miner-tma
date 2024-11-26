import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import DailyTasks from "@/components/ui/invite/daily-tasks";
import Earning from "@/components/ui/invite/earning";
import useFriends from "@/data/useFriends";

export const Route = createFileRoute("/_layout/invite")({
  component: Invite,
});

function Invite() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [listHeight, setListHeight] = useState<string>("auto");

  const { data: friendsData, isLoading } = useFriends();

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

  if (isLoading) {
    return <p className="text-white dm-mono-medium items-center">Loading...</p>;
  }

  const friendList = friendsData?.friends;

  return (
    <section
      ref={listRef}
      style={{ height: listHeight }}
      className="overflow-y-auto scroll-smooth no-scrollbar"
    >
      <div className="px-4 py-14">
        <Earning friendData={friendsData} />
        <DailyTasks friendList={friendList} />
      </div>
    </section>
  );
}

export default Invite;
