"use client";
import { getBlogPosts } from "@/app/api/contentful";
import { articleRoute, seriesItemRoute } from "@/app/routes";
import { parsePostDate } from "@/app/util/date";
import { useMediaQuery } from "@mui/material";
import { Stack, Typography, Link, useTheme, StackProps } from "@mui/joy";

export default function PostsLink({
  post: { slug, shortDescription, title, series, publishedDate, readLength },
  showSeries = true,
  ...props
}: {
  post: Awaited<ReturnType<typeof getBlogPosts>>["items"][0];
} & StackProps & { showSeries?: boolean }) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack {...props} sx={{ "&:first-child": { mt: 0 } }}>
      <Link
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        href={articleRoute(slug)}
        width="100%"
      >
        <Typography level="body-sm">
          <Typography>{parsePostDate(publishedDate)}</Typography>
        </Typography>
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
        <Typography level="body-sm">
          {readLength}&nbsp;minute&nbsp;read
        </Typography>
      </Link>
      {series && showSeries && (
        <Stack mt={3}>
          <Typography>
            <Link fontWeight="bold" href={seriesItemRoute(series.name)}>
              {series.name}
            </Link>
            &nbsp;series
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
