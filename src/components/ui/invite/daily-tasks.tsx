import x from "@/assets/images/X.png";
import telegram from "@/assets/images/telegram.png";
import referrals from "@/assets/images/referrals.png";

const dailyTasks = [
  {
    id: 1,
    name: "Follow us",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
    status: "connected",
    image: x,
  },
  {
    id: 2,
    name: "Connect With Us",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
    status: "pending",
    image: telegram,
  },
];

const DailyTasks = () => {
  return (
    <div className="bg-white border border-black rounded-xl py-3 px-4 items-center shadow-[4px_4px_black] w-full mt-6 space-y-4">
      <h1 className="dm-mono-medium text-sm text-black">Daily Task:</h1>

      {dailyTasks.map((task) => {
        return (
          <div className="bg-white border border-black rounded-xl shadow-[4px_4px_black] flex items-center justify-between px-1.5 py-3">
            <div className="flex items-center gap-x-3">
              <img
                src={task.image}
                alt="image"
                className="bg-white border border-black rounded-xl shadow-[3px_3px_black] p-3 w-10 h-10"
                draggable={false}
              />

              <div className="flex flex-col">
                <span className="dm-mono-medium text-xs">{task.name}</span>
                <span className="dm-mono-light text-[8px] w-40">
                  {task.description}
                </span>
              </div>
            </div>

            {task.status === "connected" ? (
              <button className="dm-mono-medium text-[11px] bg-[#E2E2E2] p-1.5 rounded-[10px] border border-black">
                Connected
              </button>
            ) : (
              <button
                className="bg-[#43FF46] rounded-[10px] dm-mono-medium text-[11px] py-1 px-2.5 border border-black transition-all ease-linear duration-75
        shadow-[3px_3px_black] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
              >
                Connect
              </button>
            )}
          </div>
        );
      })}

      <div className="bg-white border border-black rounded-xl shadow-[4px_4px_black] flex items-center justify-between px-1.5 py-3">
        <div className="flex items-center gap-x-3">
          <img
            src={referrals}
            alt="referrals"
            className="bg-white border border-black rounded-xl shadow-[3px_3px_black] p-3 w-10 h-10"
            draggable={false}
          />

          <div className="flex flex-col">
            <span className="dm-mono-medium text-xs">Strong Community</span>
            <span className="dm-mono-light text-[8px] w-40">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et
            </span>
          </div>
        </div>

        <button
          className="bg-[#43FF46] rounded-[10px] dm-mono-medium text-[11px] py-1 px-3 border border-black transition-all ease-linear duration-75
        shadow-[3px_3px_black] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
        >
          Invite
        </button>
      </div>
    </div>
  );
};

export default DailyTasks;
