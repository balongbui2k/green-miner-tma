import { useState, useEffect } from 'react';

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function useCountdown(unixTimestamp: number): TimeLeft {
  const calculateTimeLeft = (): number => {
    const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds
    if (unixTimestamp < currentTime) {
      return 0;
    }

    return unixTimestamp - currentTime;
  };

  const [timeLeft, setTimeLeft] = useState<number>(calculateTimeLeft);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [unixTimestamp]);

  const days = String(Math.floor(timeLeft / (60 * 60 * 24))).padStart(2, '0');
  const hours = String(Math.floor((timeLeft % (60 * 60 * 24)) / (60 * 60))).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft % (60 * 60)) / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return { days, hours, minutes, seconds };
}

export default useCountdown;