export interface PomodoroEntitySession {
  name: string;
  timestamp: string; // Store as a string for easier JSON export
  pomodoros_count: number;
}

export interface PomodoroEntityDay {
  value: string;
  sessions: PomodoroEntitySession[];
}

export interface PomodoroMethods {
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => Promise<void>;
  tick: () => void;
  
  completePomodoro?: () => void;
  completeSession?: (name: string) => void; // Accept name for session completion
  getMonthlyData?: (year?: number, month?: number) => PomodoroEntityDay[];
  getAllSessionsCount?: () => number; // All completed session count

  getCurrentPomodoroStreak?: () => number; // Current Pomodoro streak count
  getBestPomodoroStreak?: () => number; // Best Pomodoro streak count

  getAllCompletedPomodorosCount?: () => number; // Total completed Pomodoros count
}

export interface PomodoroState {
  workDuration: number;
  breakDuration: number;
  cycles: number;
  secondsLeft: number;
  isTimerStart: boolean;
  cycleCount: number;
  isBreak: boolean;
  currentStreak: number;
  bestStreak: number;

  completedSessions: PomodoroEntityDay[];
  completedPomodoroCount: number; // Total completed Pomodoros
  bestSessionStreak: number;
}
