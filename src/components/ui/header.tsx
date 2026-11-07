import Link from "next/link";
import { Button } from "./button";
import Logo from "@/components/ui/logo";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  {
    id: "home",
    label: "Home",
    link: "/",
  },
  {
    id: "results",
    label: "Results",
    link: "/results",
  },
  {
    id: "standings",
    label: "Standings",
    link: "/standings",
  },
  {
    id: "events",
    label: "Events",
    link: "/events",
  },
  {
    id: "news",
    label: "News",
    link: "/news",
  },
  {
    id: "highlights",
    label: "Highlights",
    link: "/highlights",
  },
];

export default function Header() {
  return (
    <header className="flex">
      <nav className="flex flex-1 justify-center items-center bg-primary inset-shadow-y inset-shadow-black/70 dark:bg-secondary dark:border-b-primary dark:border-b dark:shadow-lg dark:shadow-primary/70">
        <div className="mr-8 p-4 w-full flex justify-end">
          <Logo
            src="/f1_white.png"
            alt="F1 Logo"
            width={64}
            height={64}
            className="dark:hidden"
          />
          <Logo
            src="/f1_red.png"
            alt="F1 Logo"
            width={64}
            height={64}
            className="hidden dark:block"
          />
        </div>
        <ul className="flex size-full justify-center items-center">
          {navLinks.map((navLink) => (
            <li key={navLink.id} className="size-full flex justify-center items-center hover:bg-input/10 hover:border-be-2 hover:border-input">
              <Button
                variant="link"
                className="text-white font-semibold p-0 size-full flex hover:no-underline rounded-none"
              >
                <Link
                  href={navLink.link}
                  className="size-full flex justify-center items-center"
                >
                  {navLink.label}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
        <div className="ml-8 p-4 w-full flex justify-end">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
