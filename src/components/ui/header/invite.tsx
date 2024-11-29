import referrals from "@/assets/images/referrals.png";
import type { Profile } from "@/data/useProfile";

const InviteHeader = ({
  profile,
  copyLink,
}: {
  profile: Profile | undefined;
  copyLink: () => void;
}) => {
  return (
    <section className="h-28">
      <h1 className="dm-mono-medium text-lg mb-1">Invite Friends</h1>
      <p className="text-sm dm-mono-regular">
        More friends, more fun, more $GREEN
      </p>
      <div className="bg-white p-3 z-[1] rounded-xl border border-black shadow-[4px_4px_black] translate-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              src={referrals}
              alt="referrals"
              className="bg-white rounded-xl border border-black p-2 shadow-[3px_3px_black]"
            />

            <div className="space-y-1">
              <h2 className="dm-mono-medium text-xs">Referrals</h2>
              <p className="dm-mono-medium text-xl">{profile?.ref_count}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={copyLink}
            className="text-xs dm-mono-medium bg-[#43FF46] rounded-xl py-2.5 px-5 border border-black transition ease-linear duration-75
shadow-[3px_3px_black] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
          >
            Invite link
          </button>
        </div>
      </div>
    </section>
  );
};

export default InviteHeader;
