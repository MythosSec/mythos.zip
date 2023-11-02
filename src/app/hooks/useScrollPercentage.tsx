import { useEffect, useState } from "react";
import { scrollTop } from "../util/dom";
import { debounce } from "../util/timing";

export default function useScrollPercentage() {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    const callback = () => setPercent(scrollTop());
    const [onScroll, cleanupOnScroll] = debounce(callback, 1);
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
      cleanupOnScroll();
    };
  }, []);
  return [percent * 100, (100 - percent) * 100];
}
