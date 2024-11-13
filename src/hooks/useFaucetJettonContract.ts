// import { Address, type OpenedContract } from "ton-core";

// import { useQuery } from "@tanstack/react-query";
// import FaucetJettonWallet from "@/contracts/faucetJettonWallet.ts";
// import FaucetJetton from "@/contracts/faucetJetton.ts";
// import { useTonConnect } from "@/hooks/useTonConnect.ts";
// import { useTonClient } from "@/hooks/useTonClient.ts";
// import { useAsyncInitialize } from "@/hooks/useAsyncInitialize.ts";

// export function useFaucetJettonContract() {
//   const { wallet, sender } = useTonConnect();
//   const { client } = useTonClient();

//   const faucetJettonContract = useAsyncInitialize(async () => {
//     if (!client || !wallet) return;
//     const contract = new FaucetJetton(
//       Address.parse("EQB8StgTQXidy32a8xfu7j4HMoWYV0b0cFM8nXsP2cza_b7Y") // replace with your address from tutorial 2 step 8
//     );
//     return client.open(contract) as OpenedContract<FaucetJetton>;
//   }, [client, wallet]);

//   const jwContract = useAsyncInitialize(async () => {
//     if (!faucetJettonContract || !client) return;
//     const jettonWalletAddress = await faucetJettonContract!.getWalletAddress(
//       Address.parse(wallet!)
//     );
//     return client!.open(
//       new FaucetJettonWallet(Address.parse(jettonWalletAddress))
//     ) as OpenedContract<FaucetJettonWallet>;
//   }, [faucetJettonContract, client]);

//   const { data, isFetching } = useQuery(
//     ["jetton"],
//     async () => {
//       if (!jwContract) return null;

//       return (await jwContract.getBalance()).toString();
//     },
//     { refetchInterval: 3000 }
//   );

//   return {
//     mint: () => {
//       faucetJettonContract?.sendMintFromFaucet(sender, Address.parse(wallet!));
//     },
//     jettonWalletAddress: jwContract?.address.toString(),
//     balance: isFetching ? null : data,
//   };
// }
