import Link from "next/link";
import { Button } from "./button";
import Logo from "@/components/ui/logo";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="flex">
      <nav className="flex flex-1 justify-center items-center p-4 bg-primary dark:bg-secondary dark:border-b-primary dark:border-b-3 dark:shadow-lg dark:shadow-primary/70">
        <div className="mr-8 w-full flex justify-end">
          <Logo src="/f1_white.png" alt="F1 Logo" width={64} height={64} />
        </div>
        <ul className="flex justify-center items-center gap-4">
          <li>
            <Button variant="link" className="text-white font-semibold">
              <Link href="/">Home</Link>
            </Button>
          </li>
          <li>
            <Button variant="link" className="text-white font-semibold">
              <Link href="/standings">Standings</Link>
            </Button>
          </li>
          <li>
            <Button variant="link" className="text-white font-semibold">
              <Link href="/events">Events</Link>
            </Button>
          </li>
          <li>
            <Button variant="link" className="text-white font-semibold">
              <Link href="/events">News</Link>
            </Button>
          </li>
          <li>
            <Button variant="link" className="text-white font-semibold">
              <Link href="/highlights">Highlights</Link>
            </Button>
          </li>
        </ul>
        <div className="ml-8 w-full flex justify-end">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
