import BottomNavigator from "@/components/bottom-navigator.tsx";
import Header from "@/components/header";
import {
  createFileRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: Layout,
});

function Layout() {
  const router = useRouterState();
  const currentRoute = router.resolvedLocation.pathname;

  return (
    <main>
      {currentRoute !== "/daily-check-in" && <Header />}

      <section className="min-h-screen">
        <Outlet />
      </section>

      <BottomNavigator />
    </main>
  );
}
