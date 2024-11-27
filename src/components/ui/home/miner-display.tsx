import eco from "@/assets/images/miner-plans/eco.png";
import standard from "@/assets/images/miner-plans/standard.png";
import gold from "@/assets/images/miner-plans/gold.png";
import { Logo } from "@/components/icon";
import Loader from "@/components/common/loader";
import cloudMining from "@/assets/images/mining.gif";
import cloudMiningLayer from "@/assets/images/cloud-mining.png";
import useMiner from "@/data/useMiner";
import type { PendingReward } from "@/data/usePendingReward";
import { formatCurrency } from "@/utils";

const MinerDisplay = ({
  claimReward,
  handleClaimReward,
}: {
  claimReward: PendingReward[];
  handleClaimReward: () => void;
}) => {
  const { data: minerData, isLoading, isError } = useMiner();

  const totalReward = formatCurrency(
    claimReward.reduce((sum, item) => sum + item.pending_reward, 0),
    2
  );

  if (isLoading)
    return (
      <p className="flex justify-center items-center dm-mono-medium text-base">
        Loading...
      </p>
    );

  if (isError)
    return (
      <p className="flex justify-center items-center dm-mono-medium text-base">
        Error loading data...
      </p>
    );
  const groupedData = Object.values(
    minerData?.reduce((acc: { [key: number]: any }, miner) => {
      if (acc[miner.plan.id]) {
        acc[miner.plan.id].quantity += miner.quantity;
      } else {
        acc[miner.plan.id] = { ...miner };
      }
      return acc;
    }, {}) || []
  );

  const totalSpeed =
    minerData?.reduce((sum, item) => sum + item.total_speed, 0) || 0;

  return (
    <section className="bg-white rounded-xl border border-black shadow-[4px_4px_black] px-4 py-5 w-full mt-5">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between gap-x-3.5">
          {groupedData.map((miner) => {
            const planImage =
              { 1: eco, 2: standard, 3: gold }[miner.plan.id as number] || "";

            const backgroundColor =
              { 1: "#FFFFFF", 2: "#FFFFCE", 3: "#FDF400" }[
                miner.plan.id as number
              ] || "";

            return (
              <div key={miner.id} className="flex items-center gap-x-2">
                <img
                  src={planImage}
                  style={{ backgroundColor: backgroundColor }}
                  alt="miner icon"
                  className="p-1.5 border border-black rounded-lg shadow-[3px_3px_black] w-8 h-8 object-cover"
                />
                <p className="text-black dm-mono-medium text-base pt-0.5">
                  {miner.quantity}
                </p>
              </div>
            );
          })}
        </div>

        {/* <button type="button">
          <p className="text-black dm-mono-medium text-sm">View all</p>
          <hr className="border border-black" />
        </button> */}
      </div>

      <div className="flex items-center justify-center relative mt-12 mb-9">
        <img
          src={cloudMining}
          alt="mining image"
          draggable="false"
          className="z-[1] object-cover"
          loading="lazy"
        />
        <img src={cloudMiningLayer} alt="minerLayer" className="absolute" />
      </div>

      <div className="border-2 border-black bg-[#D9D9D9] rounded-xl px-4 py-3">
        <p className="flex items-center justify-between mb-3">
          <span className="dm-mono-light text-xs">Total speed:</span>
          <span className="dm-mono-medium text-xs text-[#009C0D]">
            {totalSpeed} GH/z
          </span>
        </p>

        <div className="flex items-center gap-x-3 mb-6">
          <span className="border border-black rounded-full p-1.5 bg-[#ABFF83] shadow-[3px_1px_black]">
            <Logo width={16} height={18} />
          </span>

          <div className="flex items-center justify-between w-full">
            <div className="flex items-end gap-x-2">
              <p className="dm-mono-medium text-sm">Earning</p>
              <Loader />
            </div>

            <p className="dm-mono-medium text-2xl">{totalReward}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClaimReward}
          className="border border-black bg-[#ABFF83] text-sm dm-mono-medium shadow-[4px_4px_black] py-3 w-full rounded-xl transition-all ease-linear duration-75 active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
        >
          Claim
        </button>
      </div>
    </section>
  );
};

export default MinerDisplay;
