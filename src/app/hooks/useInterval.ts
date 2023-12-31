import { useRef, useEffect } from "react";

export default function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, []);
}
