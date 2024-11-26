import headerLayout from "@/assets/images/header-layout.png";
import { useRouterState } from "@tanstack/react-router";
import useProfile from "@/data/useProfile";
import { toast } from "react-hot-toast";
import HomeHeader from "@/components/ui/header/home";
import InviteHeader from "@/components/ui/header/invite";
import RentMinerHeader from "@/components/ui/header/rent-miner";
import DailyCheckInHeader from "./ui/header/daily-check-in";
import { cn } from "@/utils";

const botName = import.meta.env.VITE_REACT_APP_BOT_NAME;

const Header = ({
  handleOpenBottomModal,
}: {
  handleOpenBottomModal?: () => void;
}) => {
  const router = useRouterState();
  const currentRoute = router.resolvedLocation.pathname;

  const { data: profile } = useProfile();

  const copyLink = () => {
    navigator.clipboard.writeText(
      `https://t.me/${botName}/run?startapp=${profile?.telegram_id}`
    );
    toast.success("Link copied to clipboard");
  };

  const renderHeaderContent = () => {
    switch (currentRoute) {
      case "/":
        return <HomeHeader profile={profile} />;
      case "/invite":
        return <InviteHeader profile={profile} copyLink={copyLink} />;
      case "/daily-check-in":
        return (
          <DailyCheckInHeader
            handleOpenBottomModal={handleOpenBottomModal ?? (() => {})}
          />
        );
      case "/rent-miner":
        return <RentMinerHeader />;
    }
  };

  return (
    <section
      className={cn(
        "bg-[#73FF69] p-5 flex flex-col justify-center border-black border-b relative z-[2]",
        currentRoute === "/daily-check-in" && "border-none pb-0"
      )}
    >
      <img
        src={headerLayout}
        alt="header-layout"
        className={cn(
          "absolute right-0 bottom-0",
          currentRoute === "/daily-check-in" && "top-0 -translate-y-2"
        )}
      />
      {renderHeaderContent()}
    </section>
  );
};

export default Header;
