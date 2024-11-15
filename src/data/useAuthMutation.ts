import axiosInstance from "@/utils/axios-instance.ts";
import { AC_KEY } from "@/utils/constants.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const useAuthMutation = () => {
  const signIn = useMutation({
    mutationFn: ({ initData }: { initData: string }) =>
      axiosInstance.post(`api/v1/auth/sign-in`, {
        initData,
      }),
    onSuccess: async (result) => {
      if (!result || result.status !== 200) {
        toast.error("Unable to sign in");
      } else {
        if (result.data) {
          localStorage.setItem(AC_KEY, result.data?.jwt);
        }
      }
    },
    onError: (error) => {
      console.log("🚀 ===== error:", error);
      toast.error("Unable to sign in");
    },
  });

  return {
    signIn,
  };
};

export default useAuthMutation;
