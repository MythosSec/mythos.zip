"use client";
import { useMemo, useContext } from "react";
import { Document } from "@contentful/rich-text-types";
import { Link, Stack, StackProps, Typography, useTheme } from "@mui/joy";
import clsx from "clsx";
import PostContext from "./usePostContext";
import { findSectionHeadings } from "@/app/util/contentful";
import { useMediaQuery } from "@mui/material";

const minItemOpacity = 0.25;
const proximityCount = 6;

export default function TableOfContents({
  document,
  ...props
}: StackProps & { document: Document }) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { selectedSectionHeader: selected } = useContext(PostContext);
  const headings = useMemo(() => findSectionHeadings(document), [document]);

  if (isSm) {
    return null;
  }

  return (
    <Stack {...props} position="sticky" alignSelf="flex-start" top={0}>
      <Typography mb={3} level="title-lg" mt={24}>
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
  );
}
