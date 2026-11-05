import Logo from "@/components/ui/logo";

export default function Footer() {
  return (
    <footer className="flex">
      <div className="flex-1 flex p-4 justify-center items-center bg-primary dark:bg-secondary dark:border-t-primary dark:border-t-3">
        <div className="text-lg font-semibold text-white">
          <Logo src="/f1_white.png" alt="F1 Logo" width={64} height={64} />
        </div>
      </div>
    </footer>
  );
}
