"use client";
import { Link, Stack, StackProps, Typography, useTheme } from "@mui/joy";
import { parsePostDate } from "@/app/util/date";
import { seriesRoute } from "@/app/routes";
import { useMediaQuery } from "@mui/material";
import {
  TypeComponentAuthor,
  TypeComponentSeries,
} from "@/app/api/contentful/types";

export default function PostHeader({
  title,
  shortDescription,
  series,
  publishedDate,
  readLength,
  author,
  ...props
}: Omit<StackProps, "content"> & {
  title: string;
  shortDescription?: string;
  publishedDate: string;
  readLength: number;
  series?: TypeComponentSeries;
  author: TypeComponentAuthor;
}) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack {...props}>
      <Stack mb={0.2}>
        <Typography>
          {author.name}
          <Typography textColor="text.tertiary">&nbsp;—&nbsp;</Typography>
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
  );
}
