export interface Habit {
  id: string;
  name: string;
  emoji: string;
  color: string; // hex, e.g. "#6366f1"
  createdAt: string; // YYYY-MM-DD
  completions: string[]; // sorted YYYY-MM-DD keys
  order: number;
}

export interface HabitDraft {
  name: string;
  emoji: string;
  color: string;
}
