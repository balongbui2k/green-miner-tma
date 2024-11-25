import useLeaderBoard from "@/data/useLeaderBoard";
import { Logo } from "@/components/icon";
import { formatCurrency } from "@/utils";
import miner from "@/assets/images/miner.png";
import firstPrize from "@/assets/images/first-prize.png";
import secondPrize from "@/assets/images/second-prize.png";
import thirdPrize from "@/assets/images/third-prize.png";

const LeaderBoard = () => {
  const { data: leaderBoard, isLoading } = useLeaderBoard();
  const leaderBoardItems = leaderBoard?.users;

  if (isLoading) {
    return <p className="text-white items-center">Preparing...</p>;
  }
  return (
    <section className="px-5">
      {leaderBoardItems?.map((user) => {
        const userName = `${user.firstname + user.lastname}` || user.username;
        return (
          <div key={user.id}>
            {user.id === 1 && (
              <div className="bg-white border border-black rounded-xl shadow-[4px_4px_black] p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-x-2.5">
                  <img
                    src={miner}
                    alt="miner"
                    className="border border-black rounded-xl shadow-[3px_3px_black] "
                  />
                  <p className="dm-mono-medium text-base">{userName}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-y-1.5">
                  <p className="dm-mono-medium text-sm">Total Earned</p>
                  <p className="flex items-center gap-x-1.5">
                    <span className="border border-black rounded-full px-1.5 py-[5px] bg-[#ABFF83] shadow-[3px_0.5px_black]">
                      <Logo width={16} height={18} />
                    </span>
                    <span className="dm-mono-medium text-xl">
                      {formatCurrency(user.balance, 2)}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-5 bg-white border border-black rounded-xl shadow-[4px_5px_black]">
        <div className="flex items-center justify-between dm-mono-medium bg-[#43FF46] border border-black shadow-[0px_4px_black] rounded-[9px] py-3 px-5">
          <p className="text-sm">Total Holders:</p>
          <p className="text-xl">
            {formatCurrency(leaderBoard?.total || 0, 2)}
          </p>
        </div>

        <div className="p-5 space-y-5">
          {leaderBoardItems?.map((user, index) => {
            const userName =
              `${user.firstname + user.lastname}` || user.username;

            return (
              <div className="bg-white flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                  <img
                    src={miner}
                    alt="miner"
                    className="border border-black rounded-xl shadow-[3px_3px_black] "
                  />
                  <div className="flex flex-col items-start ">
                    <p className="dm-mono-medium text-base">{userName}</p>
                    <p className="flex items-center gap-x-1.5">
                      <span className="border border-black rounded-full px-[5px] py-1 bg-[#ABFF83] shadow-[3px_0.5px_black]">
                        <Logo width={12} height={14} />
                      </span>
                      <span className="dm-mono-medium text-xl">
                        {formatCurrency(user.balance, 2)}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  {index === 0 && <img src={firstPrize} alt="first prize" />}
                  {index === 1 && (
                    <img
                      src={secondPrize}
                      alt="second prize"
                      className="mr-0.5"
                    />
                  )}
                  {index === 2 && (
                    <img
                      src={thirdPrize}
                      alt="third prize"
                      className="mr-1.5"
                    />
                  )}
                  {index > 2 && (
                    <p className="text-base dm-mono-medium mr-2.5">
                      #{index + 1}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LeaderBoard;
