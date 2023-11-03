"use client";
import { Link, Stack, StackProps, Typography, useTheme } from "@mui/joy";
import {
  IComponentAuthor,
  IComponentSeries,
} from "../../../../types/contentful";
import { parsePostDate } from "@/app/util/date";
import { authorRoute, seriesRoute } from "@/app/routes";
import { useMediaQuery } from "@mui/material";

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
  series?: IComponentSeries;
  author: IComponentAuthor;
}) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Stack {...props}>
      <Stack mb={0.2}>
        <Typography>
          <Link fontWeight="bold" href={authorRoute(author.fields.name)}>
            {author.fields.name}
          </Link>
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
      <Stack mt={3}>
        {series && (
          <Typography>
            <Link fontWeight="bold" href={seriesRoute(series.fields.name)}>
              {series.fields.name}
            </Link>
            &nbsp;series
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
