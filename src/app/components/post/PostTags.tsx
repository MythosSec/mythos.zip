"use client";
import { Box, Stack, StackProps, Typography, Link, useTheme } from "@mui/joy";
import LinkList from "./LinkList";
import { tagRoute, tagsRoute } from "@/app/routes";
import { useMediaQuery } from "@mui/material";
import { TypeComponentTag } from "@/app/api/contentful/types";

export default function PostTags({
  tags,
  ...props
}: StackProps & {
  tags: TypeComponentTag[];
}) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <Stack
      flexDirection={isSm ? "column" : "row"}
      position="relative"
      {...props}
    >
      <Stack className="left-gutter">
        <Link href={tagsRoute()}>
          <Typography level="title-lg" mt={1.5}>
            Topics
          </Typography>
        </Link>
      </Stack>
      <Box
        className="right-gutter"
        px={4}
        sx={{ "& > div": { float: "left" } }}
      >
        <LinkList
          links={tags
            .filter(({ internalOnly }) => !internalOnly)
            .map(({ name }) => ({
              name,
              url: tagRoute(name),
            }))}
        />
      </Box>
    </Stack>
  );
}
