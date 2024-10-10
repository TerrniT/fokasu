import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { ask } from "@tauri-apps/api/dialog";

import { PomodoroEntitySession, PomodoroMethods, PomodoroState } from "./types";

import { DEFAULT_POMODORO_DURATION } from "./constants";

import { fillCalendarWithSessions, generateCalendar } from "@/utils";

interface PomodoroStore extends PomodoroState, PomodoroMethods {}

const usePomodoroStore = create<PomodoroStore>()(
  persist(
    (set, get) => ({
      // State
      workDuration: DEFAULT_POMODORO_DURATION.workDuration,
      breakDuration: DEFAULT_POMODORO_DURATION.breakDuration,
      cycles: DEFAULT_POMODORO_DURATION.cycles,
      cycleCount: 0,
      secondsLeft: DEFAULT_POMODORO_DURATION.workDuration,
      isTimerStart: false,
      isBreak: false,
      percentageLeft: 100,

      // Pomodoro
      currentStreak: 0,
      bestStreak: 0,
      completedPomodoroCount: 0,

      // Sessions
      completedSessions: [], // Store completed session timestamps grouped by date
      bestSessionStreak: 0, // Best completed session streak

      // Methods
      startTimer: () => {
        const state = get();
        if (!state.isTimerStart) {
          const totalDuration = state.isBreak
            ? state.breakDuration
            : state.workDuration;
          // This only sets initial values if the timer hasn't been started
          if (state.secondsLeft === 0) {
            set({ secondsLeft: totalDuration, percentageLeft: 100 });
          }
          set({ isTimerStart: true }); // Set timer as running
        }
      },
      stopTimer: () => set({ isTimerStart: false }),

      // Actions to set durations and cycles
      setWorkDuration: (duration: number) =>
        set(() => ({
          workDuration: duration,
          secondsLeft: duration,
          cycleCount: 0,
          isBreak: false,
          isTimerStart: false,
        })),
      setBreakDuration: (duration: number) =>
        set(() => ({ breakDuration: duration })),
      setCycles: (cycles: number) => set(() => ({ cycles })),

      resetTimer: async () => {
        const shouldReset = await ask("Do you want to reset the timer?", {
          title: "Fokasu",
          type: "warning",
        });

        if (shouldReset) {
          set((state) => {
            return {
              secondsLeft: state.workDuration,
			  percentageLeft: 100,
              cycleCount: 0,
              isBreak: false,
              isTimerStart: false,
            };
          });
        }
      },

      tick: () =>
        set((state) => {
          const {
            secondsLeft,
            isBreak,
            cycleCount,
            workDuration,
            breakDuration,
            cycles,
            completePomodoro,
            completeSession,
            completedSessions,
          } = state;

          if (secondsLeft <= 1) {
            if (isBreak) {
              if (cycleCount + 1 < cycles) {
                completePomodoro(); // Log completion of a Pomodoro
                return {
                  cycleCount: cycleCount + 1,
                  secondsLeft: workDuration,
                  isBreak: false,
                };
              } else {
                completePomodoro(); // Log the completion
                completeSession(`Session ${completedSessions.length + 1}`); // Log session completion

                ask("Congrats on completing a session!🎉", {
                  title: `Time's up!`,
                  type: "info",
                });
                return {
                  isTimerStart: false,
                  secondsLeft: DEFAULT_POMODORO_DURATION.workDuration,
                  cycleCount: 0,
                  completedPomodoroCount: 0, // Reset after session completion
                };
              }
            } else {
              return { isBreak: true, secondsLeft: breakDuration };
            }
          }
          const totalDuration = state.isBreak
            ? state.breakDuration
            : state.workDuration;
          const newSecondsLeft = secondsLeft - 1;

          return {
            secondsLeft: newSecondsLeft,
            percentageLeft: 100 - (newSecondsLeft / totalDuration) * 100,
          };
        }),
      completePomodoro: () => {
        set((state) => ({
          completedPomodoroCount: state.completedPomodoroCount + 1, // Increment total count
        }));
      },

      completeSession: (name: string) => {
        const todayDate = new Date().toISOString().split("T")[0]; // Get today's date
        const timestamp = Date.now().toString(); // Current timestamp

        set((state) => {
          const newSession: PomodoroEntitySession = {
            name,
            timestamp,
            pomodoros_count: state.completedPomodoroCount,
          };
          const existingDayEntry = state.completedSessions.find(
            (day) => day.value === todayDate
          );

          if (existingDayEntry) {
            // If the entry exists, append the new session
            existingDayEntry.sessions.push(newSession);
          } else {
            // If it doesn't exist, create a new day entry
            state.completedSessions.push({
              value: todayDate,
              sessions: [newSession],
            });
          }

          return {
            completedSessions: [...state.completedSessions],
            currentStreak: state.currentStreak + 1, // Increment current Pomodoro streak
            bestStreak: Math.max(state.currentStreak + 1, state.bestStreak), // Update best Pomodoro streak
          };
        });
      },

      // Get monthly data with sessions filled
      getMonthlyData: (yearValue?: number, monthValue?: number) => {
        const year = yearValue || new Date().getFullYear();
        const month = monthValue || new Date().getMonth();

        const calendar = generateCalendar(year, month);

        const filledCalendar = fillCalendarWithSessions(
          calendar,
          get().completedSessions
        );
        return filledCalendar; // This will include empty days filling with actual sessions
      },

      getAllSessionsCount: () => {
        return Object.values(get().completedSessions).flat().length; // Number of all completed sessions
      },

      getBestSessionStreak: () => {
        return get().bestSessionStreak;
      },

      getCurrentPomodoroStreak: () => {
        return get().currentStreak; // Current Pomodoro streak count
      },

      getBestPomodoroStreak: () => {
        return get().bestStreak; // Best Pomodoro streak count
      },

      getAllCompletedPomodorosCount: () => {
        const sessions = get().getMonthlyData();

        return sessions
          .map((day) => day.sessions)
          .flat()
          .reduce((acc, session) => acc + session.pomodoros_count, 0);
      },
    }),
    {
      name: "pomodoro-state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePomodoroStore;
