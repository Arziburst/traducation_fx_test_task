export type HistoryEntry = {
  _id: string;
  type: 'increment' | 'decrement' | 'reset';
  step?: number;
};

export type CounterTypes = {
  count: number;
  history: HistoryEntry[];
};

export type UpdateCounterInput = {
  type: HistoryEntry['type'];
  step: HistoryEntry['step'];
};

export type UpdateCounterResponse = {
  count: number;
  newHistoryEntry: HistoryEntry;
};

export type ResetCounterResponse = {
  count: number;
  resetHistoryEntry: HistoryEntry;
};

export type ThemeContextType = {
  theme: "light" | "dark" | "auto";
  toggleTheme: (newTheme: ThemeContextType["theme"]) => void
};

