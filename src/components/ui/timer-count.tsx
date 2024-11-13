// import dayjs from "dayjs";
import useCountdown from "@/hooks/useCountdown.ts";
import TimerDialog from "../../assets/svgs/timer-dialog.svg";
import type { FarmingData } from "@/data/useFarming.ts";

export const TimerCount = ({
  currentFarming,
}: {
  currentFarming: FarmingData;
}) => {
  const { hours, minutes, seconds } = useCountdown(
    currentFarming?.endTime ?? 0
  );

  return (
    <div className="relative">
      <TimerDialog />

      <span className="text-xs font-normal tracking-widest font-pixelSansSerif absolute top-1/2 -translate-y-1/2 left-1/4 mt-0.5">
        {hours}:{minutes}:{seconds}
      </span>
    </div>
  );
};
