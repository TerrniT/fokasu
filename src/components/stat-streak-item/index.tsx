import { cn } from "@/utils";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
  } from "@/components/ui/tooltip"

import { PomodoroEntityDay } from "../../store/types";

const streakColors = [
  "bg-primary/5", // 0
  "bg-primary/25", // 1
  "bg-primary/50", // 2
  "bg-primary/65", // 3
  "bg-primary/80", // 4
  "bg-primary/95", // 5
  "bg-primary", // 6
  "bg-primary", // 7
  "bg-primary", // 8
];

export const StatStreakItem = ({ streak }: { streak: PomodoroEntityDay }) => {
  const streakIndex = Math.min(streak.sessions.length, streakColors.length - 1);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={cn(
              `rounded-[4px] p-1 w-3 h-3 ${streakColors[streakIndex]}`
            )}>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{streak.sessions.length} sessions</p>
          <p>{streak.value}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
