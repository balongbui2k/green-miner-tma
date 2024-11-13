import { cn } from "@/utils/index.tsx";
import { minerPlans } from "@/data/test/index.ts";

const MinerPlanCard = () => {
  return (
    <div className="space-y-7">
      {minerPlans.map((miner) => {
        return (
          <div
            key={miner.plan}
            className="bg-[#CAFFC3] rounded-xl border border-black shadow-[5px_5px_black] px-5 py-3 relative z-[1]"
          >
            <div className="flex items-center gap-x-5 mb-2.5 ">
              <img
                src={miner.icon}
                alt="eco"
                style={{ backgroundColor: miner.color }}
                draggable={false}
                className={cn(
                  "p-3 rounded-xl border border-black shadow-[3px_3px_black]"
                )}
              />
              <h1 className="dm-mono-medium text-base text-black">
                {miner.plan} Plan
              </h1>
            </div>

            <img
              src={miner.layer}
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
                  Availability:
                  <span className="text-sm dm-mono-medium text-[#009C0D]">
                    {miner.availability}
                  </span>
                </p>
                <p className="flex items-center justify-between dm-mono-light text-xs">
                  Withdrawal:
                  <span className="text-sm dm-mono-medium text-[#009C0D]">
                    {miner.withdrawal}
                  </span>
                </p>
                <p className="flex items-center justify-between dm-mono-light text-xs">
                  Contract:
                  <span className="text-sm dm-mono-medium text-[#009C0D]">
                    {miner.contract}
                  </span>
                </p>
              </div>

              <button
                className="bg-[#43FF46] rounded-xl py-2.5 px-5 border z-[1] border-black transition-all duration-75 ease-linear will-change-auto shadow-[3px_3px_black] text-xs dm-mono-medium text-black
              active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
              >
                {miner.price} USD
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MinerPlanCard;
