// import OnBoarding from "@/components/ui/onboading/index.tsx";
import BottomNavigator from "@/components/bottom-navigator.tsx";
import Header from "@/components/header.tsx";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: Layout,
});

function Layout() {
  return (
    <main>
      {/* <OnBoarding /> */}

      <Header />

      <section className="bg-[#EDFFD6] min-h-screen">
        <Outlet />
      </section>

      <BottomNavigator />
    </main>
  );
}
