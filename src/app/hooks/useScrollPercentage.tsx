import { useEffect, useState } from "react";
import { documentHeight, scrollTop } from "../util/dom";
import { debounce } from "../util/timing";

export default function useScrollPercentage() {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    const [onScroll, cleanupOnScroll] = debounce(
      () => setPercent(scrollTop()),
      10
    );
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
      cleanupOnScroll();
    };
  }, []);
  return [percent * 100, (100 - percent) * 100];
}
