import { QUERY_KEY } from "@/data/keys.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import { useQuery } from "@tanstack/react-query";

type Friend = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  photo_url: string | undefined;
  is_premium: boolean;
  reward_for_referrer: string | null;
  created_at: string;
  bonus: string | null;
};

type Friends = {
  total_bonus: number;
  friends: Friend[];
};

export const fetchFriends = async () => {
  try {
    const res = await axiosInstance.get<Friends | undefined>(
      `api/v1/users/friends`
    );
    if (res.status !== 200) {
      throw new Error("Error while fetching friends");
    }
    console.log("🚀 ~ fetchFriends ~ res:", res);
    return res.data;
  } catch (error) {
    console.debug("🚀 ===== error:", error);
  }
};

export default function useFriends() {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_FRIENDS],
    queryFn: () => fetchFriends(),
  });
}
