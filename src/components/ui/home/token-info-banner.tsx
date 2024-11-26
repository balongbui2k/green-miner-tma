import headerLayout from "@/assets/images/header-layout.png";
import { Logo, TonIcon } from "@/components/icon.tsx";
import { formatCurrency } from "@/utils/index.tsx";

const TokenInfoBanner = ({ userBalance }: { userBalance: number }) => {
  return (
    <div className="bg-white rounded-xl border border-black shadow-[4px_4px_black] p-4 w-full relative">
      <img
        src={headerLayout}
        alt="header-layout"
        className="absolute right-0 bottom-0"
      />

      <div className="flex items-start justify-between mb-5">
        <p className="dm-mono-medium text-2xl flex flex-col">
          {formatCurrency(userBalance, 2)}
          <span className="text-[#A1A1A1] text-sm dm-mono-medium">$GREEN</span>
        </p>

        <span className="bg-[#ABFF83] rounded-full shadow-[4px_1px_black] border border-black z-[1] p-1.5 w-fit">
          <Logo width={16} height={18} />
        </span>
      </div>

      <p className="dm-mono-medium text-sm mb-2">Balance</p>

      <div className="flex items-center gap-x-3">
        <span className="text-white border border-black rounded-full p-2.5 bg-[#43ADFF] shadow-[3px_1px_black]">
          <TonIcon />
        </span>

        <div className="flex flex-col text-black">
          <p className="dm-mono-medium text-base">$TON</p>
          <p className="dm-mono-regular text-sm">--- $TON</p>
        </div>
      </div>
    </div>
  );
};

export default TokenInfoBanner;
