import axiosInstance from "@/utils/axios-instance.ts";
import { useMutation } from "@tanstack/react-query";

const useTonTransactionMutation = () => {
  const logsMinerTransaction = useMutation({
    mutationFn: ({
      messageHash,
      plan_id,
      quantity,
    }: {
      messageHash: string;
      plan_id: number;
      quantity: number;
    }) =>
      axiosInstance.post("api/v1/ton-transactions/logs", {
        message_hash: messageHash,
        plan_id: plan_id,
        quantity: quantity,
      }),
  });

  return {
    logsMinerTransaction,
  };
};

export default useTonTransactionMutation;
