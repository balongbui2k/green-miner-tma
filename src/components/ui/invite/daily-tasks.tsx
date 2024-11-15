import referrals from "@/assets/images/referrals.png";
import useMissionsMutation from "@/data/useMissionMutation.ts";
import useMissions, { type Mission } from "@/data/useMissions.ts";
import { cn } from "@/utils/index.tsx";

const DailyTasks = () => {
  const { data: dailyTasks } = useMissions();
  const { doMission } = useMissionsMutation();

  const handleDoMission = (mission: Mission) => {
    let confirmed = false;

    confirmed = window.confirm(`Do you want to open "${mission.action_link}"?`);
    if (confirmed) {
      window.open(mission.action_link, "_blank");
      doMission.mutate({ missionId: mission.id });
    }
  };

  return (
    <div className="bg-white border border-black rounded-xl py-3 px-4 items-center shadow-[4px_4px_black] w-full mt-6 space-y-4">
      <h1 className="dm-mono-medium text-sm text-black">Daily Task:</h1>

      {dailyTasks?.map((task) => {
        return (
          <div
            key={task.id}
            className="bg-white border border-black rounded-xl shadow-[4px_4px_black] flex items-center justify-between px-1.5 py-3"
          >
            <div className="flex items-center gap-x-3">
              <img
                src={task.image}
                alt="image"
                className="bg-white border border-black rounded-xl shadow-[3px_3px_black] w-10 h-10"
                draggable={false}
              />

              <div className="flex flex-col">
                <span className="dm-mono-medium text-xs">{task.project}</span>
                <span className="dm-mono-light text-[8px] w-40">
                  {task.content}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={doMission.isLoading}
              onClick={
                !task.is_completed ? () => handleDoMission(task) : undefined
              }
              className={cn(
                "dm-mono-medium text-[11px] rounded-[10px] border border-black",
                task.is_completed === true
                  ? "bg-[#E2E2E2] p-1.5"
                  : "bg-[#43FF46] py-1 px-2.5 transition-all ease-linear duration-75 shadow-[3px_3px_black] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
              )}
            >
              {task.is_completed === true ? "Connected" : "Connect"}
            </button>
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
