import { cn } from "@/utils";
import { StatStreakItem } from "../stat-streak-item";

import { PomodoroEntityDay } from "../../store/types";

export const StatStreakGrid = ({
  streakArray,
  className,
}: {
  streakArray: PomodoroEntityDay[];
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex gap-1 flex-wrap row-span-1 col-span-6 bg-[#1a1a1a] rounded-xl p-2",
        className
      )}>
      {streakArray.map((day) => (
        <StatStreakItem key={day.value} streak={day} />
      ))}
    </div>
  );
};
