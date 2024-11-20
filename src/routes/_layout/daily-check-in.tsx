import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/daily-check-in")({
  component: DailyCheckIn,
});

function DailyCheckIn() {
  return (
    <section className="flex items-center">
      <p className="text-black">Daily check in </p>
    </section>
  );
}
