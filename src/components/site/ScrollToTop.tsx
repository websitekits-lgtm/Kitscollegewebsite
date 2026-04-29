import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SHOW_AT = 400; // px scrolled before button appears

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 grid size-11 sm:size-12 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/30 hover:bg-accent/90 hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="size-5" />
    </button>
  );
};
