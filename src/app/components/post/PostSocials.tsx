"use client";
import { Stack, StackProps, Typography, useTheme } from "@mui/joy";
import { SocialMediaSkeleton } from "@/app/api/contentful";
import LinkList from "./LinkList";
import { useMediaQuery } from "@mui/material";

export default function PostSocials({
  socials,
  ...props
}: StackProps & {
  socials: SocialMediaSkeleton["fields"];
}) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      flexDirection={isSm ? "column" : "row"}
      position="relative"
      {...props}
    >
      <Stack className="left-gutter">
        <Typography level="title-lg" mt={1.5}>
          Follow me
        </Typography>
      </Stack>
      <Stack className="right-gutter" flexDirection="row" px={4}>
        <LinkList
          links={socials.fields
            .filter(({ fields: { enabled } }) => enabled)
            .map(({ fields: { link: url, name, enabled } }) => ({
              url,
              name,
              enabled,
            }))}
        />
      </Stack>
    </Stack>
  );
}
