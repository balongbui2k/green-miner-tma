import headerLayout from "@/assets/images/header-layout.png";
import { ArrowUpIcon, TonIcon } from "@/components/icon.tsx";
import type { Profile } from "@/data/useProfile.ts";
import { formatCurrency } from "@/utils/index.tsx";

const TokenInfoBanner = ({ profile }: { profile: Profile | undefined }) => {
  return (
    <div className="bg-white rounded-xl border border-black shadow-[4px_4px_black] p-4 w-full relative">
      <img
        src={headerLayout}
        alt="header-layout"
        className="absolute right-0 bottom-0"
      />

      <div className="flex items-center justify-between mb-5">
        <p className="dm-mono-medium text-2xl flex flex-col">
          {profile ? formatCurrency(profile?.balance, 2) : "---"}
          <span className="text-[#A1A1A1] text-sm dm-mono-medium">$GREEN</span>
        </p>

        <div className="bg-[#ABFF83] rounded-full w-8 h-8 shadow-[4px_1px_black] border border-black z-[1]" />
      </div>

      <p className="dm-mono-medium text-sm mb-2">Balance</p>

      <div className="flex items-center gap-x-3">
        <span className="text-white border border-black rounded-full p-2.5 bg-[#43ADFF] shadow-[3px_1px_black]">
          <TonIcon />
        </span>

        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col text-black">
            <p className="dm-mono-medium text-base">$TON</p>
            <p className="dm-mono-regular text-sm">--- $TON</p>
          </div>

          <span className="text-black p-2.5 bg-[#43FF46] rounded-lg border border-black shadow-[3px_3px_black] z-[1]">
            <ArrowUpIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TokenInfoBanner;
