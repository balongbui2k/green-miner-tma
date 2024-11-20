import { CopyIcon, WalletIcon } from "@/components/icon.tsx";
import headerLayout from "@/assets/images/header-layout.png";
import { useRouterState } from "@tanstack/react-router";
import referrals from "@/assets/images/referrals.png";
import { CHAIN, useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import useProfile from "@/data/useProfile.ts";
import { toast } from "react-hot-toast";
import { cn, truncateFromMiddle } from "@/utils/index.tsx";
import ToastComponent from "./common/toast";
import { useEffect } from "react";
import { useTonConnect } from "@/hooks/useTonConnect";
import useWalletAddressMutation from "@/data/useAdressMutation";

const botName = import.meta.env.VITE_REACT_APP_BOT_NAME;

const VITE_REACT_APP_TON_CHAIN_NETWORK = import.meta.env
  .VITE_REACT_APP_TON_CHAIN_NETWORK;

const Header = () => {
  const router = useRouterState();
  const currentRoute = router.resolvedLocation.pathname;

  const { data: profile } = useProfile();

  const tonAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const { connected, network } = useTonConnect();
  const { updateWalletAddress } = useWalletAddressMutation();

  const copyLink = () => {
    navigator.clipboard.writeText(
      `https://t.me/${botName}/run?startapp=${profile?.telegram_id}`
    );
    toast.success("Link copied to clipboard");
  };

  const truncateAddress = () => truncateFromMiddle(tonAddress, 30, "...");

  const handleConnectWallet = () => {
    tonConnectUI.openModal();
  };

  const handleDisconnect = () => {
    tonConnectUI.disconnect();
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(tonAddress);
    toast.success("Wallet address copied to clipboard");
  };

  useEffect(() => {
    const currentNetwork = network === CHAIN.MAINNET ? "mainnet" : "testnet";

    if (!connected) {
      updateWalletAddress.mutate({ address: null });
      return;
    }

    if (VITE_REACT_APP_TON_CHAIN_NETWORK !== currentNetwork) {
      toast.custom(
        (t) => (
          <ToastComponent t={t} duration={3000}>
            <div className="ml-1">
              <p className="text-xs text-danger">Failed to connect</p>
              <p className="text-primary text-base">
                Wallet must be a valid wallet on Tonchain{" "}
                {VITE_REACT_APP_TON_CHAIN_NETWORK === "mainnet"
                  ? "Mainnet"
                  : "Testnet"}
              </p>
            </div>
          </ToastComponent>
        ),
        { duration: 3000 }
      );
      handleDisconnect();
    }

    updateWalletAddress.mutate({ address: tonAddress });
    return;
  }, [connected]);

  return (
    <section className="bg-[#73FF69] px-5 flex flex-col justify-center border-black border-b relative pt-5">
      <img
        src={headerLayout}
        alt="header-layout"
        className="absolute right-0 bottom-0"
      />

      <div className="w-full flex justify-between items-start">
        <div>
          <h1 className="dm-mono-medium text-lg">
            Hello,{" "}
            {profile?.username || `${profile?.lastname} ${profile?.firstname}`}
          </h1>
          <p className="text-sm dm-mono-regular">
            Let's mine anywhere you want!
          </p>
        </div>
        <button onClick={handleDisconnect} className="z-[1]">
          Sign out
        </button>
      </div>

      {currentRoute !== "/invite" ? (
        !connected ? (
          <button
            type="button"
            onClick={handleConnectWallet}
            className={cn(
              "dm-mono-medium text-xs",

              "bg-white border border-black rounded-xl shadow-[3px_3px_black] z-[1] flex items-center justify-center gap-x-2.5 py-2.5 px-5 my-5 transition-all ease-linear duration-75 active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
            )}
          >
            <WalletIcon />
            Connect Wallet
          </button>
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
        )
      ) : (
        <div className="bg-white p-3 z-[1] rounded-xl border border-black shadow-[4px_4px_black] translate-y-8">
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
