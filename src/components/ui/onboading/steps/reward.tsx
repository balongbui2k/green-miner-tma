import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import pinkRabbitPixel from "/src/assets/images/pink-feed-rabbit-pixel.png";

const rewardValue = 3610;

const Reward: React.FC = () => {
  const controls = useAnimation();
  const [currentValue, setCurrentValue] = useState<number>(0);

  useEffect(() => {
    controls.start({
      transition: { duration: 0.5 },
    });

    const incrementValue = Math.floor(rewardValue / 30);
    const interval = setInterval(() => {
      setCurrentValue((prev) => {
        const nextValue = prev + incrementValue;
        return nextValue >= rewardValue ? rewardValue : nextValue;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="text-4xl text-center text-[#ff2967] font-outline-1 font-bold mt-10"
      >
        You are amazing! <br />
        <motion.span
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-lg text-black font-outline-1"
        >
          Here is your GOATS reward
        </motion.span>
      </motion.h1>

      <section className="flex-col flex items-center gap-y-5">
        <img
          src={pinkRabbitPixel}
          alt="rabbit float"
          className="w-[165px] h-[280px] min-[390px]:w-[225px] min-[390px]:h-[366px] object-cover"
        />

        <p className="text-4xl text-center text-black font-outline-1 font-bold uppercase">
          <span className="mr-1.5">{currentValue.toLocaleString()}</span>
          $RABBIT
        </p>
      </section>
    </>
  );
};

export default Reward;
