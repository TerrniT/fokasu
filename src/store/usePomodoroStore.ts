import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { ask } from "@tauri-apps/api/dialog";

import {
  PomodoroEntityDay,
  PomodoroEntitySession,
  PomodoroMethods,
  PomodoroState,
} from "./types";
import { DEFAULT_POMODORO_DURATION, mockSessions } from "./constants";

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

      // Pomodoro
      currentStreak: 0,
      bestStreak: 0,
      completedPomodoroCount: 0,

      // Sessions
      completedSessions: [], // Store completed session timestamps grouped by date
      bestSessionStreak: 0, // Best completed session streak

      // Methods
      startTimer: () => set({ isTimerStart: true }),
      stopTimer: () => set({ isTimerStart: false }),

      resetTimer: async () => {
        const shouldReset = await ask("Do you want to reset the timer?", {
          title: "Fokasu",
          type: "warning",
        });
        if (shouldReset) {
          set({
            secondsLeft: DEFAULT_POMODORO_DURATION.workDuration,
            cycleCount: 0,
            isBreak: false,
            isTimerStart: false,
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

          return { secondsLeft: secondsLeft - 1 };
        }),
      completePomodoro: () => {
        set((state) => ({
          completedPomodoroCount: state.completedPomodoroCount + 1, // Increment total count
          currentStreak: state.currentStreak + 1, // Increment current Pomodoro streak
          bestStreak: Math.max(state.currentStreak + 1, state.bestStreak), // Update best Pomodoro streak
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
          console.log(existingDayEntry);

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

      //   getAllCompletedPomodorosCount: () => {
      //     const completedPomodoroDetails = get().completedSessionDetails;
      //     return Object.values(completedPomodoroDetails).reduce(
      //       (total, { pomodoros }) => total + pomodoros,
      //       0
      //     ); // Total Pomodoros completed across all sessions
      //   },

      //   getTodayPomodorosCount: () => {
      //     const today = new Date().toISOString().split("T")[0];
      //     const sessionDetails = get().completedSessionDetails[today];
      //     return sessionDetails ? sessionDetails.pomodoros : 0; // Today's Pomodoros count
      //   },

      //   getAllSessionsCount: () => {
      //     return Object.values(get().completedSessionDetails).flat().length; // Number of all completed sessions
      //   },

      //   getAllSessions: () => {
      //     const sessions = Object.values(get().completedSessionDetails).flat();
      //     return sessions; // Returns an array of all completed session timestamps
      //   },

      //   getTodaySessionsCount: () => {
      //     const today = new Date().toISOString().split("T")[0]; // Get today's date
      //     return (get().completedSessionDetails[today] || []).length; // Today's sessions count
      //   },

      //   getTodaySessions: () => {
      //     const today = new Date().toISOString().split("T")[0]; // Get today's date
      //     return get().completedSessionDetails[today] || []; // Returns today's completed session timestamps
      //   },

      //   getBestSessionStreak: () => {
      // 	return get().bestSessionStreak;
      //   },

      //   getTodayPomodorosCount: () => {
      // 	const todayPomodorosCount = get().completedPomodoroCount; // Count today's Pomodoros
      // 	return todayPomodorosCount; // You can adjust this based on your logic details
      //   },

      //   getCurrentPomodoroStreak: () => {
      //     return get().currentStreak; // Current Pomodoro streak count
      //   },

      //   getBestPomodoroStreak: () => {
      //     return get().bestStreak; // Best Pomodoro streak count
      //   },

      //   getAllCompletedPomodorosCount: () => {
      //     return get().completedPomodoroCount; // Total completed Pomodoros count
      //   },

      //   getAllDaysCount: () => {
      // 	const sessions = get().completedSessionDetails;
      // 	return Object.values(sessions).reduce((total, timestamps) => total + timestamps.length, 0)
      //   }
    }),
    {
      name: "pomodoro-state",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state.completedSessions = mockSessions;
        console.log("Storage rehydrated:", state.completedSessions);
      },
    }
  )
);

export default usePomodoroStore;
