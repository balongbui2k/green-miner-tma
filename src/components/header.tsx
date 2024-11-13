import { FilterIcon, PositionIcon, SearchIcon } from "@/components/icon.tsx";
import headerLayout from "@/assets/images/header-layout.png";
import { useRouterState } from "@tanstack/react-router";
import referrals from "@/assets/images/referrals.png";

const userName = "Mac";

const Header = () => {
  const router = useRouterState();
  const currentRoute = router.resolvedLocation.pathname;

  return (
    <section className="bg-[#73FF69] px-5 flex flex-col justify-center border-black border-b relative">
      <img
        src={headerLayout}
        alt="header-layout"
        className="absolute right-0"
      />

      <div className="flex justify-between items-start mt-14 z-[1]">
        <div>
          <h1 className="dm-mono-medium text-lg">Hello, {userName}</h1>
          <p className="text-sm dm-mono-regular">
            Let's mine anywhere you want!
          </p>
        </div>

        <button
          type="button"
          className="text-black outline-none hover:opacity-80 active:opacity-70"
        >
          <FilterIcon />
        </button>
      </div>

      {/* Search Bar */}

      {currentRoute !== "/invite" ? (
        <div className="flex justify-between gap-2 my-5 z-[1]">
          <div className="border border-black bg-white rounded-2xl p-3 flex items-center gap-2 w-full text-black">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              className="outline-none placeholder:text-sm placeholder:dm-mono-medium placeholder:text-[#6D6D6D] w-full"
            />
          </div>

          <button className="bg-white rounded-2xl border border-black outline-none hover:opacity-80 active:opacity-70 p-3">
            <PositionIcon />
          </button>
        </div>
      ) : (
        <div className="bg-white p-3 z-[1] rounded-xl border border-black shadow-[4px_4px_black] translate-y-11">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <img
                src={referrals}
                alt="referrals"
                className="bg-white rounded-xl border border-black p-2 shadow-[3px_3px_black]"
              />

              <div className="space-y-1">
                <h2 className="dm-mono-medium text-xs">Referrals</h2>
                <p className="dm-mono-medium text-xl">0</p>
              </div>
            </div>

            <button
              type="button"
              className="text-xs dm-mono-medium bg-[#43FF46] rounded-xl py-2.5 px-5 border border-black transition-all ease-linear duration-75
        shadow-[3px_3px_black] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
            >
              Invite link
            </button>
          </div>

          <div className="mt-2.5">
            <p className="dm-mono-medium text-xs text-[#878787]">
              Pending Referrals: 0
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Header;
