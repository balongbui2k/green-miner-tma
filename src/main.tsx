import "@/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import ReactDOM from "react-dom/client";

// this manifest is used temporarily for development purposes
const manifestUrl = "https://rabbits.sgp1.digitaloceanspaces.com/tonconnect-manifest.json";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

// Import the generated route tree
import { StrictMode } from "react";
import { routeTree } from "./routeTree.gen.ts";
import { logPageView } from "./utils/analytics.js";

// Create a new router instance
const router = createRouter({ routeTree });

router.history.subscribe(() => {
  const url = router.history.location.href
  // your Favorite Analytics code here
  logPageView(url);
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <TonConnectUIProvider
        manifestUrl={manifestUrl}
        uiPreferences={{
          borderRadius: "s",
          colorsSet: {
            [THEME.DARK]: {
              connectButton: {
                background: "#FF8343",
              },
            },
            [THEME.LIGHT]: {
              connectButton: {
                background: "#FF8343",
              },
            },
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </TonConnectUIProvider>
    </StrictMode>
  );
}
