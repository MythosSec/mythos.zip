import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

export default function useOnWindowSizeChange() {
  const [lastWidth, setLastWidth] = useState(0);
  const [lastHeight, setLastHeight] = useState(0);
  const [didChange, setDidChange] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (width !== lastWidth || height !== lastHeight) {
      let nextWidth = lastWidth,
        nextHeight = lastHeight;
      if (typeof width === "number") {
        setLastWidth(width);
        nextWidth = width;
      }
      if (typeof height === "number") {
        setLastHeight(height);
        nextHeight = height;
      }
      setDidChange(true);
      setTimeout(() => setDidChange(false), 0);
    }
  }, [width, height, lastWidth, lastHeight]);

  return { width, height, didChange };
}
