import { cn } from "@/utils/index.tsx";
import { CartIcon, HomeIcon, PlusIcon } from "./icon.tsx";
import { Link, useRouterState } from "@tanstack/react-router";

const tabNavigator = [
  { linkTo: "/", icon: <HomeIcon /> },
  { linkTo: "/rent-miner", icon: <CartIcon /> },
  { linkTo: "/invite", icon: <PlusIcon /> },
];

const BottomNavigator = () => {
  const router = useRouterState();
  const currentRoute = router.resolvedLocation.pathname;

  return (
    <nav
      className="fixed bottom-0 inset-x-0 py-5 px-9 w-full z-10 flex justify-between
    bg-white border-2 border-b-2 rounded-t-2xl border-black"
    >
      {tabNavigator.map(({ linkTo, icon }) => {
        return (
          <Link
            key={linkTo}
            to={linkTo}
            className={cn(
              "rounded-xl border border-black p-2.5 flex items-center",
              currentRoute === linkTo &&
                "bg-[#43FF46] rounded-xl border border-black transition-all will-change-auto ease-linear duration-75 shadow-[3px_3px_black]"
            )}
          >
            <span className="text-black ">{icon}</span>
          </Link>
        );
      })}

      <button
        type="button"
        className="text-sm dm-mono-medium bg-[#43FF46] rounded-xl py-2.5 px-5 border border-black transition-all ease-linear duration-75
        shadow-[3px_3px_black] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
      >
        Mining
      </button>
    </nav>
  );
};

export default BottomNavigator;
