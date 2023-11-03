"use client";
import useScrollTop from "@/app/hooks/useScrollTop";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";

interface PostContextState {
  refs: Map<string, RefObject<HTMLParagraphElement>>; // refs to SectionHeader h tags
  selected: number; // tracks which heading we're currently on based on scroll depth
}
interface PostContextDispatch {
  addRef: ((key: string, ref: RefObject<HTMLParagraphElement>) => void) | null;
  clearRefs: (() => void) | null;
}

const defaultPostContextState = {
  refs: new Map(),
  selected: 0,
  readTime: 0,
};
const defaultPostContextDispatch = {
  addRef: null,
  clearRefs: null,
};

const PostContext = createContext<PostContextState & PostContextDispatch>({
  ...defaultPostContextState,
  ...defaultPostContextDispatch,
});

export function PostContextProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [{ refs, selected }, setState] = useState<PostContextState>(
    defaultPostContextState
  );
  const [scrollTop, height] = useScrollTop();
  const { height: windowHeight } = useWindowSize();

  const addRef = useCallback(
    (key: string, ref: RefObject<HTMLParagraphElement>) => {
      if (!refs.has(key)) {
        refs.set(key, ref);
        setState((state) => ({ ...state, refs: new Map(refs.set(key, ref)) }));
      }
    },
    [refs]
  );

  const clearRefs = useCallback(
    () => setState((state) => ({ ...state, refs: new Map() })),
    []
  );

  useEffect(() => {
    if (windowHeight === null) {
      return;
    }
    let positions: [string, number][] = [];
    let selected = 0;
    const threshold = scrollTop + windowHeight * 0.66;
    refs.forEach((ref, key) => {
      if (ref.current) {
        positions.push([
          key,
          ref.current.getBoundingClientRect().top + scrollTop,
        ]);
      }
    });
    positions
      .sort((a, b) => a[1] - b[1])
      .forEach(([key, refTop], index) => {
        if (index === 0 || refTop < threshold) {
          selected = index;
        }
      });
    setState((state) => ({ ...state, selected }));
  }, [scrollTop, height, refs, windowHeight]);

  return (
    <PostContext.Provider value={{ refs, selected, addRef, clearRefs }}>
      {children}
    </PostContext.Provider>
  );
}

export default PostContext;
