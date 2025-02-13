export type HistoryEntry = {
  _id: string;
  type: 'increment' | 'decrement' | 'reset';
  step?: number;
}

export type CounterTypes = {
  count: number;
  history: HistoryEntry[];
}

export type UpdateCounterInput = {
  type: HistoryEntry['type'];
  step: HistoryEntry['step'];
}

export type UpdateCounterResponse = {
  count: number;
  newHistoryEntry: HistoryEntry;
}