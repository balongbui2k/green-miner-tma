// import { StarDialog } from "../icon.tsx"
import type { FarmingData } from "@/data/useFarming.ts";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import StarDialog from "@/assets/svgs/star-dialog.svg";

export const TapCount = ({
  currentFarming,
}: {
  currentFarming: FarmingData;
}) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    const updateElapsedTime = () => {
      const now = dayjs().unix();
      const elapsed =
        Math.min(now, currentFarming.endTime) - currentFarming.startTime;
      setElapsedTime(elapsed); // Convert milliseconds to seconds
    };

    updateElapsedTime();

    const intervalId = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(intervalId);
  }, [currentFarming.startTime, currentFarming.endTime]);

  const calculateEarnings = (earnRate: number, elapsedTime: number): number => {
    return earnRate * elapsedTime;
  };

  const earned = calculateEarnings(currentFarming.earningsRate, elapsedTime);

  return (
    <div className="relative">
      <StarDialog />

      <span className="text-xs font-normal font-pixelSansSerif absolute left-1/3 top-1/2 -translate-y-1/2 mt-0.5">
        {earned ? earned.toFixed(4) : 0}
      </span>
    </div>
  );
};
