import { useState, useEffect } from "react";

import { RiArrowGoBackFill as ResetIcon } from "react-icons/ri";
import { HiOutlineCog6Tooth as SettingsCogIcon } from "react-icons/hi2";

import { BsFillPauseFill as PauseIcon } from "react-icons/bs";

import {
  IoPlay as PlayIcon,
  IoCloseOutline as CloseIcon,
} from "react-icons/io5";

import { TbCrown as CrownIcon } from "react-icons/tb";

import { Timer } from "../components/timer";
import { BlurAnimation } from "../components/blur-animation";
import { Toolbar } from "../components/toolbar";
import { PageLayout } from "../components/page-layout";
import { Button } from "../components/button";

import { usePomodoroStore } from "../store";
import Link from "next/link";

function App() {
  const [modal, setModal] = useState<boolean>(false);

  //   const workDuration = 0.5 * 60; // 15 minutes
  //   const breakDuration = 0.5 * 60  // 5 minutes
  //   const cycles = 4;               // Number of cycles

  //   const {
  //     secondsLeft,
  //     isTimerStart,
  //     cycleCount,
  //     isBreak,
  //     percentageLeft,
  //     setTimerStart,
  //     onResetTimer,
  //   } = usePomodoroStore({workDuration, breakDuration, cycles});

  const {
    workDuration,
    breakDuration,
    cycles,
    secondsLeft,
    isTimerStart,
    cycleCount,
    isBreak,
    startTimer,
    stopTimer,
    resetTimer,
    tick,
  } = usePomodoroStore();

  useEffect(() => {
    let timer;
    if (isTimerStart && secondsLeft > 0) {
      timer = setInterval(() => {
        tick();
      }, 1000);
    } else if (secondsLeft === 0) {
      stopTimer();
    }
    return () => clearInterval(timer);
  }, [isTimerStart, secondsLeft, tick, stopTimer]);

  const percentageLeft =
    100 - (secondsLeft / (isBreak ? breakDuration : workDuration)) * 100;

  return (
    <PageLayout>
      <Timer
        isTimerStart={isTimerStart}
        time={secondsLeft}
        isBreak={isBreak}
        cycleCount={cycleCount}
        cycles={cycles}
        percentage={percentageLeft}
      />
      <BlurAnimation />
      <Link
        className="text-white group absolute top-4 right-4 text-sm underline-2"
        href={"/stats"}>
        <CrownIcon
          size={22}
          className="group-hover:scale-110 transition-all duration-75 ease-linear"
        />
      </Link>
      <Toolbar position="bottom">
        <Button onClick={resetTimer}>
          <ResetIcon
            size={18}
            className="transition-all duration-75 ease-linear group-hover:scale-105"
          />
        </Button>
        <button
          className="w-28 h-10 backdrop-blur-sm z-20 rounded-2xl text-2xl border text-white bg-zinc-600 border-zinc-700 hover:scale-105 flex items-center justify-center transition-all duration-150"
          onClick={() => startTimer()}>
          {!isTimerStart ? <PlayIcon /> : <PauseIcon />}
        </button>
        <Button onClick={() => setModal((prev) => !prev)}>
          <SettingsCogIcon
            size={22}
            className="group-hover:scale-105 transition-all duration-75 ease-linear"
          />
        </Button>
      </Toolbar>

      {modal ? (
        <div className="border border-zinc-800 bg-black/80 shadow-md duration-150 backdrop-blur-lg transition-all rounded-md z-30 absolute top-0 right-0 w-full h-full">
          <div className="w-full h-full relative ">
            <Toolbar position="top">
              <div className="text-center w-[80%]">
                <h2 className="text-xl text-white font-semibold pl-[42px]">
                  Settings
                </h2>
              </div>

              <Button onClick={() => setModal((prev) => !prev)}>
                <CloseIcon
                  size={22}
                  className="group-hover:scale-105 transition-all duration-75 ease-linear"
                />
              </Button>
            </Toolbar>
          </div>
        </div>
      ) : null}
    </PageLayout>
  );
}
export default App;
