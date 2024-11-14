import { CompletedIcon, TonIcon } from "@/components/icon.tsx";

const Participate = ({
  tonAddress,
  participants,
  handleConnectWalletClick,
}: {
  tonAddress: string;
  participants: string;
  handleConnectWalletClick: () => void;
}) => {
  return (
    <div className="bg-white rounded-xl border border-black shadow-[4px_4px_black] px-2.5 py-4 w-full mt-5">
      <div className="flex items-end justify-center bg-[#D9D9D9] rounded-xl border-2 border-black">
        <p className="dm-mono-medium text-xs pt-32 pb-3 px-5">
          #FREEDUROR - 15 $TON Giveaway at 5M{" "}
        </p>
      </div>

      <hr className="my-4 border border-black" />

      <p className="text-[11px] dm-mono-regular text-[#6C6C6C] mb-3">
        3 lucky winners will be chosen through raffle <br />
        Ensure you have a non-custodial wallet. <br />
        Complete all the missions below to participate
      </p>

      <div className="flex items-center justify-between w-full mb-4">
        <p className="flex items-center gap-x-2 dm-mono-medium text-sm">
          <span className="text-white border border-black rounded-full p-2 bg-[#43ADFF] shadow-[3px_1px_black]">
            <TonIcon />
          </span>
          Connect your wallet
        </p>

        {tonAddress ? (
          <span className="border border-black rounded-lg p-2 bg-[#43FF46] shadow-[3px_3px_black]">
            <CompletedIcon size={17} />
          </span>
        ) : (
          <button
            type="button"
            onClick={handleConnectWalletClick}
            className="border border-black rounded-xl py-2 px-7 bg-[#ACACAC] shadow-[3px_3px_black] dm-mono-medium text-sm
        active:shadow-none active:translate-y-[3px] active:translate-x-[3px] transition-all duration-75 ease-linear"
          >
            Go
          </button>
        )}
      </div>

      <div className="flex flex-col items-center justify-center w-full px-8 gap-y-1.5">
        <p className="dm-mono-regular text-xs text-[#694B4B]">
          <span className="dm-mono-regular text-xs text-black">
            {participants}{" "}
          </span>
          Participants
        </p>

        <button
          type="button"
          className="text-[#505050] bg-[#6F9B6F] border border-black rounded-xl py-2 w-full dm-mono-medium text-sm
      shadow-[3px_3px_black] active:shadow-none active:translate-y-[3px] active:translate-x-[3px] transition-all duration-75 ease-linear"
        >
          Participate
        </button>
      </div>

      <p className="text-[#A1A1A1] dm-mono-regular text-[11px] mt-4 text-center">
        *Results will be announced at 5AM signatures
      </p>
    </div>
  );
};

export default Participate;
