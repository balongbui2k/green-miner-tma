import { cn } from "@/utils/index.tsx";
import { CalendarIcon, CartIcon, HomeIcon, PlusIcon } from "./icon.tsx";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/data/keys.ts";

const tabNavigator = [
  { path: "/", icon: <HomeIcon /> },
  { path: "/daily-check-in", icon: <CalendarIcon /> },
  { path: "/rent-miner", icon: <CartIcon /> },
  { path: "/invite", icon: <PlusIcon /> },
];

const BottomNavigator = () => {
  const router = useRouterState();
  const currentRoute = router.resolvedLocation.pathname;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleNavigation = (path: string) => {
    navigate({ to: path });

    if (path === "/") {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.FETCH_MINER] });
    }
  };

  return (
    <nav
      className="fixed bottom-0 inset-x-0 px-5 pt-4 pb-8 w-full z-10 flex justify-between
    bg-white border-2 border-b-2 rounded-t-2xl border-black"
    >
      {tabNavigator.map(({ path, icon }) => {
        return (
          <button
            type="button"
            key={path}
            onClick={() => handleNavigation(path)}
            className={cn(
              "rounded-xl border border-black p-2.5 flex items-center outline-none",
              currentRoute === path &&
                "bg-[#43FF46] rounded-xl border border-black transition ease-linear duration-75 shadow-[3px_3px_black]"
            )}
          >
            <span className="text-black">{icon}</span>
          </button>
        );
      })}

      <Link
        to="/your-rig"
        className="text-sm dm-mono-medium bg-[#43FF46] rounded-xl py-2.5 px-5 border border-black transition ease-linear duration-75
        shadow-[3px_3px_black] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
      >
        Your rig
      </Link>
    </nav>
  );
};

export default BottomNavigator;
