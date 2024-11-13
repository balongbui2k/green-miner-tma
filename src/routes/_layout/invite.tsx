import { createFileRoute } from "@tanstack/react-router";
// import { toast } from "react-hot-toast";
// import useProfile from "@/data/useProfile.ts";
import Earning from "@/components/ui/invite/earning.tsx";
import DailyTasks from "@/components/ui/invite/daily-tasks.tsx";

export const Route = createFileRoute("/_layout/invite")({
  component: Invite,
});

// const botName = import.meta.env.VITE_REACT_APP_BOT_NAME;

function Invite() {
  // const { data: profile } = useProfile();

  // const copyLink = () => {
  //   navigator.clipboard.writeText(
  //     `https://t.me/${botName}/run?startapp=${profile?.telegramId}`
  //   );
  //   toast.success("Link copied to clipboard");
  // };

  // const handleShareButton = () => {
  //   const url = `https://t.me/${botName}/run?startapp=${profile?.telegramId}`;
  //   const text = "Rabbits running on the jungle";
  //   const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  //   window.open(telegramUrl, "_blank", "noopener,noreferrer");
  // };

  return (
    <section className="py-16 px-4 overflow-y-auto h-[calc(100vh-280px)] scroll-smooth no-scrollbar">
      <Earning />

      <DailyTasks />
    </section>
  );
}

export default Invite;
