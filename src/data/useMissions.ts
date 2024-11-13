import { QUERY_KEY } from "@/data/keys.ts";
import axiosInstance from "@/utils/axios-instance.ts";
import { useQuery } from "@tanstack/react-query";

export enum MissionType {
  DEFAULT = "DEFAULT",
  ADD_ICON = "ADD_ICON",
}
export type Mission = {
  uuid: string;
  project: string;
  platform: string;
  image: string;
  link: string;
  actionLink: string;
  reward: number;
  type: MissionType;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userMissions: any[]; // You can replace `any` with the appropriate type
  completed: boolean;
};

export const fetchMissions = async () => {
  try {
    const res = await axiosInstance.get<Mission[]>(`/api/v1/users/missions`);
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
