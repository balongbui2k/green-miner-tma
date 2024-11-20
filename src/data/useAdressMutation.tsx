import ToastComponent from "@/components/common/toast.tsx";
import axiosInstance from "@/utils/axios-instance.ts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const useWalletAddressMutation = () => {
  const updateWalletAddress = useMutation({
    mutationFn: ({ address }: { address: string | null }) =>
      axiosInstance.post("api/v1/users/update-wallet-address", {
        address,
      }),
    onSuccess: async (result) => {
      if (!result || result.status !== 201) {
        toast.custom(
          (t) => <ToastComponent t={t} text={result.data.message} />,
          {
            duration: 1000,
          }
        );
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      console.log("🚀 ===== error:", error);
      toast.custom(
        (t) => <ToastComponent t={t} text={error.response.data.message} />,
        {
          duration: 1000,
        }
      );
    },
  });

  return {
    updateWalletAddress,
  };
};

export default useWalletAddressMutation;
