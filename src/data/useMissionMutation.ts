import axiosInstance from "@/utils/axios-instance.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./keys.ts";
import { toast } from "react-hot-toast";

const useMissionsMutation = () => {
  const queryClient = useQueryClient();

  const doMission = useMutation({
    mutationFn: async ({ missionUuid } : { missionUuid: string }) => {
      console.log("🚀 ~ mutationFn: ~ missionUuid:", missionUuid)
      return axiosInstance.get(`api/v1/missions/${missionUuid}/do`);
    },
    onSuccess: async ({data}) => {
      if (data.success) {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        await queryClient.invalidateQueries([QUERY_KEY.FETCH_MISSIONS]);
      }
    },
    onError: async (data: any) => {
      toast.error(data.response.data.message)
    }
  })

  return {
    doMission
  }
}

export default useMissionsMutation;