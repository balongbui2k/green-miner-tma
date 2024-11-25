import headerLayout from "@/assets/images/header-layout.png";
import { QuestionMarkIcon } from "@/components/icon";

const DailyCheckInHeader = ({
  handleOpenBottomModal,
}: {
  handleOpenBottomModal: () => void;
}) => {
  return (
    <>
      <h1 className="dm-mono-medium text-lg mb-1">Daily Check-in</h1>
      <p className="text-sm dm-mono-regular flex gap-x-1 w-full max-w-80 items-end relative z-[1]">
        Check back daily to claim rewards and keep the streak going!
        <span
          onClick={handleOpenBottomModal}
          className="bg-white rounded-full border border-black p-px cursor-pointer absolute right-[114px] bottom-0.5"
        >
          <QuestionMarkIcon size={11} />
        </span>
      </p>

      <img
        src={headerLayout}
        alt="header-layout"
        className="absolute right-0 bottom-0"
      />
    </>
  );
};

export default DailyCheckInHeader;
