/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { CounterTypes, HistoryEntry } from "../types";
import { useCounterApi } from "../useCounterApi";
import { INITIAL_COUNTER_VALUES, MAX_COUNTER_VALUE, MIN_INPUT_VALUE } from "../tools";

type CounterContextType = CounterTypes & {
  stepValue: number;
  handleUpdateCounter: (type: HistoryEntry['type']) => void;
  handleStepChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetCounter: () => void;
};

const CounterContext = createContext<CounterContextType>({
  count: 0,
  history: [],
  stepValue: 1,
  handleUpdateCounter: () => { },
  handleStepChange: () => { },
  handleResetCounter: () => { },
});


export const CounterProvider = ({ children }: { children: React.ReactNode }) => {
  const { getCounter, updateCounter, resetCounter } = useCounterApi();
  const [counter, setCounter] = useState<CounterTypes>(INITIAL_COUNTER_VALUES);
  const [stepValue, setStepValue] = useState(MIN_INPUT_VALUE);

  useEffect(() => {
    getCounter().then((data) => {
      setCounter(data)
    });
  }, [getCounter]);

  const handleUpdateCounter = (type: HistoryEntry['type']) => {
    updateCounter({ type, step: stepValue }).then((data) => setCounter({
      count: data.count,
      history: [data.newHistoryEntry, ...counter.history]
    }));
  }

  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(MAX_COUNTER_VALUE, Math.max(1, Number(e.target.value)));
    setStepValue(value);
  }

  const handleResetCounter = () => {
    resetCounter().then((data) => {
      setCounter({
        count: data.count,
        history: [data.resetHistoryEntry, ...counter.history]
      })
      setStepValue(MIN_INPUT_VALUE);
    });
  }

  return (
    <CounterContext.Provider
      value={{
        ...counter,
        stepValue,
        handleUpdateCounter,
        handleStepChange,
        handleResetCounter
      }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => useContext(CounterContext);
