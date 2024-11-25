import { CopyIcon, WalletIcon } from "@/components/icon.tsx";
import type { Profile } from "@/data/useProfile";
import { truncateFromMiddle } from "@/utils";
import type { TonConnectUI } from "@tonconnect/ui-react";
import toast from "react-hot-toast";

const HomeHeader = ({
  tonAddress,
  tonConnectUI,
  connected,
  profile,
}: {
  tonAddress: string;
  tonConnectUI: TonConnectUI;
  connected: boolean;
  profile: Profile | undefined;
}) => {
  const truncateAddress = () => truncateFromMiddle(tonAddress, 30, "...");

  const handleConnectWallet = () => {
    tonConnectUI.openModal();
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(tonAddress);
    toast.success("Wallet address copied to clipboard");
  };
  return !connected ? (
    <section className="flex flex-col justify-between">
      <h1 className="dm-mono-medium text-lg">
        Hello,{" "}
        {profile?.username || `${profile?.lastname} ${profile?.firstname}`}
      </h1>
      <p className="text-sm dm-mono-regular">Let's mine anywhere you want!</p>
      <button
        type="button"
        onClick={handleConnectWallet}
        className="dm-mono-medium w-fit text-xs bg-white border border-black rounded-xl shadow-[3px_3px_black] z-[1] flex items-center justify-center gap-x-2.5 py-2 px-2.5 mt-5 transition-all ease-linear duration-75 active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
      >
        <WalletIcon />
        Connect Wallet
      </button>
    </section>
  ) : (
    <div className="text-sm my-5 flex items-center justify-center gap-x-2 z-[1]">
      {truncateAddress()}

      <button
        type="button"
        onClick={copyAddress}
        className="active:opacity-80 hover:opacity-90"
      >
        <CopyIcon />
      </button>
    </div>
  );
};

export default HomeHeader;
