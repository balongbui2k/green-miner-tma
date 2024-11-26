import { Logo } from "@/components/icon";

const Earning = () => {
  return (
    <div className="bg-white border dm-mono-medium border-black rounded-xl py-3 px-4 shadow-[4px_4px_black] w-full flex items-center justify-between">
      <p className="text-[13px]">Total Refs Earn:</p>
      <p className="flex items-center gap-x-2 text-2xl">
        100
        <span className="border border-black rounded-full py-1 px-[5px] bg-[#ABFF83] shadow-[3px_0.5px_black]">
          <Logo width={16} height={18} />
        </span>
      </p>
    </div>
  );
};

export default Earning;
