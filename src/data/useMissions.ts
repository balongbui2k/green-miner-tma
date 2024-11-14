import { QUERY_KEY } from "@/data/keys.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import { useQuery } from "@tanstack/react-query";

export type Mission = {
  action_link: string;
  content: string;
  created_at: string;
  deteled_at: string | null;
  id: string;
  image: string;
  is_completed: boolean;
  link: string;
  platform: string;
  project: string;
  reward: number;
  updated_at: string;
  user_missions: any[];
};

export const fetchMissions = async () => {
  try {
    const res = await axiosInstance.get<Mission[]>(`api/v1/missions/users`);
    if (res.status !== 200) {
      throw new Error("Error while fetching friends");
    }
    return res.data;
  } catch (error) {
    console.debug("🚀 ===== error:", error);
  }
};

export default function useMissions() {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_MISSIONS],
    queryFn: () => fetchMissions(),
  });
}
