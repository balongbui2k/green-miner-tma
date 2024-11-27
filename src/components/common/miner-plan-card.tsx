import { cn, formatCurrency } from "@/utils/index.tsx";
import { useState } from "react";
import usePlans, { type Plan } from "@/data/usePlans.ts";
import eco from "@/assets/images/miner-plans/eco.png";
import ecoLayer from "@/assets/images/miner-plans/eco-layer.png";
import standard from "@/assets/images/miner-plans/standard.png";
import standardLayer from "@/assets/images/miner-plans/standard-layer.png";
import gold from "@/assets/images/miner-plans/gold.png";
import goldLayer from "@/assets/images/miner-plans/gold-layer.png";
import { useTonConnect } from "@/hooks/useTonConnect.ts";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { MinusIcon, PlusIcon, SpinIcon } from "@/components/icon.tsx";
import { Cell } from "ton-core";
import { beginCell } from "ton-core";
import useProfile from "@/data/useProfile";
import useTonTransactionMutation from "@/data/useTonTransactionMutation";

const TON_DESTINATION_ADDRESS = import.meta.env
  .VITE_REACT_APP_TON_DESTINATION_ADDRESS;

const MinerPlanCard = () => {
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const [amount, setAmount] = useState<Record<number, number>>({});

  const { data: plans } = usePlans();
  const { data: profile } = useProfile();
  const { logsMinerTransaction } = useTonTransactionMutation();

  const { connected } = useTonConnect();
  const [tonConnectUI] = useTonConnectUI();

  const handlePurchaseTON = async (plan: Plan) => {
    if (!connected) {
      await tonConnectUI?.openModal();
      return;
    }

    setLoading({ [plan.id]: true });

    const body = beginCell()
      .storeUint(0, 32)
      .storeStringTail(`${profile?.id}:${plan.id}:${amount[plan.id] || 1}`)
      .endCell();

    try {
      const result = await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 600, // 5 minutes for user to approve,
        messages: [
          {
            address: TON_DESTINATION_ADDRESS,
            amount: `${plan.price * (amount[plan.id] || 1) * 1e9}`,
            payload: body.toBoc().toString("base64"),
          },
        ],
      });
      const hash = Cell.fromBase64(result.boc).hash().toString("base64");
      await logsMinerTransaction.mutateAsync({
        messageHash: hash,
        plan_id: plan.id,
        quantity: amount[plan.id] || 1,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading({ [plan.id]: false });
    }
  };

  const handleIncrement = (planId: number) => {
    setAmount({ ...amount, [planId]: (amount[planId] || 0) + 1 });
  };

  const handleDecrement = (planId: number) => {
    if ((amount[planId] || 0) > 1) {
      setAmount({ ...amount, [planId]: (amount[planId] || 0) - 1 });
    }
  };

  return (
    <>
      {plans?.map((miner) => {
        const planImage = { 1: eco, 2: standard, 3: gold }[miner.id] || "";
        const planLayerImage =
          { 1: ecoLayer, 2: standardLayer, 3: goldLayer }[miner.id] || "";
        const backgroundColor =
          { 1: "#FFFFFF", 2: "#FFFFCE", 3: "#FDF400" }[miner.id] || "";

        const estimateSpeed = miner.speed * (amount[miner.id] || 1);

        const price = miner.price * (amount[miner.id] || 1);

        return (
          <section key={miner.id}>
            <div className="bg-[#CAFFC3] rounded-xl border border-black shadow-[5px_5px_black] p-4 relative z-[1]">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-x-5 mb-2.5">
                  <img
                    src={planImage}
                    alt="eco"
                    style={{ backgroundColor }}
                    draggable={false}
                    className={cn(
                      "p-3 rounded-xl border border-black shadow-[3px_3px_black]"
                    )}
                  />
                  <h1 className="dm-mono-medium text-base text-black">
                    {miner.name}
                  </h1>
                </div>

                <div className="z-[1] flex flex-col items-center translate-x-4">
                  <p className="dm-mono-medium text-xs mb-0.5">Amount</p>

                  <div className="flex items-center justify-center">
                    <button
                      className="border border-black bg-[#ABFF83] p-1 translate-x-4 rounded-full shadow-[2px_0.5px_black] active:shadow-none ease-linear duration-75"
                      onClick={() => handleDecrement(miner.id)}
                    >
                      <MinusIcon />
                    </button>
                    <p className="bg-white border border-black px-[30px] rounded-[10px] shadow-[0px_3px_black] dm-mono-medium text-xl">
                      {amount[miner.id] || 1}
                    </p>
                    <button
                      className="border border-black bg-[#ABFF83] p-1 -translate-x-4 rounded-full shadow-[2px_0.5px_black] active:shadow-none ease-linear duration-75"
                      onClick={() => handleIncrement(miner.id)}
                    >
                      <PlusIcon size={12} />
                    </button>
                  </div>

                  <p className="dm-mono-light text-[7px] mt-1">
                    Estimate Speed:{" "}
                    <span className="dm-mono-medium text-[#009C0D]">
                      ~{estimateSpeed} GH/z
                    </span>
                  </p>

                  <p className="dm-mono-light text-[7px] mt-1">
                    Price:{" "}
                    <span className="dm-mono-medium text-[#009C0D]">
                      {price.toFixed(2)} {miner.currency}
                    </span>
                  </p>
                </div>
              </div>

              <img
                src={planLayerImage}
                alt="layer"
                className="absolute right-0 bottom-0"
                draggable={false}
              />

              <div className="flex items-end justify-between">
                <div className="flex flex-col w-full max-w-[170px] z-[1]">
                  <p className="flex items-center justify-between dm-mono-light text-xs">
                    Speed:
                    <span className="text-sm dm-mono-medium text-[#009C0D]">
                      {miner.speed} GH/z
                    </span>
                  </p>

                  <p className="flex items-center justify-between dm-mono-light text-xs">
                    Stock:
                    <span className="text-sm dm-mono-medium text-[#009C0D]">
                      {miner.stock > 1 ? "Available" : "Sold Out"}
                    </span>
                  </p>

                  <p className="flex items-center justify-between dm-mono-light text-xs">
                    Total Sold:
                    <span className="text-sm dm-mono-medium text-[#009C0D]">
                      {miner.sold}
                    </span>
                  </p>
                  <p className="flex items-center justify-between dm-mono-light text-xs">
                    Contract:
                    <span className="text-sm dm-mono-medium text-[#009C0D]">
                      {miner.contract_time}{" "}
                      {miner.contract_time < 1 ? "day" : "days"}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => handlePurchaseTON(miner)}
                  disabled={loading[miner.id]}
                  className={cn(
                    "rounded-xl py-2.5 px-8 border z-[1] border-black text-xs dm-mono-medium text-black",
                    loading[miner.id]
                      ? "bg-[#B8B8B8]"
                      : "bg-[#43FF46] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all duration-75 ease-linear will-change-auto shadow-[3px_3px_black]"
                  )}
                >
                  {loading[miner.id] ? (
                    <span>
                      <SpinIcon />
                    </span>
                  ) : (
                    `Buy`
                  )}
                </button>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default MinerPlanCard;
