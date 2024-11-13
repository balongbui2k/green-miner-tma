import specialFrame from "@/assets/images/special-frame.png";

const AccountInfo = () => {
  const yearsInvolved = 5;

  return (
    <>
      <h1 className="text-4xl text-center text-black font-outline-1 font-bold mt-10">
        Pro <br />
        <span className="text-lg font-bold text-black font-outline-1">
          You’ve joined Telegram
        </span>
      </h1>

      <section className="relative w-full">
        <img
          src={specialFrame}
          alt="congrats background"
          className="-translate-y-24 w-full"
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 w-full -translate-y-1/2 flex flex-col items-center -z-[1]">
          <p className="text-with-image text-[120px] font-bold text-center translate-y-2 font-pixelSansSerifCondensed">
            {yearsInvolved}
          </p>
          <p className="text-[32px] font-bold text-black font-outline-1">
            year{yearsInvolved < 0 ? "" : "s"} ago
          </p>
        </div>
      </section>
    </>
  );
};

export default AccountInfo;
