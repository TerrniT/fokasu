import Link from "next/link";
import { PageLayout } from "../components/page-layout";
import { Toolbar } from "../components/toolbar";

import { RiTimer2Line as TimerIcon } from "react-icons/ri";

import { usePomodoroStore } from "../store";
import { StatItem } from "../components/stat-item";
import { cn } from "../utils/cn";
import { StatStreakGrid } from "../components/stat-streak-grid";

export default function StatsPage() {
  const {
    // completedSessionTimestamps,
    completedSessions,

    // getAllSessionsCount,
    // getTodaySessionsCount,
    // getBestSessionStreak,

    // getTodayPomodorosCount,
    // getCurrentPomodoroStreak,
    // getBestPomodoroStreak,
    // getAllCompletedPomodorosCount,

    // getAllDaysCount
  } = usePomodoroStore();

  function resolveColorOpacity(value: number) {
    return `bg-orange-600/${value * 10}`;
  }

  console.log(completedSessions, "completedSessions");
  return (
    <PageLayout>
      <Toolbar position="top">
        <div className="text-center w-full">
          <h2 className="text-xl text-white font-semibold">Stats</h2>
        </div>
      </Toolbar>
      <Link
        className="text-white group absolute top-4 right-4 text-sm underline-2"
        href={"/"}>
        <TimerIcon
          size={22}
          className="group-hover:scale-110 transition-all duration-75 ease-linear"
        />
      </Link>
      <div className="w-full py-12">
        <div className="grid gap-1 grid-cols-6 grid-rows-2">
          {/* <StatItem
            title={getAllDaysCount()}
            description="Days"
            variant="primary"
            className="col-span-3"
          /> */}
          {/* <StatItem
            title={getAllSessionsCount()}
            description="All Sessions"
            variant="primary"
            className="col-span-3"
          />
          <StatItem
            title={getBestSessionStreak()}
            description="Session Streak"
            variant="secondary"
            className="col-span-3"
          />
          <StatItem
            title={getTodaySessionsCount()}
            description="Today"
            variant="secondary"
            className="col-span-2"
          />
          <StatItem
            title={getCurrentPomodoroStreak()}
            description="Current streak"
            variant="secondary"
            className=""
          />
          <StatItem
            title={getBestPomodoroStreak()}
            description="Best streak"
            variant="secondary"
            className=""
          />
          <StatItem
            title={getTodayPomodorosCount()}
            description="Today"
            variant="secondary"
            className="col-span-2"
          />
          <StatItem
            title={getAllCompletedPomodorosCount()}
            description="Pomodoros"
            variant="secondary"
            className="col-span-4"
          /> */}
          <StatStreakGrid streakArray={completedSessions} />
        </div>
      </div>
    </PageLayout>
  );
}
