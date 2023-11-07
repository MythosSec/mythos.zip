import { useEffect, useState } from "react";
import useScrollPercentage from "./useScrollPercentage";

export default function useScrollThreshold({
  threshold = 70,
  onThresholdMet,
}: {
  threshold?: number;
  onThresholdMet: () => void;
}) {
  const [didSend, setDidSend] = useState(false);
  const [percent] = useScrollPercentage();
  useEffect(() => {
    if (percent >= threshold) {
      if (!didSend) {
        setDidSend(true);
        if (typeof onThresholdMet === "function") {
          onThresholdMet();
        }
      }
    } else {
      if (didSend) {
        setDidSend(false);
      }
    }
  }, [didSend, onThresholdMet, threshold, percent]);
}
