import { QUERY_KEY } from "@/data/keys.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import { useQuery } from "@tanstack/react-query";

type Friends = {
  total: number;
  friends: Friend[];
  limit: string;
  offset: string;
};

export type Friend = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  isPremium: boolean;
  bonus: number;
  createdAt: Date;
};

export const fetchFriends = async () => {
  try {
    const res = await axiosInstance.get<Friends>(
      `/api/v1/users/friends`
    );
    if (res.status !== 200) {
      throw new Error("Error while fetching friends");
    }
    console.log("🚀 ~ fetchFriends ~ res:", res)
    return res.data ?? {};
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
