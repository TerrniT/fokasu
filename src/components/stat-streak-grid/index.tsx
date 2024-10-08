import { cn } from "../../utils/cn";
import { StatStreakItem } from "../stat-streak-item";

import { PomodoroEntityDay } from "../../store/types";

export const StatStreakGrid = ({ streakArray }: { streakArray: PomodoroEntityDay[] }) => {
  return (
    <div className="flex gap-1 flex-wrap row-span-1 col-span-6 bg-[#1a1a1a] rounded-xl p-2">
      {streakArray.map((day) => (
		<StatStreakItem key={day.value} streak={day}/>
      ))}
    </div>
  );
};
