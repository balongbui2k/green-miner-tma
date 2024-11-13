import axiosInstance from "@/utils/axios-instance.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./keys.ts";
import { toast } from "react-hot-toast";

const useProfileMutation = () => {
  const queryClient = useQueryClient();

  const claimMaturityReward = useMutation({
    mutationFn: async () => {
      return axiosInstance.post('api/v1/rewards/claim-maturity');
    },
    onSuccess: async (data) => {

      if (data?.data.success) {
        toast.success('Maturity reward claimed successfully');
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.FETCH_ACCOUNT_PROFILE]
        });
      }
    }
  })

  const claimPremiumReward = useMutation({
    mutationFn: async () => {
      return axiosInstance.post('api/v1/rewards/claim-premium');
    },
    onSuccess: async (data) => {
      if (data?.data.success) {
        toast.success('Premium reward claimed successfully');
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.FETCH_ACCOUNT_PROFILE]
        });
      }
    }
  })

  return {
    claimMaturityReward,
    claimPremiumReward
  }
}

export default useProfileMutation;