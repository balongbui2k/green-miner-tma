import { QUERY_KEY } from "@/data/keys.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import { useQuery } from "@tanstack/react-query";

type Plan = {
  id: number;
  name: string;
  logo: string;
  currency: string | null;
  speed: number;
  stock: number;
  contract_time: number;
  price: number;
  created_at: string;
  updated_at: string;
};

type Subscription = {
  id: string;
  quantity: number;
  total_speed: number;
  expried_at: string;
  last_claimed_at: string;
  created_at: string;
  updated_at: string;
  plan: Plan;
};

export const fetchMiner = async () => {
  try {
    const res = await axiosInstance.get<Subscription[] | undefined>(
      "api/v1/plans/mine"
    );
    if (res.status !== 200) {
      throw new Error("Error while fetching mine");
    }
    return res.data;
  } catch (error) {
    console.debug("🚀 ===== error:", error);
  }
};

export default function useMiner() {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_MINER],
    queryFn: () => fetchMiner(),
    staleTime: 1000 * 60 * 5,
  });
}
