import { CopyIcon, WalletIcon } from "@/components/icon.tsx";
import type { Profile } from "@/data/useProfile";
import { truncateFromMiddle } from "@/utils";
import { CHAIN, useTonConnectUI } from "@tonconnect/ui-react";
import toast from "react-hot-toast";
import { useTonConnect } from "@/hooks/useTonConnect";
import useWalletAddressMutation from "@/data/useAdressMutation";
import { useTonAddress } from "@tonconnect/ui-react";
import { useEffect } from "react";
import ToastComponent from "@/components/common/toast";

const VITE_REACT_APP_TON_CHAIN_NETWORK = import.meta.env
  .VITE_REACT_APP_TON_CHAIN_NETWORK;

const HomeHeader = ({ profile }: { profile: Profile | undefined }) => {
  const tonAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  const { connected, network } = useTonConnect();
  const { updateWalletAddress } = useWalletAddressMutation();

  const truncateAddress = () => truncateFromMiddle(tonAddress, 30, "...");

  const handleConnectWallet = () => {
    tonConnectUI.openModal();
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(tonAddress);
    toast.success("Wallet address copied to clipboard");
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
  return (
    <>
      <h1 className="dm-mono-medium text-lg">
        Hello,{" "}
        {profile?.username || `${profile?.lastname} ${profile?.firstname}`}
      </h1>
      <p className="text-sm dm-mono-regular">Let's mine anywhere you want!</p>
      {!connected ? (
        <section className="flex flex-col justify-between">
          <button
            type="button"
            onClick={handleConnectWallet}
            className="dm-mono-medium w-fit text-xs bg-white border border-black rounded-xl shadow-[3px_3px_black] z-[1] flex items-center justify-center gap-x-2.5 py-2 px-2.5 mt-5 transition ease-linear duration-75 active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
          >
            <WalletIcon />
            Connect Wallet
          </button>
        </section>
      ) : (
        <div className="text-sm dm-mono-regular mt-3 flex items-center justify-center gap-x-2 z-[1]">
          {truncateAddress()}

          <button
            type="button"
            onClick={copyAddress}
            className="active:opacity-80 hover:opacity-90"
          >
            <CopyIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default HomeHeader;
