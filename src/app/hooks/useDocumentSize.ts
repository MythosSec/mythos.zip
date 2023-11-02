import { useIntersectionObserver } from "@uidotdev/usehooks";
import { documentHeight, documentWidth } from "../util/dom";

export default function useDocumentSize() {
  const [, details] = useIntersectionObserver({
    root: typeof window === "undefined" ? null : document,
  });
  return {
    height: documentHeight(details?.target),
    width: documentWidth(details?.target),
  };
}
