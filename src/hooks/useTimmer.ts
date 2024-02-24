import { useEffect, useState } from "react";

type TimerProps = {
  time?: number;
  timmer: number;
  setTimmer: React.Dispatch<React.SetStateAction<number>>;
  stop: () => void;
  reset: () => void;
};

export default function useTimer(time = 60): TimerProps {
  const [timmer, setTimmer] = useState(time);
  const [isStop, setIsStop] = useState(false);

  useEffect(() => {
    if (timmer == 0) return;
    if (!timmer) return;
    if (isStop) return;

    const interval = setInterval(() => {
      setTimmer((prev: number) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timmer, stop]);

  function stop() {
    setIsStop(true);
  }

  function reset() {
    setTimmer(time);
    setIsStop(false);
  }

  return { timmer, setTimmer, stop, reset };
}
