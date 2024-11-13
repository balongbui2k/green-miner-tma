import axiosInstance from "@/utils/axios-instance.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "./keys.ts";
import type { TapSession } from "./useTapSession.ts";
import { toast } from "react-hot-toast";
import type { Profile } from "./useProfile.ts";

const useGamesMutation = () => {
  const queryClient = useQueryClient();

  const farmRabbit = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("api/v1/farming/start");

      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FETCH_CURRENT_FARMING],
      });

      toast.success("Farming session started!");
    },
    onError: () => {
      toast.error("You can only start one farming session per day.");
    },
  });

  const claimFarmRabbit = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("api/v1/farming/claim");

      return response.data;
    },
    onSuccess: async (data) => {
      const previousProfile: Profile | undefined = queryClient.getQueryData([
        QUERY_KEY.FETCH_ACCOUNT_PROFILE,
      ]);

      if (previousProfile) {
        queryClient.setQueryData([QUERY_KEY.FETCH_ACCOUNT_PROFILE], {
          ...previousProfile,
          memeCoinBalance: previousProfile.memeCoinBalance + data.reward,
        });
      }

      queryClient.setQueryData([QUERY_KEY.FETCH_CURRENT_FARMING], {});

      toast.success("You've claimed successfully!");
    },
  });

  const playFlipRabbit = useMutation({
    mutationFn: async ({
      betChoice,
      betAmount = 500,
    }: {
      betChoice: string;
      betAmount: number;
    }) => {
      const response = await axiosInstance.post(
        "api/v1/games/play-heads-or-tails",
        {
          betChoice,
          betAmount,
        }
      );

      return response.data;
    },
    onSuccess: async (data) => {
      if (data?.success) {
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.FETCH_ACCOUNT_PROFILE],
        });
      }
    },
  });

  const tap = useMutation({
    mutationFn: async ({ amount }: { amount: number }) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.FETCH_TAP_SESSION],
      });

      const previousSessionData: TapSession | undefined =
        queryClient.getQueryData([QUERY_KEY.FETCH_TAP_SESSION]);

      if (previousSessionData && previousSessionData.totalTaps >= 300) {
        return;
      }

      if (previousSessionData) {
        queryClient.setQueryData([QUERY_KEY.FETCH_TAP_SESSION], {
          ...previousSessionData,
          totalTaps: previousSessionData.totalTaps + 1,
          totalTokens: previousSessionData.totalTokens + amount,
        });
      }

      const session = await axiosInstance.post<TapSession>(
        "api/v1/tap/sessions/tap",
        {
          amount,
        }
      );

      return session;
    },
  });

  const tapClaim = useMutation({
    mutationFn: async () => {
      return await axiosInstance.post<TapSession>(
        "api/v1/tap/sessions/complete"
      );
    },
    onSuccess: async (data) => {
      if (data?.status === 201) {
        // toast.success('You have claimed your rewards');

        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.FETCH_TAP_SESSION],
        });

        await queryClient.refetchQueries({
          queryKey: [QUERY_KEY.FETCH_TAP_SESSION],
        });
        await queryClient.refetchQueries({
          queryKey: [QUERY_KEY.FETCH_ACCOUNT_PROFILE],
        });
      }
    },
  });

  return {
    playFlipRabbit,
    tap,
    tapClaim,
    farmRabbit,
    claimFarmRabbit,
  };
};

export default useGamesMutation;
