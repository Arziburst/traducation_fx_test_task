
import { ThemeToggle, Story, Counter } from "./сomponents";
import { useCounter } from "./libs/counter.context";

export const App = () => {
  const { handleResetCounter } = useCounter();
  return (
    <section className="bg-light dark:bg-dark h-screen w-screen flex flex-col items-center justify-between gap-6 p-6">
      <header>
        <Story />
        <ThemeToggle />
      </header>
      <main className="flex-col items-center justify-center">
        <Counter />
      </main>
      <footer className="">
        <button
          onClick={handleResetCounter}
          className="w-[100px] px-4 py-2 rounded-full transition-all active:scale-90 text-dark dark:text-light bg-grey dark:bg-darkgrey"
        >
          Reset
        </button>
      </footer>
    </section>
  );
};