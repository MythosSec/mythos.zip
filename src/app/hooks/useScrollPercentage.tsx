import { useEffect, useState } from "react";
import { documentHeight, scrollTop } from "../util/dom";
import { debounce } from "../util/timing";

export default function useScrollPercentage() {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    const callback = () => setPercent(scrollTop());
    const [onScroll, cleanupOnScroll] = debounce(
      () => window.requestAnimationFrame(callback),
      5
    );
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
      cleanupOnScroll();
    };
  }, []);
  return [percent * 100, (100 - percent) * 100];
}
