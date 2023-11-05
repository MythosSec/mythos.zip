"use client";
import { getBlogPosts } from "@/app/api/contentful";
import { articleRoute, authorRoute, seriesRoute } from "@/app/routes";
import { parsePostDate } from "@/app/util/date";
import { useMediaQuery } from "@mui/material";
import { Stack, Typography, Link, useTheme, LinkProps } from "@mui/joy";

export default function PostsLink({
  post: {
    slug,
    shortDescription,
    title,
    series,
    publishedDate,
    author,
    readLength,
  },
  ...props
}: {
  post: Awaited<ReturnType<typeof getBlogPosts>>["items"][0];
} & LinkProps) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Link
      display="flex"
      flexDirection="column"
      href={articleRoute(slug)}
      {...props}
    >
      <Stack width="100%">
        <Stack mb={0.2}>
          <Typography>
            <Typography>{parsePostDate(publishedDate)}</Typography>
          </Typography>
        </Stack>
        <Stack
          flexDirection={isSm ? "column" : "row"}
          justifyContent="space-between"
        >
          <Stack>
            <Stack>
              <Typography level="h3" ml={-0.4}>
                {title}
              </Typography>
              {shortDescription && (
                <Typography level="body-lg" mb={0.2}>
                  {shortDescription}
                </Typography>
              )}
            </Stack>
          </Stack>
          <Stack flexDirection="row" alignItems="center" ml={isSm ? 0 : 4}>
            <Typography level="body-md">
              {readLength}&nbsp;minute&nbsp;read
            </Typography>
          </Stack>
        </Stack>
        {series && (
          <Stack mt={3}>
            <Typography>
              <Link fontWeight="bold" href={seriesRoute(series.name)}>
                {series.name}
              </Link>
              &nbsp;series
            </Typography>
          </Stack>
        )}
      </Stack>
    </Link>
  );
}
