import BottomNavigator from "@/components/bottom-navigator.tsx";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: Layout,
});

function Layout() {
  return (
    <main>
      <section className="min-h-screen">
        <Outlet />
      </section>

      <BottomNavigator />
    </main>
  );
}
