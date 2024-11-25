import headerLayout from "@/assets/images/header-layout.png";
import { useRouterState } from "@tanstack/react-router";
import { CHAIN, useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import useProfile from "@/data/useProfile";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useTonConnect } from "@/hooks/useTonConnect";
import ToastComponent from "./common/toast";
import useWalletAddressMutation from "@/data/useAdressMutation";
import HomeHeader from "@/components/ui/header/home";
import InviteHeader from "@/components/ui/header/invite";
import DailyCheckInHeader from "@/components/ui/header/daily-check-in";
import RentMinerHeader from "@/components/ui/header/rent-miner";

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

  const handleDisconnect = () => {
    tonConnectUI.disconnect();
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

  const renderHeaderContent = () => {
    switch (currentRoute) {
      case "/":
        return (
          <HomeHeader
            profile={profile}
            tonAddress={tonAddress}
            tonConnectUI={tonConnectUI}
            connected={connected}
          />
        );
      case "/invite":
        return <InviteHeader profile={profile} copyLink={copyLink} />;
      case "/rent-miner":
        return <RentMinerHeader />;
    }
  };

  return (
    <section className="bg-[#73FF69] p-5 flex flex-col justify-center border-black border-b relative z-[2]">
      <img
        src={headerLayout}
        alt="header-layout"
        className="absolute right-0 bottom-0"
      />

      {renderHeaderContent()}
    </section>
  );
};

export default Header;
