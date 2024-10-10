import { useEffect } from "react";

import { RiArrowGoBackFill as ResetIcon } from "react-icons/ri";
import { HiOutlineCog6Tooth as SettingsCogIcon } from "react-icons/hi2";

import { BsFillPauseFill as PauseIcon } from "react-icons/bs";

import {
  IoPlay as PlayIcon,
  IoCloseOutline as CloseIcon,
} from "react-icons/io5";

import { TbCrown as CrownIcon } from "react-icons/tb";

import { Timer } from "@/components/timer";
import { BlurAnimation } from "@/components/blur-animation";
import { Toolbar } from "@/components/toolbar";
import { PageLayout } from "@/components/page-layout";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Typography } from "@/components/ui/typography";


import { usePomodoroStore } from "../store";
import Link from "next/link";

function App() {
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
        <Button onClick={resetTimer} variant="outline" size="icon">
          <ResetIcon
            size={18}
            className="transition-all duration-75 ease-linear group-hover:scale-105"
          />
        </Button>
        <Button className="text-2xl rounded-2xl w-28 h-10 hover:scale-105 transition-all duration-150" variant="default" onClick={() => startTimer()}>
          {!isTimerStart ? <PlayIcon /> : <PauseIcon />}
        </Button>
        <Drawer snapPoints={["300px"]}>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon">
              <SettingsCogIcon
                size={22}
                className="group-hover:scale-105 transition-all duration-75 ease-linear"
              />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>
                  <Typography>Settings</Typography>
                </DrawerTitle>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex items-center justify-center space-x-2">
                  Hello
                </div>
              </div>
              <DrawerFooter className="flex items-end">
                <DrawerClose asChild>
                  <Button size="icon" variant="outline">
                    <CloseIcon
                      size={22}
                      className="group-hover:scale-105 transition-all duration-75 ease-linear"
                    />
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </Toolbar>

      {/* {modal ? (
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
      ) : null} */}
    </PageLayout>
  );
}
export default App;
