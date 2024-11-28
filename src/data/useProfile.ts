import { QUERY_KEY } from "@/data/keys.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import { useQuery } from "@tanstack/react-query";

export interface Profile {
  id: number;
  telegram_id: number;
  firstname: string;
  lastname: string;
  username: string;
  photo_url: string | undefined;
  wallet_address: string | null;
  is_premium: boolean;
  age: number;
  ref_count: number;
  ref_by: string | null;
  reward_for_referrer: string | null;
  balance: number;
  affiliate_balance: number;
  last_checkin: string;
  streak: number;
  created_at: string;
  updated_at: string;
}

export const fetchProfile = async (): Promise<Profile | undefined> => {
  try {
    const res = await axiosInstance.get("api/v1/users/me");
    if (res.status !== 200) {
      throw new Error("Error while fetching profile");
    }
    return res.data;
  } catch (error) {
    console.debug("🚀 ===== error:", error);
  }
};

export default function useProfile() {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_ACCOUNT_PROFILE],
    queryFn: () => fetchProfile(),
    staleTime: 60 * 1000 * 5, // 5 minutes
  });
}
