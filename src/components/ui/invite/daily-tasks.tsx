import { Logo } from "@/components/icon";
import miner from "@/assets/images/miner.png";
import type { Friend } from "@/data/useFriends";

const DailyTasks = ({ friendList }: { friendList: Friend[] | undefined }) => {
  return (
    <div className="bg-white border border-black rounded-xl p-4 items-center shadow-[4px_4px_black] w-full mt-6 space-y-4">
      <h1 className="dm-mono-medium text-sm text-black">Friends List:</h1>

      <hr className="border border-black" />

      {!friendList?.length ? (
        <p className="text-sm dm-mono-medium text-center">
          You don't have any friends?
          <br />
          Let's build connections to earn more tokens!
        </p>
      ) : (
        friendList?.map((friend) => {
          const friendName =
            friend.username || `${friend.firstname + friend.lastname}`;
          return (
            <div
              key={friend.id}
              className="bg-white flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-x-3">
                <img
                  src={friend?.photo_url || miner}
                  alt="miner image"
                  className="bg-white border border-black rounded-xl shadow-[3px_3px_black] object-cover"
                  draggable={false}
                />
                <p className="text-sm dm-mono-medium">{friendName}</p>
              </div>

              <div className="flex items-center gap-x-2">
                <span className="bg-[#ABFF83] rounded-full shadow-[2px_0.5px_black] border border-black z-[1] px-1 py-[3px] w-fit">
                  <Logo width={10} height={12} />
                </span>
                <p className="text-base dm-mono-medium">+{friend.bonus || 0}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default DailyTasks;
