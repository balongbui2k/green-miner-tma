import { QUERY_KEY } from "@/data/keys.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import { useQuery } from "@tanstack/react-query";

type CheckinStatus = {
  streak: number;
  nextReward: number;
};

export type DailyReward = {
  day: number;
  isSpecial: boolean;
  reward: number;
};

export const DAILY_REWARDS: DailyReward[] = [
  { day: 1, isSpecial: false, reward: 100 },
  { day: 2, isSpecial: false, reward: 200 },
  { day: 3, isSpecial: false, reward: 400 },
  { day: 4, isSpecial: false, reward: 1000 },
  { day: 5, isSpecial: false, reward: 1500 },
  { day: 6, isSpecial: false, reward: 2500 },
  { day: 7, isSpecial: true, reward: 4500 }, // Big day reward
];


const fetchCheckinStatus = async (): Promise<CheckinStatus> => {
  try {
    const res = await axiosInstance.get<CheckinStatus>("/api/v1/check-in");

    if (res.status !== 200) {
      throw new Error("Error while fetching check-in status");
    }
    return res.data;
  } catch (error) {
    console.debug("🚀 ===== error:", error);
    // throw error;
    return { streak: 0, nextReward: 500 };
  }
};

export default function useCheckInStatus() {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_CHECKIN_STATUS],
    queryFn: () => fetchCheckinStatus(),
  });
}
