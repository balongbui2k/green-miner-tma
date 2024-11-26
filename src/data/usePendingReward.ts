import { QUERY_KEY } from "@/data/keys.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import { useQuery } from "@tanstack/react-query";

export type PendingReward = {
  id: string;
  quantity: number;
  total_speed: number;
  expried_at: string;
  last_claimed_at: number;
  plan_id: number;
  pending_reward: number;
};

export const fetchPendingReward = async () => {
  try {
    const res = await axiosInstance.get<PendingReward[] | undefined>(
      `api/v1/plans/mine/pending`
    );
    if (res.status !== 200) {
      throw new Error("Error while fetching reward");
    }
    return res.data;
  } catch (error) {
    console.debug("🚀 ===== error:", error);
  }
};

export default function usePendingReward() {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_PENDING_REWARD],
    queryFn: () => fetchPendingReward(),
  });
}
