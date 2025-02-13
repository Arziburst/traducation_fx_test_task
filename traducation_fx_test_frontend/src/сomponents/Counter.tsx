import React from "react";
import { useCounter } from "../libs/counter.context";
import { MAX_COUNTER_VALUE, MIN_COUNTER_VALUE } from "../tools";

const isLimitReached = (ifReached: boolean) => ifReached ? "opacity-0 pointer-events-none " : ""

export const Counter: React.FC = () => {
    const { handleUpdateCounter, stepValue, count, handleStepChange } = useCounter();

    const decrementButtonClassname = isLimitReached(count <= MIN_COUNTER_VALUE) +
        "mr-4 absolute left-10 bottom-10 md:static md:left-auto md:bottom-auto " +
        "w-16 h-16 flex items-center justify-center border border-gray dark:border-darkgrey text-dark dark:text-light rounded-full text-5xl transition-all active:scale-90";


    const incrementButtonClassname = isLimitReached(count >= MAX_COUNTER_VALUE) +
        "ml-4 absolute right-10 bottom-10 md:static md:right-auto md:bottom-auto " +
        "w-16 h-16 flex items-center justify-center border border-gray dark:border-darkgrey text-dark dark:text-light rounded-full text-5xl transition-all active:scale-90";

    return (
        <>
            <div className="flex items-center justify-center">
                <button
                    className={decrementButtonClassname}
                    onClick={() => handleUpdateCounter('decrement')}
                >
                    -
                </button>
                <p className="w-[345px] text-9xl text-dark dark:text-light flex items-center justify-center text-center">{count}</p>
                <button
                    disabled={count >= MAX_COUNTER_VALUE}
                    className={incrementButtonClassname}
                    onClick={() => handleUpdateCounter('increment')}
                >
                    +
                </button>
            </div>
            <div className="flex flex-col items-center space-y-2 mt-8">
                <p className="text-lg text-darkgrey dark:text-grey">Set count</p>
                <input
                    type="number"
                    className="w-[100px] px-4 py-2 text-center text-xl font-medium rounded-full shadow-md text-dark dark:text-light bg-grey dark:bg-darkgrey outline-none"
                    value={stepValue}
                    onChange={handleStepChange}
                />
            </div>
        </>
    );
};
