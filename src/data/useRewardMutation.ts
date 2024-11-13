// import { ROUTER_URLS } from "@/constants";
// import QUERY_KEY from "@/data/keys";
// import axiosInstance from "@/libs/axios-instance";
// import { toast } from "@/libs/hooks/useToast";
// import { getErrorMessage } from "@/libs/utils";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/router";

// type AccountRegistrationType = {
//   firstname: string;
//   lastname: string;
//   email: string;
//   group: number;
//   customer: number;
//   type: number;
// };

// const useRewardMutation = () => {
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   const sendInvitation = useMutation({
//     mutationFn: ({ data }: { data: Omit<AccountRegistrationType, "group"> }) =>
//       axiosInstance.post(`/auth/register`, {
//         firstname: data.firstname,
//         lastname: data.lastname,
//         email: data.email,
//         group: 1,
//         customer: data.customer,
//         type: data.type,
//       }),
//     onSuccess: async (result, variables) => {
//       if (!result || result.status !== 201) {
//         toast({
//           title: "Unable to create new account",
//           description: "Sorry, something went wrong. Please try again.",
//           variant: "error",
//           duration: 3000,
//         });
//       } else {
//         toast({
//           title: "New account created",
//           description: `Account ${variables.data.email} has been successfully created.`,
//           variant: "success",
//           duration: 3000,
//         });
//         void router.push(ROUTER_URLS.USERS);
//       }
//     },
//     onError: (error) => {
//       toast({
//         title: "Unable to create new account",
//         description: `Sorry, something went wrong. Please try again. Reason: ${getErrorMessage(error)}`,
//         variant: "error",
//         duration: 3000,
//       });
//     },
//   });

//   const renewInvitation = useMutation({
//     mutationFn: ({ data }: { data: { uid: number; email: string } }) =>
//       axiosInstance.post(`/users/invitation/${data.uid}/renew`, {
//         email: data.email,
//       }),
//     onSuccess: async (result, variables) => {
//       if (!result || result.status !== 200) {
//         toast({
//           title: "Unable to renew invitation",
//           description: "Sorry, something went wrong. Please try again.",
//           variant: "error",
//           duration: 3000,
//         });
//       } else {
//         toast({
//           title: "Invitation renewed",
//           description: `Invitation for account ${variables.data.email} has been successfully renewed.`,
//           variant: "success",
//           duration: 3000,
//         });
//         void queryClient.invalidateQueries({
//           queryKey: [QUERY_KEY.FETCH_ACCOUNT_LIST],
//         });
//       }
//     },
//     onError: (error) => {
//       toast({
//         title: "Unable to renew invitation",
//         description: `Sorry, something went wrong. Please try again. Reason: ${getErrorMessage(error)}`,
//         variant: "error",
//         duration: 3000,
//       });
//     },
//   });

//   const revokeInvitation = useMutation({
//     mutationFn: ({ data }: { data: { uid: number; email: string } }) =>
//       axiosInstance.post(`/users/invitation/${data.uid}/revoke`, {
//         email: data.email,
//       }),
//     onSuccess: async (result, variables) => {
//       if (!result || result.status !== 200) {
//         toast({
//           title: "Unable to revoke invitation",
//           description: "Sorry, something went wrong. Please try again.",
//           variant: "error",
//           duration: 3000,
//         });
//       } else {
//         toast({
//           title: "Invitation revoked",
//           description: `Invitation for account ${variables.data.email} has been successfully revoked.`,
//           variant: "success",
//           duration: 3000,
//         });
//         void queryClient.invalidateQueries({
//           queryKey: [QUERY_KEY.FETCH_ACCOUNT_LIST],
//         });
//       }
//     },
//     onError: (error) => {
//       toast({
//         title: "Unable to revoke invitation",
//         description: `Sorry, something went wrong. Please try again. Reason: ${getErrorMessage(error)}`,
//         variant: "error",
//         duration: 3000,
//       });
//     },
//   });

//   const deactivateAccount = useMutation({
//     mutationFn: ({ data }: { data: { uid: number; email: string } }) =>
//       axiosInstance.post(`/users/${data.uid}/deactivate`),
//     onSuccess: async (result, variables) => {
//       if (!result || result.status !== 200) {
//         toast({
//           title: "Unable to deactivate account",
//           description: "Sorry, something went wrong. Please try again.",
//           variant: "error",
//           duration: 3000,
//         });
//       } else {
//         toast({
//           title: "Account deactivated",
//           description: `Account ${variables.data.email} has been successfully deactivated.`,
//           variant: "success",
//           duration: 3000,
//         });
//         void queryClient.invalidateQueries({
//           queryKey: [QUERY_KEY.FETCH_ACCOUNT_LIST],
//         });
//       }
//     },
//     onError: (error) => {
//       toast({
//         title: "Unable to deactivate account",
//         description: `Sorry, something went wrong. Please try again. Reason: ${getErrorMessage(error)}`,
//         variant: "error",
//         duration: 3000,
//       });
//     },
//   });

//   const activateAccount = useMutation({
//     mutationFn: ({ data }: { data: { uid: number; email: string } }) =>
//       axiosInstance.post(`/users/${data.uid}/activate`, {
//         email: data.email,
//       }),
//     onSuccess: async (result, variables) => {
//       if (!result || result.status !== 200) {
//         toast({
//           title: "Unable to activate account",
//           description: "Sorry, something went wrong. Please try again.",
//           variant: "error",
//           duration: 3000,
//         });
//       } else {
//         toast({
//           title: "Account activated",
//           description: `Account ${variables.data.email} has been successfully activated`,
//           variant: "success",
//           duration: 3000,
//         });
//         void queryClient.invalidateQueries({
//           queryKey: [QUERY_KEY.FETCH_ACCOUNT_LIST],
//         });
//       }
//     },
//     onError: (error) => {
//       toast({
//         title: "Unable to activate account",
//         description: `Sorry, something went wrong. Please try again. Reason: ${getErrorMessage(error)}`,
//         variant: "error",
//         duration: 3000,
//       });
//     },
//   });

//   const activateAccountInvitation = useMutation({
//     mutationFn: ({ data }: { data: { code: string } }) =>
//       axiosInstance.post(`/users/invitation/activate?code=${data.code}`),
//     onSuccess: async (result) => {
//       return result;
//     },
//     onError: (error) => {
//       return error;
//     },
//   });

//   const updateUserAccountDetail = useMutation({
//     mutationFn: ({
//       data,
//     }: {
//       data: Omit<AccountRegistrationType & { uid: number }, "group">;
//     }) =>
//       axiosInstance.post(`/users/${data.uid}/update`, {
//         firstname: data.firstname,
//         lastname: data.lastname,
//         customer: data.customer,
//         type: data.type,
//       }),
//     onSuccess: async (result, variables) => {
//       if (!result || result.status !== 200) {
//         toast({
//           title: "Unable to update user account",
//           description: "Sorry, something went wrong. Please try again.",
//           variant: "error",
//           duration: 3000,
//         });
//       } else {
//         toast({
//           title: "User account updated",
//           description: `Account ${variables.data.email} has been successfully updated`,
//           variant: "success",
//           duration: 3000,
//         });
//         void router.push(ROUTER_URLS.USERS);
//       }
//     },
//     onError: (error) => {
//       toast({
//         title: "Unable to update user account",
//         description: `Sorry, something went wrong. Please try again. Reason: ${getErrorMessage(error)}`,
//         variant: "error",
//         duration: 3000,
//       });
//     },
//   });

//   const resetUserPassword = useMutation({
//     mutationFn: ({ data }: { data: { uid: number; email: string } }) =>
//       axiosInstance.post<{ data: { password: string } }>(
//         `/users/${data.uid}/reset-password-code`
//       ),
//     onSuccess: async (result, variables) => {
//       if (!result || result.status !== 200) {
//         toast({
//           title: "Unable to reset password",
//           description: "Sorry, something went wrong. Please try again.",
//           variant: "error",
//           duration: 3000,
//         });
//       } else {
//         toast({
//           title: "Password reset",
//           description: `Account ${variables.data.email} has been successfully reset`,
//           variant: "success",
//           duration: 3000,
//         });
//         void queryClient.invalidateQueries({
//           queryKey: [QUERY_KEY.FETCH_ACCOUNT_LIST],
//         });
//       }
//     },
//     onError: (error) => {
//       toast({
//         title: "Unable to reset password",
//         description: `Sorry, something went wrong. Please try again. Reason: ${getErrorMessage(error)}`,
//         variant: "error",
//         duration: 3000,
//       });
//     },
//   });

//   return {
//     sendInvitation,
//     renewInvitation,
//     revokeInvitation,
//     deactivateAccount,
//     activateAccountInvitation,
//     activateAccount,
//     updateUserAccountDetail,
//     resetUserPassword,
//   };
// };

// export default useRewardMutation;
