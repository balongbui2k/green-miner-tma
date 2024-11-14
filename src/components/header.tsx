import { FilterIcon, WalletIcon } from "@/components/icon.tsx";
import headerLayout from "@/assets/images/header-layout.png";
import { useRouterState } from "@tanstack/react-router";
import referrals from "@/assets/images/referrals.png";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import useProfile from "@/data/useProfile.ts";
import { toast } from "react-hot-toast";
import { AC_KEY } from "@/utils/constants.ts";

const botName = import.meta.env.VITE_REACT_APP_BOT_NAME;

const Header = () => {
  const router = useRouterState();
  const currentRoute = router.resolvedLocation.pathname;

  const { data: profile } = useProfile();

  const copyLink = () => {
    navigator.clipboard.writeText(
      `https://t.me/${botName}/run?startapp=${profile?.telegram_id}`
    );
    toast.success("Link copied to clipboard");
  };

  const tonAddress = useTonAddress();
  console.log("tonAddress>>>>>", tonAddress);
  const [tonConnectUI] = useTonConnectUI();

  const handleConnectWalletClick = async () => {
    try {
      if (!tonAddress) {
        await tonConnectUI.openModal();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDisConnectWalletClick = async () => {
    try {
      await tonConnectUI.disconnect();
      localStorage.removeItem(AC_KEY);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <section className="bg-[#73FF69] px-5 flex flex-col justify-center border-black border-b relative h-48">
      <img
        src={headerLayout}
        alt="header-layout"
        className="absolute right-0 bottom-0"
      />

      <div className="flex justify-between items-start mt-14 z-[1]">
        <div>
          <h1 className="dm-mono-medium text-lg">
            Hello,{" "}
            {profile?.username || `${profile?.lastname} ${profile?.firstname}`}
          </h1>
          <p className="text-sm dm-mono-regular">
            Let's mine anywhere you want!
          </p>
        </div>

        <button
          type="button"
          className="text-black outline-none hover:opacity-80 active:opacity-70"
        >
          <FilterIcon />
        </button>
      </div>

      {currentRoute !== "/invite" ? (
        <button
          type="button"
          onClick={
            tonAddress ? handleDisConnectWalletClick : handleConnectWalletClick
          }
          className="bg-white border border-black rounded-xl shadow-[3px_3px_black] z-[1] dm-mono-medium text-xs flex items-center justify-center gap-x-2.5 py-2.5 px-5 my-5
          transition-all ease-linear duration-75 active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
        >
          <WalletIcon />
          {tonAddress ? "Disconnect Wallet" : "Connect Wallet"}
        </button>
      ) : (
        <div className="bg-white p-3 z-[1] rounded-xl border border-black shadow-[4px_4px_black] translate-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <img
                src={referrals}
                alt="referrals"
                className="bg-white rounded-xl border border-black p-2 shadow-[3px_3px_black]"
              />

              <div className="space-y-1">
                <h2 className="dm-mono-medium text-xs">Referrals</h2>
                <p className="dm-mono-medium text-xl">{profile?.ref_count}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={copyLink}
              className="text-xs dm-mono-medium bg-[#43FF46] rounded-xl py-2.5 px-5 border border-black transition-all ease-linear duration-75
        shadow-[3px_3px_black] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
            >
              Invite link
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Header;
