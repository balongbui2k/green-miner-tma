import { useEffect } from "react";
import {
  CHAIN,
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { useTonConnect } from "@/hooks/useTonConnect";
import { cn } from "@/utils";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import useWalletAddressMutation from "@/data/useAdressMutation";
import ToastComponent from "./common/toast";

const VITE_REACT_APP_TON_CHAIN_NETWORK = import.meta.env
  .VITE_REACT_APP_TON_CHAIN_NETWORK;

const WalletComponent = () => {
  const { updateWalletAddress } = useWalletAddressMutation();
  const { connected, network } = useTonConnect();

  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    // Disconnect the wallet and set connection state to false
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

    updateWalletAddress.mutate({ address });
    return;
  }, [connected]);

  return (
    <div>
      {connected ? (
        <div>
          <button
            className="absolute -top-2.5 left-2 flex justify-center w-10 h-10"
            onClick={handleDisconnect}
          >
            <img
              src="/assets/home/kebab-menu.svg"
              alt="This is disconnect wallet button"
              className="w-full h-full max-w-10 max-h-10 object-cover"
            />
          </button>

          {/* <button
            className="absolute -top-2.5 left-14 flex justify-center bg-[url(/assets/home/connect-wallet-container.svg)] bg-cover bg-no-repeat bg-center w-[176px] h-[43px] px-2"
            onClick={() => navigate({ to: "/daily-purchase" })}
          >
            <span className="text-primary text-sm font-normal my-auto">
              + Get more $HAPPY
            </span>
          </button> */}
        </div>
      ) : (
        <TonConnectButton
          className={cn(
            "absolute -top-2.5 left-2 flex justify-center bg-[url(/assets/home/connect-wallet-container.svg)] !w-[176px] !h-[43px] bg-cover bg-no-repeat bg-center px-2 py-0.5 [&_button]:py-2 [&_button]:px-3  [&_button_div]:!text-primary [&_button_div]:!font-sans [&_button_div]:!text-sm [&_button_div]:!font-normal [&_button_svg]:!hidden"
          )}
        />
      )}
    </div>
  );
};

export default WalletComponent;
