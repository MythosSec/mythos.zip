"use client";
import { Box, Stack, StackProps, Typography, Link, useTheme } from "@mui/joy";
import LinkList from "./LinkList";
import { seriesItemRoute, seriesRoute } from "@/app/routes";
import { useMediaQuery } from "@mui/material";
import { TypeComponentSeries } from "@/app/api/contentful/types";

export default function PostSeries({
  series,
  ...props
}: StackProps & {
  series: TypeComponentSeries | undefined;
}) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  if (!series) {
    return null;
  }

  return (
    <Stack
      flexDirection={isSm ? "column" : "row"}
      position="relative"
      {...props}
    >
      <Stack className="left-gutter">
        <Link href={seriesRoute()}>
          <Typography level="title-lg" mt={1.5}>
            Series
          </Typography>
        </Link>
      </Stack>
      <Box
        className="right-gutter"
        px={4}
        sx={{ "& > div": { float: "left" } }}
      >
        <LinkList
          links={[{ name: series.name, url: seriesItemRoute(series.name) }]}
        />
      </Box>
    </Stack>
  );
}
