import axiosInstance from "@/utils/axios-instance.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./keys.ts";
import { toast } from "react-hot-toast";

const useCheckInMutation = () => {
  const queryClient = useQueryClient();

  const checkIn = useMutation({
    mutationFn: async () => {
      return axiosInstance.post(`api/v1/check-in`);
    },
    onSuccess: async ({data}) => {
      await queryClient.invalidateQueries([QUERY_KEY.FETCH_CHECKIN_STATUS]);
      toast.success(`Congratulations! You've successfully checked in and earned ${data.reward} RABBITS!`);
    },
    onError: async (data: any) => {
      toast.error(data.response.data.message)
    }
  })

  return {
    checkIn
  }
}

export default useCheckInMutation;