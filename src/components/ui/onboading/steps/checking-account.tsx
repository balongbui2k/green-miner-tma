import Loading from "@/components/loading.tsx";

const checkingSteps = [
  { id: 1, label: "Account age verified" },
  { id: 2, label: "OG Status confirm" },
  { id: 3, label: "Activity level analyze" },
  { id: 4, label: "Telegram Premium check" },
];

const CheckingAccount = ({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  return (
    <>
      <p className="text-black text-4xl w-[250px] text-center mt-20 font-bold">
        Checking your account
      </p>

      <div className="grid grid-cols-2 gap-10 w-full">
        {checkingSteps.map((step) => {
          return (
            <div key={step.id} className="flex flex-col items-center gap-y-2">
              <Loading isLoading={isLoading} setIsLoading={setIsLoading} />
              <p className="text-black text-base font-medium w-32">
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CheckingAccount;
