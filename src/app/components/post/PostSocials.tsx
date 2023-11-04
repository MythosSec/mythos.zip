"use client";
import { Stack, StackProps, Typography, useTheme } from "@mui/joy";
import LinkList from "./LinkList";
import { useMediaQuery } from "@mui/material";
import { TypeComponentSocials } from "@/app/api/contentful/types";

export default function PostSocials({
  socials,
  ...props
}: StackProps & {
  socials: TypeComponentSocials[];
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
          links={socials
            .filter(({ enabled }) => enabled)
            .map(({ link: url, name, enabled }) => ({
              url,
              name,
              enabled,
            }))}
        />
      </Stack>
    </Stack>
  );
}
