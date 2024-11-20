import axiosInstance from "@/utils/axios-instance.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const useReferralMutation = () => {
  const registerRef = useMutation({
    mutationFn: ({ code }: { code: string }) =>
      axiosInstance.post(`api/v1/users/ref`, {
        code,
      }),
    onSuccess: async (result) => {
      if (!result || result.status !== 201) {
        toast.error("Unable to register ref");
      }
    },
    onError: (error) => {
      console.log("🚀 ===== error:", error);
      toast.error("Unable to register referral");
    },
  });

  return {
    registerRef,
  };
};

export default useReferralMutation;
