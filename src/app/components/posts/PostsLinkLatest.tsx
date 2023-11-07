"use client";
import { getBlogPosts } from "@/app/api/contentful";
import { articleRoute, seriesItemRoute } from "@/app/routes";
import { parsePostDate } from "@/app/util/date";
import { useMediaQuery } from "@mui/material";
import {
  Stack,
  Typography,
  Link,
  useTheme,
  StackProps,
  Divider,
} from "@mui/joy";

export default function PostsLinkLatest({
  post: { slug, shortDescription, title, series, publishedDate, readLength },
  ...props
}: {
  post: Awaited<ReturnType<typeof getBlogPosts>>["items"][0];
} & StackProps) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack flexDirection="column" width="100%" {...props}>
      <Link href={articleRoute(slug)}>
        <Stack>
          <Typography>
            Latest
            <Typography sx={{ opacity: 0.16 }} mx={1}>
              —
            </Typography>
            <Typography>{parsePostDate(publishedDate)}</Typography>
          </Typography>
        </Stack>
      </Link>
      <Link href={articleRoute(slug)}>
        <Stack
          flexDirection={isSm ? "column" : "row"}
          justifyContent="space-between"
        >
          <Stack>
            <Stack>
              <Typography level="h1" ml={-0.4}>
                {title}
              </Typography>
              {shortDescription && (
                <Typography level="body-lg">{shortDescription}</Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Link>

      <Link href={articleRoute(slug)}>
        <Stack flexDirection="row" alignItems="center">
          <Typography level="body-md">
            {readLength}&nbsp;minute&nbsp;read
          </Typography>
        </Stack>
      </Link>

      {series && (
        <Link href={seriesItemRoute(series.name)}>
          <Stack mt={3}>
            <Typography>
              <Typography fontWeight="bold">{series.name}</Typography>
              &nbsp;series
            </Typography>
          </Stack>
        </Link>
      )}
    </Stack>
  );
}
