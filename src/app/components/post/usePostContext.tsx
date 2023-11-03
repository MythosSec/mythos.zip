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
  sectionHeaderRefs: Map<string, RefObject<HTMLParagraphElement>>; // refs to SectionHeader h tags
  selectedSectionHeader: number; // tracks which heading we're currently on based on scroll depth
  postContentWrapperRef: RefObject<HTMLDivElement> | undefined; // a ref to the post content wrapper, used to limit the y position of the table of contents
  tableOfContentsLocked: boolean; // if true, table of contents will be rendered in document flow at the bottom of the post
  tableOfContentsY: number; // if tableOfContentsLocked is true, set table of contents to this y value
  tableOfContentsRef: RefObject<HTMLDivElement> | undefined;
}
interface PostContextDispatch {
  addSectionHeaderRef:
    | ((key: string, ref: RefObject<HTMLParagraphElement>) => void)
    | null;
  clearSectionHeaderRefs: (() => void) | null;
  setPostContentWrapperRef: ((ref: RefObject<HTMLDivElement>) => void) | null;
  setTableOfContentsRef: ((ref: RefObject<HTMLDivElement>) => void) | null;
}

const defaultPostContextState = {
  sectionHeaderRefs: new Map(),
  selectedSectionHeader: 0,
  postContentWrapperRef: undefined,
  tableOfContentsRef: undefined,
  tableOfContentsLocked: false,
  tableOfContentsY: 0,
};
const defaultPostContextDispatch = {
  addSectionHeaderRef: null,
  clearSectionHeaderRefs: null,
  setPostContentWrapperRef: null,
  setTableOfContentsRef: null,
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
  const [
    {
      sectionHeaderRefs,
      selectedSectionHeader,
      postContentWrapperRef,
      tableOfContentsY,
      tableOfContentsLocked,
      tableOfContentsRef,
    },
    setState,
  ] = useState<PostContextState>(defaultPostContextState);
  const [scrollTop, height] = useScrollTop();
  const { height: windowHeight } = useWindowSize();

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

  const clearSectionHeaderRefs = useCallback(
    () => setState((state) => ({ ...state, sectionHeaderRefs: new Map() })),
    []
  );

  const setPostContentWrapperRef = useCallback(
    (ref: RefObject<HTMLDivElement>) =>
      setState((state) => ({ ...state, postContentWrapperRef: ref })),
    []
  );

  const setTableOfContentsRef = useCallback(
    (ref: RefObject<HTMLDivElement>) =>
      setState((state) => ({ ...state, tableOfContentsRef: ref })),
    []
  );

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

    // calculate table of contents lock state
    let nextTableOfContentsY = tableOfContentsY;
    let nextTableOfContentsLocked = false;
    if (postContentWrapperRef?.current && tableOfContentsRef?.current) {
      const wrapper = postContentWrapperRef.current;
      const toc = tableOfContentsRef.current;
      const wrapperEndY =
        wrapper.getBoundingClientRect().top +
        wrapper.offsetHeight +
        scrollTop -
        windowHeight +
        toc.offsetHeight;
      nextTableOfContentsY = wrapperEndY;
      nextTableOfContentsLocked = scrollTop > wrapperEndY - 100;
    }

    setState((state) => ({
      ...state,
      selectedSectionHeader,
      tableOfContentsY: nextTableOfContentsY,
      tableOfContentsLocked: nextTableOfContentsLocked,
    }));
  }, [
    scrollTop,
    height,
    sectionHeaderRefs,
    windowHeight,
    postContentWrapperRef,
    tableOfContentsRef,
  ]);

  return (
    <PostContext.Provider
      value={{
        sectionHeaderRefs,
        postContentWrapperRef,
        selectedSectionHeader,
        tableOfContentsRef,
        tableOfContentsLocked,
        tableOfContentsY,
        addSectionHeaderRef,
        setPostContentWrapperRef,
        setTableOfContentsRef,
        clearSectionHeaderRefs,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export default PostContext;
