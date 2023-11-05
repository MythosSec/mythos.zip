"use client";
import { Stack, StackProps, useTheme } from "@mui/joy";
import { Document } from "@contentful/rich-text-types";
import PostContentDocument from "./content/PostContentDocument";
import TableOfContents from "./TableOfContents";
import Sheet from "../Sheet";
import { Asset } from "contentful";
import Image from "../Image";
import { useMediaQuery } from "@mui/material";

export default function PostContent({
  document,
  featuredImage,
  showFeaturedImage = false,
  showTableOfContents = true,
  ...props
}: StackProps & {
  document: Document;
  featuredImage: Asset;
  showFeaturedImage?: boolean;
  showTableOfContents?: boolean;
}) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      position="relative"
      flexDirection={isSm ? "column" : "row"}
      {...props}
    >
      {showTableOfContents && (
        <Stack
          className="left-gutter"
          position="sticky"
          overflow="initial"
          display={isSm ? "none" : "block"}
        >
          <TableOfContents document={document} pb={4} />
        </Stack>
      )}
      <Stack className="right-gutter">
        {featuredImage && showFeaturedImage && (
          <Stack mb={isSm ? 4 : 6}>
            <Image
              src={`https:${featuredImage.fields.file!.url}`}
              alt={(featuredImage.fields.title as string) || ""}
              sizes="100vw"
              width={0}
              height={0}
              style={{ width: "100%", height: "auto" }}
            />
          </Stack>
        )}
        <Sheet
          variant={isSm ? "soft" : "glass"}
          sx={{
            p: 6,
            [theme.breakpoints.down("sm")]: {
              p: 0,
              background: "transparent",
            },
            "& > *:last-child": { mb: 0 },
            "& > p, & > ul": { mb: 3 },
          }}
        >
          <PostContentDocument {...document} />
        </Sheet>
      </Stack>
    </Stack>
  );
}
