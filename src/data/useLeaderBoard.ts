import { QUERY_KEY } from "@/data/keys.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import { useQuery } from "@tanstack/react-query";

export type LeaderBoardPayload = {
  total: number;
  users: LeaderBoardItem[];
};

export type LeaderBoardItem = {
  id: number;
  firstname: string;
  lastname: string | null;
  username: string;
  balance: number;
};

export const fetchLeaderBoard = async () => {
  try {
    const res = await axiosInstance.get<LeaderBoardPayload | undefined>(
      `api/v1/leaderboards`
    );
    if (res.status !== 200) {
      throw new Error("Error while fetching friends");
    }
    return res.data;
  } catch (error) {
    console.debug("🚀 ===== error:", error);
  }
};

export default function useLeaderBoard() {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_LEADER_BOARD],
    queryFn: () => fetchLeaderBoard(),
    staleTime: 1000 * 60 * 5,
  });
}
