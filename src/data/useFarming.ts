import { QUERY_KEY } from "@/data/keys.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import { useQuery } from "@tanstack/react-query";

export interface FarmingData {
  id: number;
  startTime: number;
  endTime: number;
  earningsRate: number;
  createdAt: string;
  updatedAt: string;
}

export const fetchCurrentFarming = async () => {
  try {
    const res = await axiosInstance.get<FarmingData>(
      `/api/v1/farming`
    );

    if (res.status !== 200) {
      throw new Error("Error while fetching friends");
    }

    return res.data;
  } catch (error) {
    console.debug("🚀 ===== error:", error);
  }
};

export default function useFarming() {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_CURRENT_FARMING],
    queryFn: () => fetchCurrentFarming(),
  });
}
