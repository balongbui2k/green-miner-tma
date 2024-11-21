import axiosInstance from "@/utils/axios-instance.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const useClaimMutation = () => {
  const claimReward = useMutation({
    mutationFn: () => axiosInstance.post(`api/v1/plans/claim-all`),
    onSuccess: async (result) => {
      if (!result || result.status !== 201) {
        toast.error("Unable to claim reward");
      }
    },
    onError: (error) => {
      console.log("🚀 ===== error:", error);
      toast.error("Unable to register referral");
    },
  });

  return {
    claimReward,
  };
};

export default useClaimMutation;
