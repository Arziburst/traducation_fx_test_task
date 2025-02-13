import React, { useState } from "react";
import { useTheme } from "../libs/theme.context";
import { ThemeContextType } from "../types";
import { Moon, Sun } from "lucide-react";

const themes = ["dark", "light", "auto"] as ThemeContextType["theme"][];

export const ThemeToggle: React.FC = () => {
    const { toggleTheme, theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const handleThemeChange = (newTheme: ThemeContextType['theme']) => {
        toggleTheme(newTheme);
        setIsOpen(false);
    };

    const iconResolver = (theme: ThemeContextType['theme']) => {
        switch (theme) {
            case "dark":
                return <Moon size={24} />;
            case "light":
                return <Sun size={24} />;
            case "auto":
                return "Auto";
            default:
                return "Auto";
        }
    }

    return (
        <div className="absolute top-0 right-0 m-4 transition-all active:scale-90">
            <button
                className="w-12 h-12 flex items-center justify-center rounded-full bg-dark dark:bg-light text-light dark:text-dark"
                onClick={() => setIsOpen(!isOpen)}
            >
                {iconResolver(theme)}
            </button>
            {isOpen && (
                <div className="top-0 h-40 absolute bg-dark dark:bg-light text-light dark:text-dark rounded-4xl flex flex-col items-center justify-between">
                    {themes.map((innerThemeName, index) => (
                        <button
                            key={`ThemeToggle-${index}`}
                            onClick={() => handleThemeChange(innerThemeName)}
                            className="w-12 h-12 rounded-full grid place-items-center"
                        >
                            {iconResolver(innerThemeName)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
