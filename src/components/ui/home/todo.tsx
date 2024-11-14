import { Link } from "@tanstack/react-router";
import calenderLayer from "@/assets/images/calendar-layer.png";
import minerLayer from "@/assets/images/miner-layer.png";
import { CalendarIcon, CartIcon, ArrowUpIcon } from "@/components/icon.tsx";

export const todoList = [
  {
    title: "Daily check-in",
    icon: <CalendarIcon />,
    image: calenderLayer,
    linkTo: "/daily-check-in",
  },
  {
    title: "Start mining",
    icon: <CartIcon />,
    image: minerLayer,
    linkTo: "/rent-miner",
  },
];
const Todo = () => {
  return (
    <div className="flex flex-col gap-x-2 w-full">
      <h1 className="ml-2 dm-mono-medium text-base">Todo</h1>

      <div className="flex items-center justify-between gap-x-2 w-full">
        {todoList.map((item) => {
          return (
            <div
              key={item.title}
              className="bg-white rounded-xl p-4 border border-black w-full shadow-[4px_4px_black] relative"
            >
              <div className="text-black bg-[#ABFF83] rounded-full w-fit p-2 border border-black shadow-[3px_1px_black] mb-7 flex items-center justify-center">
                <span>{item.icon}</span>
              </div>

              <img
                src={item.image}
                alt={item.title}
                className="absolute right-0 bottom-0"
              />

              <div className="flex items-center justify-between">
                <p className="dm-mono-medium text-sm w-full max-w-20">
                  {item.title}
                </p>

                <Link
                  to={item.linkTo}
                  className="rotate-90 border border-black bg-[#43FF46] rounded-xl p-2 shadow-[3px_3px_black]
              active:shadow-none active:translate-x-[-3px] active:translate-y-[3px] transition-all duration-75 ease-linear"
                >
                  <ArrowUpIcon />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
