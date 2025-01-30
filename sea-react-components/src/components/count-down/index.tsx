"use client";
import moment from "moment";
import { useEffect, useState } from "react";

export type Props = {
  timeInSeconds: number;
  finishObserver: () => void;
};
export default function CountDown({ timeInSeconds, finishObserver }: Props) {
  const [time, setTime] = useState(timeInSeconds);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (time <= 0) {
      setIsFinished(true);
      return;
    }

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime - 1 <= 0) {
          clearInterval(interval);
          setIsFinished(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (isFinished) finishObserver();
  }, [finishObserver, isFinished]);

  const formattedTime = moment
    .utc(time * 1000)
    .format(time >= 3600 ? "HH:mm:ss" : "mm:ss");
  return formattedTime;
}
