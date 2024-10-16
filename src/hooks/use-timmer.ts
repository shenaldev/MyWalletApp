import { useEffect, useState } from "react";

type TimerProps = {
  time?: number;
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  stop: () => void;
  reset: () => void;
};

export default function useTimer(time = 60): TimerProps {
  const [timer, setTimer] = useState(time);
  const [isStop, setIsStop] = useState(false);

  useEffect(() => {
    if (timer == 0) return;
    if (!timer) return;
    if (isStop) return;

    const interval = setInterval(() => {
      setTimer((prev: number) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, stop]);

  function stop() {
    setIsStop(true);
  }

  function reset() {
    setTimer(time);
    setIsStop(false);
  }

  return { timer, setTimer, stop, reset };
}
