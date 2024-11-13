import useAuthMutation from "@/data/useAuthMutation.ts";
import useProfile from "@/data/useProfile.ts";
import useReferralMutation from "@/data/useReferralMutation.ts";
import { initGA } from "@/utils/analytics.js";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

const googleAnalyticsID = import.meta.env.VITE_REACT_GA_ID;
const devModeEnabled =
  import.meta.env.VITE_REACT_APP_DEV_MODE === "true" ? true : false;

let initDataRaw: string | undefined;
let startParam: string | undefined;

if (!devModeEnabled) {
  const launchParams = retrieveLaunchParams();
  initDataRaw = launchParams.initDataRaw;
  startParam = launchParams.startParam;
}

export const Route = createRootRoute({
  component: Root,
  notFoundComponent: () => (
    <div>
      <h1>404 Not Found</h1>
      <Link to="/">Go to Home</Link>
    </div>
  ),
});

function Root() {
  const { signIn } = useAuthMutation();
  const { registerRef } = useReferralMutation();
  const { data: profile, isLoading } = useProfile();
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [signInCompleted, setSignInCompleted] = useState(false);

  useEffect(() => {
    // Initialize Google Analytics with your Tracking ID
    // initGA(googleAnalyticsID); // Replace with your GA4 Measurement ID
  }, []);

  useEffect(() => {
    if (profile) {
      setProfileLoaded(true);
    }
  }, [profile]);

  if (!devModeEnabled) {
    useEffect(() => {
      if (initDataRaw) {
        signIn.mutate(
          {
            initData: initDataRaw,
          },
          {
            onSuccess: () => {
              setSignInCompleted(true);
            },
          }
        );
      }
    }, [initDataRaw]);
  }

  useEffect(() => {
    if (signInCompleted && profileLoaded && startParam) {
      if (profile?.ref) {
        return;
      }

      registerRef.mutate({
        referralCode: startParam,
      });
    }
  }, [signInCompleted, profileLoaded, startParam]);

  if (isLoading) return null;

  return (
    <main>
      <Toaster />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </main>
  );
}
