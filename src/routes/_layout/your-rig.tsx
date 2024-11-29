import Header from "@/components/header";
import useDeviceHeightObserver from "@/hooks/useDeviceHeightObserver";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/your-rig")({
  component: RouteComponent,
});

function RouteComponent() {
  const { listHeight, listRef } = useDeviceHeightObserver();
  return (
    <section
      ref={listRef}
      style={{ height: listHeight }}
      className="overflow-y-auto scroll-smooth no-scrollbar"
    >
      <Header />

      <div className="space-y-7 p-5">
        <p className="dm-mono-medium text-sm text-center mt-44">
          This feature is being updated, <br /> please wait!
        </p>
      </div>
    </section>
  );
}
