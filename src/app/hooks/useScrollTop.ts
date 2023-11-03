import { useEffect, useState } from "react";
import { scrollTop } from "../util/dom";
import { debounce } from "../util/timing";

export default function useScrollTop() {
  const [{ top, height }, setState] = useState({ top: 0, height: 0 });
  useEffect(() => {
    const callback = () => {
      const [nextTop, nextHeight] = scrollTop();
      setState({ top: nextTop, height: nextHeight });
    };
    const [onScroll, cleanupOnScroll] = debounce(callback, 1);
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
      cleanupOnScroll();
    };
  }, []);
  return [top, height];
}
