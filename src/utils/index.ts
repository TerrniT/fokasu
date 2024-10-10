import { PomodoroEntityDay } from "@/store/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateCalendar = (
  year: number,
  month: number = 0
): PomodoroEntityDay[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendar: PomodoroEntityDay[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    calendar.push({
      value: dateString,
      sessions: [], // Initialize with empty sessions
    });
  }

  return calendar;
};

export const fillCalendarWithSessions = (
  calendar: PomodoroEntityDay[],
  completedSessions: PomodoroEntityDay[]
) => {
  completedSessions.forEach((entry) => {
    const sessionDate = entry.value;
    const calendarEntry = calendar.find(
      (calEntry) => calEntry.value === sessionDate
    );

    if (calendarEntry) {
      calendarEntry.sessions = entry.sessions; // Fill with actual sessions
    }
  });

  return calendar;
};
