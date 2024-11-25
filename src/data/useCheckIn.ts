import { QUERY_KEY } from "@/data/keys.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import { useQuery } from "@tanstack/react-query";

type CheckInStatus = {
  streak: number;
  last_checkin: string;
  reward: number;
};

export type DailyReward = {
  day: number;
  isSpecial: boolean;
  reward: number;
};

export const DAILY_REWARDS: DailyReward[] = [
  { day: 1, isSpecial: false, reward: 500 },
  { day: 2, isSpecial: false, reward: 1000 },
  { day: 3, isSpecial: false, reward: 2000 },
  { day: 4, isSpecial: false, reward: 3000 },
  { day: 5, isSpecial: false, reward: 4000 },
  { day: 6, isSpecial: false, reward: 5000 },
  { day: 7, isSpecial: true, reward: 15000 }, // Big day reward
];

const fetchCheckInStatus = async (): Promise<CheckInStatus | undefined> => {
  try {
    const res = await axiosInstance.post<CheckInStatus>(
      "api/v1/actions/checkin"
    );

    if (res.status !== 201) {
      throw new Error("Error while fetching check-in status");
    }
    return res.data;
  } catch (error) {
    console.debug("🚀 ===== error:", error);
    // throw error;
  }
};

export default function useCheckInStatus() {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_CHECK_IN_STATUS],
    queryFn: () => fetchCheckInStatus(),
  });
}
