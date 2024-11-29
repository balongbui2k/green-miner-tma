import { createFileRoute } from "@tanstack/react-router";
import DailyTasks from "@/components/ui/invite/daily-tasks";
import Earning from "@/components/ui/invite/earning";
import useFriends from "@/data/useFriends";
import Header from "@/components/header";
import useDeviceHeightObserver from "@/hooks/useDeviceHeightObserver";

export const Route = createFileRoute("/_layout/invite")({
  component: Invite,
});

function Invite() {
  const { listHeight, listRef } = useDeviceHeightObserver();

  const { data: friendsData, isLoading } = useFriends();

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
      <Header />

      <div className="px-4 py-14">
        <Earning friendData={friendsData} />
        <DailyTasks friendList={friendList} />
      </div>
    </section>
  );
}

export default Invite;
