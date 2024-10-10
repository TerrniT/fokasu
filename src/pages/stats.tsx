import Link from "next/link";
import { PageLayout } from "../components/page-layout";
import { Toolbar } from "../components/toolbar";

import { RiTimer2Line as TimerIcon } from "react-icons/ri";

import { usePomodoroStore } from "../store";

import { StatItem } from "../components/stat-item";
import { StatStreakGrid } from "../components/stat-streak-grid";

export default function StatsPage() {
  const {
    getMonthlyData,
    getAllSessionsCount,
    getCurrentPomodoroStreak,
    getBestPomodoroStreak,
    getAllCompletedPomodorosCount,
  } = usePomodoroStore();

  const sessions = getMonthlyData(2024, 9);
  const allSessionsCount = getAllSessionsCount()
  const currentPomodoroStreak = getCurrentPomodoroStreak()
  const bestPomodoroStreak = getBestPomodoroStreak()
  const completedPomodorosCount = getAllCompletedPomodorosCount()
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
      <div className="w-full py-12 mt-2">
        <div className="grid gap-1 grid-cols-12 grid-rows-2">
          <StatItem
            title={currentPomodoroStreak}
            description="Days Streak"
            variant="primary"
            className="col-span-4"
          />
          <StatItem
            title={allSessionsCount}
            description="All Sessions"
            variant="secondary"
            className="col-span-4"
          />
          <StatItem
            title={bestPomodoroStreak}
            description="Best Streak"
            variant="secondary"
            className="col-span-4"
          />
          <StatStreakGrid streakArray={sessions} className="col-span-6" />
          <StatItem
            title={completedPomodorosCount}
            description="Total Pomodoros"
            variant="primary"
            className="col-span-6"
          />
        </div>
      </div>
    </PageLayout>
  );
}
