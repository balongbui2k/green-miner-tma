import { motion } from "framer-motion";
import CheckingAccount from "@/components/ui/onboading/steps/checking-account.tsx";
import Reward from "@/components/ui/onboading/steps/reward.tsx";
import AccountInfo from "@/components/ui/onboading/steps/account-info.tsx";
import { useState } from "react";
import nextStepButton from "/src/assets/images/next-step-button.png";
import nextStepButtonDisabled from "/src/assets/images/next-step-button-disabled.png";
import { cn } from "@/utils/index.tsx";
import { Link } from "@tanstack/react-router";

const OnBoardingSteps = ({
  step,
  changeStep,
}: {
  step: number;
  changeStep: (step: number) => void;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="h-full overflow-hidden text-center transition-all">
      {step === 1 && (
        <motion.div
          style={{ x: 200, opacity: 0 }}
          animate={{ translateX: -200, opacity: 1 }}
          className="flex flex-col items-center justify-between h-full font-pixelify-sans"
        >
          <CheckingAccount isLoading={isLoading} setIsLoading={setIsLoading} />

          <button
            type="button"
            disabled={isLoading}
            onClick={() => changeStep(1)}
            className={cn(
              "relative flex items-center justify-center",
              !isLoading && "hover:opacity-90 active:opacity-80"
            )}
          >
            <img
              src={isLoading ? nextStepButtonDisabled : nextStepButton}
              alt="next step button image"
              draggable="false"
              className="w-96"
            />
            <p className="absolute -translate-y-1/4 text-lg text-gray-50">
              Continue
            </p>
          </button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          style={{ x: 200, opacity: 0 }}
          animate={{ translateX: -200, opacity: 1 }}
          className="flex flex-col items-center justify-between h-full font-pixelify-sans"
        >
          <Reward />

          <div className="space-y-3">
            <p className="text-lg text-black font-outline-1 font-bold">
              Thanks for your time on Telegram
            </p>

            <button
              type="button"
              onClick={() => changeStep(2)}
              className="relative flex items-center justify-center"
            >
              <img
                src={nextStepButton}
                alt="next step button image"
                draggable="false"
                className="w-96"
              />
              <p className="absolute -translate-y-1/4 text-lg text-gray-50">
                Continue
              </p>
            </button>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          style={{ x: 200, opacity: 0 }}
          animate={{ translateX: -200, opacity: 1 }}
          className="flex flex-col items-center justify-between h-full font-pixelify-sans"
        >
          <AccountInfo />

          <div className="space-y-3">
            <p className="text-black font-outline-1 text-lg font-bold">
              Your account number is #abcdxyz <br />
              You’re in the Top 80% Telegram users
            </p>

            <Link to="/" className="relative flex items-center justify-center">
              <img
                src={nextStepButton}
                alt="next step button image"
                draggable="false"
                className="w-96"
              />
              <p className="absolute -translate-y-1/4 font-pixelify-sans text-lg text-gray-50">
                Continue
              </p>
            </Link>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default OnBoardingSteps;
