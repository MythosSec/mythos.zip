"use client";
import { useMemo, useContext, useRef, useEffect } from "react";
import { Document } from "@contentful/rich-text-types";
import { Link, Stack, StackProps, Typography } from "@mui/joy";
import clsx from "clsx";
import PostContext from "./usePostContext";
import { findSectionHeadings } from "@/app/util/contentful";

const minItemOpacity = 0.25;
const proximityCount = 6;

export default function TableOfContents({
  document,
  ...props
}: StackProps & { document: Document }) {
  const ref = useRef<HTMLDivElement>(null);
  const {
    setTableOfContentsRef,
    selectedSectionHeader: selected,
    tableOfContentsY,
    tableOfContentsLocked,
  } = useContext(PostContext);
  const headings = useMemo(() => findSectionHeadings(document), [document]);

  useEffect(() => {
    if (ref && setTableOfContentsRef) {
      setTableOfContentsRef!(ref);
    }
  }, [ref, setTableOfContentsRef]);

  return (
    <Stack
      ref={ref}
      position={tableOfContentsLocked ? "absolute" : "fixed"}
      top={tableOfContentsLocked ? tableOfContentsY : "unset"}
    >
      <Stack {...props}>
        <Typography mb={3} level="title-lg">
          Contents
        </Typography>
        {headings.map(({ title, className }, index) => {
          const isSelected = (!selected && index === 0) || selected === index;
          const proximity = Math.min(
            index > selected ? index - selected : selected - index,
            proximityCount
          );
          const unselectedOpacity = Math.max(
            ((1 - minItemOpacity) / proximityCount) *
              (proximityCount - proximity),
            minItemOpacity
          );
          return (
            <Link
              key={className}
              href={`#${className}`}
              className={clsx({ selected: isSelected })}
              fontWeight={isSelected ? "bold" : "normal"}
              sx={{
                opacity: isSelected ? 1 : unselectedOpacity,
                transition: "0.1s opacity",
              }}
            >
              {title}
            </Link>
          );
        })}
      </Stack>
    </Stack>
  );
}
