import { RabbitsIcon, TonTokenIcon } from "@/components/icon.tsx";
import useProfile from "@/data/useProfile.ts";
import { formatCurrency } from "@/utils/index.tsx";
import { TonConnectButton } from "@tonconnect/ui-react";

const Wallet = () => {
  const { data: profile } = useProfile();

  return (
    <div className="bg-background text-white p-4 -mt-20 rounded-xl overflow-hidden space-y-4">
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-4">
          <p className="text-4xl font-bold">
            {profile ? formatCurrency(profile.memeCoinBalance) : "-"}
          </p>
          <RabbitsIcon />
        </div>
        <p>$RABBITS</p>
      </div>
      <TonConnectButton />
      <div className="space-y-1">
        <p className="text-sm text-subtext">Balance</p>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <TonTokenIcon />
            <div>
              <p className="font-bold">$TON</p>
              <p className="font-medium text-sm">-</p>
            </div>
          </div>
          {/* <button>Deposit</button> */}
          {/* <p>
            {network
              ? network === CHAIN.MAINNET
                ? "mainnet"
                : "testnet"
              : "N/A"}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
