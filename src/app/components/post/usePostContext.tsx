"use client";
import useScrollTop from "@/app/hooks/useScrollTop";
import { useWindowSize } from "@uidotdev/usehooks";
import { useParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";

interface PostContextState {
  sectionHeaderRefs: Map<string, RefObject<HTMLParagraphElement>>; // refs to SectionHeader h tags
  selectedSectionHeader: number; // tracks which heading we're currently on based on scroll depth
}
interface PostContextDispatch {
  addSectionHeaderRef:
    | ((key: string, ref: RefObject<HTMLParagraphElement>) => void)
    | null;
}

const defaultPostContextState = {
  sectionHeaderRefs: new Map(),
  selectedSectionHeader: 0,
};
const defaultPostContextDispatch = {
  addSectionHeaderRef: null,
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
  const [{ sectionHeaderRefs, selectedSectionHeader }, setState] =
    useState<PostContextState>(defaultPostContextState);
  const [scrollTop, height] = useScrollTop();
  const { height: windowHeight } = useWindowSize();
  const params = useParams();

  const addSectionHeaderRef = useCallback(
    (key: string, ref: RefObject<HTMLParagraphElement>) => {
      if (!sectionHeaderRefs.has(key)) {
        sectionHeaderRefs.set(key, ref);
        setState((state) => ({
          ...state,
          sectionHeaderRefs: new Map(sectionHeaderRefs.set(key, ref)),
        }));
      }
    },
    [sectionHeaderRefs]
  );

  useEffect(() => {
    // clear refs on route change
    setState((state) => ({ ...state, sectionHeaderRefs: new Map() }));
  }, [params]);

  useEffect(() => {
    if (windowHeight === null) {
      return;
    }
    // calculate current section header highlight
    let positions: [string, number][] = [];
    let selectedSectionHeader = 0;
    const threshold = scrollTop + windowHeight * 0.7;
    sectionHeaderRefs.forEach((ref, key) => {
      if (ref.current) {
        positions.push([
          key,
          ref.current.getBoundingClientRect().top + scrollTop,
        ]);
      }
    });
    positions
      .sort((a, b) => a[1] - b[1])
      .forEach(([_, refTop], index) => {
        if (index === 0 || refTop < threshold) {
          selectedSectionHeader = index;
        }
      });

    setState((state) => ({
      ...state,
      selectedSectionHeader,
    }));
  }, [scrollTop, height, sectionHeaderRefs, windowHeight]);

  return (
    <PostContext.Provider
      value={{
        sectionHeaderRefs,
        selectedSectionHeader,
        addSectionHeaderRef,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export default PostContext;
