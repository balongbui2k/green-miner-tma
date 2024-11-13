import { getHttpEndpoint } from "@orbs-network/ton-access";
import { CHAIN } from "@tonconnect/protocol";
import { TonClient } from "ton";
import { useAsyncInitialize } from "./useAsyncInitialize.ts";
import { useTonConnect } from "./useTonConnect.ts";

export function useTonClient() {
  const { network } = useTonConnect();

  return {
    client: useAsyncInitialize(async () => {
      if (!network) return;
      return new TonClient({
        endpoint: await getHttpEndpoint({
          network: network === CHAIN.MAINNET ? "mainnet" : "testnet",
        }),
      });
    }, [network]),
  };
}
