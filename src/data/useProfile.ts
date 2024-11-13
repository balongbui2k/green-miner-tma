import { QUERY_KEY } from "@/data/keys.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import { useQuery } from "@tanstack/react-query";

export interface Profile {
  id: number;
  telegramId: string;
  firstName: string;
  lastName: string;
  userName: string;
  photoUrl: null;
  walletAddress: null;
  memeCoinBalance: number;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
  hasClaimedMaturityReward: boolean;
  hasClaimedPremiumReward: boolean;
  ref: null;
  lastCheckin: null;
  streak: number;
  age: number;
  ageReward: number;
  premiumReward: number;
  refCount: number;
}

export const fetchProfile = async (): Promise<Profile | undefined> => {
  try {
    const res = await axiosInstance.get(`api/v1/users/me`);
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
