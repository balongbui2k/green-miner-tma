import { QUERY_KEY } from "@/data/keys.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import { useQuery } from "@tanstack/react-query";

export type LeaderboardPayload = {
  success: boolean;
  data: {
    success: boolean;
    leaderboard: LeaderboardItem[];
    me: LeaderboardItem;
    total: number;
  };
};

export type LeaderboardItem = {
  id: number;
  userId: number;
  pointsEarnedToday: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    firstName: string;
    userName: string | null;
  };
};
export const fetchLeaderBoard = async () => {
  try {
    const res = await axiosInstance.get<LeaderboardPayload>(
      `/api/v1/leaderboard`
    );
    if (res.status !== 200) {
      throw new Error("Error while fetching friends");
    }
    return res.data;
  } catch (error) {
    console.debug("🚀 ===== error:", error);
  }
};

export default function useLeaderboard() {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_LEADERBOARD],
    queryFn: () => fetchLeaderBoard(),
    staleTime: 1000 * 60 * 5,
  });
}
