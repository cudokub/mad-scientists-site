import { useEffect, useState } from "react";

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  isEndingSoon: boolean;
}

export function useCountdown(endTime: Date): CountdownState {
  const [state, setState] = useState<CountdownState>(() => calculate(endTime));

  useEffect(() => {
    setState(calculate(endTime));

    const id = setInterval(() => {
      const next = calculate(endTime);
      setState(next);
      if (next.isExpired) clearInterval(id);
    }, 1000);

    return () => clearInterval(id);
  }, [endTime]);

  return state;
}

function calculate(endTime: Date): CountdownState {
  const diff = endTime.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, isEndingSoon: false };
  }

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isExpired: false,
    isEndingSoon: diff < 5 * 60 * 1000,
  };
}
