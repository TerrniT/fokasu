import { Fragment, useState } from "react";
import { BsLightningChargeFill as LightingIcon } from "react-icons/bs";
import { BiCoffee as CoffeeIcon } from "react-icons/bi";

import { Circle } from "../circle";

import { cn } from "@/utils";

interface Props {
  time: number;
  isTimerStart: boolean;
  isBreak: boolean;
  percentage: number;
  cycleCount: number;
  cycles: number;
}

export const Timer = ({ isTimerStart, time, isBreak, percentage, cycleCount, cycles }: Props) => {
  const [fullColor, setFullColor] = useState<string>("stroke-zinc-800");

  function parsedTime(value: number) {
    return `${
      Math.floor(value / 60) < 10
        ? `0${Math.floor(value / 60)}`
        : `${Math.floor(value / 60)}`
    }:${value % 60 < 10 ? `0${value % 60}` : value % 60}`;
  }

  return (
    <Fragment>
      <div className={"relative mb-8"}>
        <svg width={200} height={200}>
          <g transform={`rotate(-90 ${"100 100"})`}>
            <Circle color={fullColor} />
            <Circle
              color={isTimerStart ? isBreak ? "stroke-orange-200" : "stroke-orange-600" : "stroke-zinc-800"}
              percentage={percentage}
            />
          </g>

        </svg>
        <div className="z-20 absolute top-0 left-0 right-0 bottom-0 flex flex-col gap-y-2 items-center justify-center">
          {isTimerStart && (
            <div className="text-md">
              {!isBreak ? (
                <LightingIcon size={23} className="text-yellow-500" />
              ) : (
                <CoffeeIcon className="text-zinc-300" size={23} />
              )}
            </div>
          )}
          <p className="text-white font-medium text-3xl ">{parsedTime(time)}</p>
          <div className="flex items-center gap-x-1.5">
            {Array.from(Array(cycles), (_, i) => i + 1).map((i) => (
              <div
                key={i}
                className={cn("w-1.5 h-3 rounded-full ", i <= cycleCount ? "animate-pulse bg-green-500" : "bg-zinc-700")}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
