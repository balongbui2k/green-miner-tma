import { useState } from "react";
import { motion } from "framer-motion";
import onboardingBackground from "/src/assets/images/pixel_feed_rabbit_bg.png";
import OnBoardingSteps from "./steps/index.tsx";
import processBarEmpty from "@/assets/images/process-bar-empty.png";
import processBarFill from "@/assets/images/process-bar-fill.png";

const OnBoarding = () => {
  const [step, setStep] = useState(1);

  const changeStep = (i: number) => {
    setStep(i);
  };

  const basePercentage = 33.33;
  const stepPercentage = (100 - basePercentage) / (3 - 1);
  const completedPercentage = basePercentage + step * stepPercentage;

  return (
    <section className="flex flex-col justify-between h-screen py-6 mx-4">
      <img
        src={onboardingBackground}
        alt="onboarding background"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover -z-[1]"
        draggable="false"
      />

      <div className="relative flex items-center">
        <img
          src={processBarEmpty}
          alt="Empty progress bar"
          className="w-full"
        />
        <motion.div
          className="absolute left-0 top-0 h-full overflow-hidden"
          initial={{ width: `${basePercentage}%` }}
          animate={{
            width: `${completedPercentage}%`,
          }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={processBarFill}
            alt="Filled progress bar"
            className="h-full w-full object-cover object-left"
          />
        </motion.div>
      </div>

      <OnBoardingSteps step={step} changeStep={changeStep} />
    </section>
  );
};

export default OnBoarding;
