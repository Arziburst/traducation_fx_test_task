import React, { useState } from "react";
import { extractTimestampFromUUIDv7, getTimeAgo } from "../tools";
import { ChevronUp } from "lucide-react";
import { HistoryEntry } from "../types";
import { useCounter } from "../libs/counter.context";

const getTimeAgoFromId = (_id: HistoryEntry['_id']) => getTimeAgo(extractTimestampFromUUIDv7(_id));


export const Story: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const counter = useCounter();

    return (
        <>
            {counter.history.length > 0 && (
                <div className="relative">
                    <button
                        className="flex flex-row items-center px-4 py-2 bg-dark text-light dark:bg-light dark:text-dark rounded-full text-lg transition-all active:scale-90"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span>Story</span>
                        <ChevronUp className={`ml-2 transition-transform ${!isOpen ? "rotate-180" : ""} transition-all`} />
                    </button>
                    {isOpen && (
                        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-60 max-h-90 overflow-y-auto bg-grey dark:bg-darkgrey p-4 rounded-lg no-scrollbar">
                            {counter.history.map((item, index) => (
                                <div key={`Story-${index}`} className="flex justify-between py-1 text-dark dark:text-light">
                                    <span>{item.type}{item?.step && ` by ${item?.step}`}</span>
                                    <span className="text-sm text-darkgrey dark:text-grey">{getTimeAgoFromId(item._id)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
