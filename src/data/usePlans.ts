import { QUERY_KEY } from "@/data/keys.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import { useQuery } from "@tanstack/react-query";

export type Plan = {
  contract_time: number;
  created_at: string;
  id: number;
  logo: string;
  name: string;
  price: number;
  speed: number;
  stock: number;
  sold: number;
  currency: string;
  updated_at: string;
};

export const fetchPlans = async () => {
  try {
    const res = await axiosInstance.get<Plan[] | undefined>(`api/v1/plans`);
    if (res.status !== 200) {
      throw new Error("Error while fetching plans");
    }
    return res.data;
  } catch (error) {
    console.debug("🚀 ===== error:", error);
  }
};

export default function usePlans() {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_PLANS],
    queryFn: () => fetchPlans(),
  });
}
