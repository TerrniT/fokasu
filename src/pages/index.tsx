import { useEffect } from "react";

import { RiArrowGoBackFill as ResetIcon } from "react-icons/ri";

import { BsFillPauseFill as PauseIcon } from "react-icons/bs";

import { IoPlay as PlayIcon } from "react-icons/io5";

import { TbCrown as CrownIcon } from "react-icons/tb";

import { BlurAnimation } from "@/components/blur-animation";
import { PageLayout } from "@/components/page-layout";
import { SettingsDrawer } from "@/components/settings-drawer";
import { Timer } from "@/components/timer";
import { Toolbar } from "@/components/toolbar";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { usePomodoroStore } from "../store";

function App() {
  const {
    cycles,
    secondsLeft,
    isTimerStart,
    cycleCount,
    isBreak,
    startTimer,
    stopTimer,
    resetTimer,
    tick,
	percentageLeft,
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
        href={"/stats"}
      >
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
        {isTimerStart ? (
          <Button
            className="text-2xl rounded-2xl w-28 h-10 hover:scale-105 transition-all duration-150"
            variant="secondary"
            onClick={() => stopTimer()}
          >
            <PauseIcon />
          </Button>
        ) : (
          <Button
            className="text-2xl rounded-2xl w-28 h-10 hover:scale-105 transition-all duration-150"
            variant="default"
            onClick={() => startTimer()}
          >
            <PlayIcon />
          </Button>
        )}
        <SettingsDrawer />
      </Toolbar>
    </PageLayout>
  );
}
export default App;
