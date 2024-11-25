import { Logo } from "@/components/icon";
import useCheckInStatus, { DAILY_REWARDS } from "@/data/useCheckIn";
import useCheckInMutation from "@/data/useCheckInMutation";
import { cn } from "@/utils";
import calendarLayer from "@/assets/images/calendar-layer-2.png";
import logoLayout from "@/assets/images/logo-layout.png";
import leftLayer from "@/assets/images/left-big-streak-layer.png";
import rightLayer from "@/assets/images/right-big-streak-layer.png";

const CheckIn = () => {
  const { data: checkInStatus, isLoading } = useCheckInStatus();
  const { checkIn } = useCheckInMutation();

  if (isLoading) return <p>Preparing...</p>;

  const handleCheckIn = () => {
    checkIn.mutate();
    return;
  };

  return (
    <div className="grid grid-cols-2 gap-5 w-full px-6">
      {DAILY_REWARDS.map((reward, index) => {
        const checkedIn = checkInStatus
          ? Boolean(index + 1 <= (checkInStatus.streak || 0))
          : false;

        return (
          <button
            key={index}
            type="button"
            className={cn(
              "bg-white border-black border rounded-[11px] shadow-[5px_5px_black] flex flex-col items-center gap-2.5 relative",
              index === 6 && "col-span-2 ",
              checkedIn
                ? "shadow-none opacity-20"
                : "transition-all ease-linear duration-75 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
            )}
            onClick={
              index === checkInStatus?.streak ? handleCheckIn : undefined
            }
          >
            <img
              src={calendarLayer}
              alt="calendar-layer"
              draggable="false"
              className="absolute left-0 top-0 object-cover"
            />

            {index === 6 && (
              <>
                <img
                  src={logoLayout}
                  alt="calendar-layer"
                  draggable="false"
                  className="absolute left-1/2 -translate-y-1/3 -translate-x-1/2 top-1/2 object-cover"
                />
                <img
                  src={leftLayer}
                  alt="calendar-layer"
                  draggable="false"
                  className="absolute left-5 top-1/2 -translate-y-1/4 object-cover"
                />
                <img
                  src={rightLayer}
                  alt="calendar-layer"
                  draggable="false"
                  className="absolute right-5 top-1/2 -translate-y-5 object-cover"
                />
              </>
            )}

            <p className="bg-[#43FF46] dm-mono-medium py-1.5 text-sm border-black border rounded-[9px] shadow-[3px_3px_black] w-full">
              {index === 6
                ? `BIG STREAK - Day ${index + 1}`
                : `Day ${index + 1}`}
            </p>
            <p className="dm-mono-medium text-2xl">+{reward.reward}</p>

            <span className="mb-2.5 border border-black rounded-full py-1 px-1.5 bg-[#ABFF83] shadow-[3px_0.5px_black]">
              <Logo width={16} height={18} />
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CheckIn;
