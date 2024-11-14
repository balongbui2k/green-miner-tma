import { QUERY_KEY } from "@/data/keys.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import { useQuery } from "@tanstack/react-query";

export interface Profile {
  id: number;
  age: number;
  balance: number;
  created_at: string;
  firstname: string;
  is_premium: boolean;
  lastname: string;
  photo_url: string | null;
  ref_by: string | null;
  ref_count: number;
  reward_for_referrer: string | null;
  telegram_id: number;
  updated_at: string;
  username: string;
  wallet_address: string | null;
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
  });
}
