const Earning = () => {
  return (
    <div className="flex items-center justify-between gap-1.5">
      <div className="bg-white border border-black text-center rounded-xl py-3 px-1 flex flex-col items-center shadow-[4px_4px_black] w-full">
        <p className="dm-mono-medium text-[13px] mb-1.5">Epoch 1 Earnings:</p>

        <p className="dm-mono-medium text-4xl">100</p>
        <div className="bg-[#ABFF83] border border-black shadow-[4px_1px_black] rounded-full w-8 h-8"></div>

        <p className="dm-mono-medium text-[10px] text-[#939393] mt-1.5">
          Uptime: 0 day, 0 hr, 0 min
        </p>
      </div>
      <div className="bg-white border border-black text-center rounded-xl py-3 px-1 flex flex-col items-center shadow-[4px_4px_black] w-full">
        <p className="dm-mono-medium text-[13px] mb-1.5">Today's Earnings:</p>

        <p className="dm-mono-medium text-4xl">100</p>
        <div className="bg-[#ABFF83] border border-black shadow-[4px_1px_black] rounded-full w-8 h-8"></div>

        <p className="dm-mono-medium text-[10px] text-[#939393] mt-1.5">
          Uptime: 0 day, 0 hr, 0 min
        </p>
      </div>
    </div>
  );
};

export default Earning;
