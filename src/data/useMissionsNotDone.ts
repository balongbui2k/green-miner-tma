import { QUERY_KEY } from "@/data/keys.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import { useQuery } from "@tanstack/react-query";
import type { Mission } from "./useMissions.ts";

export const fetchMissionsNotDone = async () => {
  try {
    const res = await axiosInstance.get<Mission[]>(`/api/v1/missions/not-done`);
    if (res.status !== 200) {
      throw new Error("Error while fetching missions not done");
    }
    return res.data;
  } catch (error) {
    console.debug("🚀 ===== error:", error);
  }
};

export default function useMissionsNotDone() {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_MISSIONS_NOT_DONE],
    queryFn: () => fetchMissionsNotDone(),
  });
}
