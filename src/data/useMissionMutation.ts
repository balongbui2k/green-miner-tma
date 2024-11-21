import axiosInstance from "@/utils/axios-instance.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./keys.ts";
import { toast } from "react-hot-toast";

const useMissionsMutation = () => {
  const queryClient = useQueryClient();

  const doMission = useMutation({
    mutationFn: async ({ missionId }: { missionId: string }) => {
      console.log("🚀 ~ mutationFn: ~ missionUuid:", missionId);
      return axiosInstance.get(`api/v1/missions/do/${missionId}`);
    },
    onSuccess: async ({ data }) => {
      if (data.success) {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.FETCH_MISSIONS],
        });
      }
    },
    onError: async (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  return {
    doMission,
  };
};

export default useMissionsMutation;
