import { cn } from "../../utils/cn";

import { PomodoroEntityDay } from "../../store/types";

const streakColors = [
  "bg-orange-600/5", // 0
  "bg-orange-600/25", // 1
  "bg-orange-600/50", // 2
  "bg-orange-600/65", // 3
  "bg-orange-600/80", // 4
  "bg-orange-600/95", // 5
  "bg-orange-600", // 6
  "bg-orange-600", // 7
  "bg-orange-600", // 8
];

export const StatStreakItem = ({ streak }: { streak: PomodoroEntityDay }) => {
  const streakIndex = Math.min(streak.sessions.length, streakColors.length - 1);

  return (
    <div
      className={cn(`rounded-[4px] p-1 w-3 h-3 ${streakColors[streakIndex]}`)}>
      {/* {day.sessions.length} */}
    </div>
  );
};
