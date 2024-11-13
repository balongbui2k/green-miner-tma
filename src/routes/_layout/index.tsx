import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex justify-center items-center ">
      <p>This is home page</p>
    </div>
  );
}
