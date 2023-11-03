import { Link, Stack, StackProps, Typography } from "@mui/joy";
import {
  IComponentAuthor,
  IComponentSeries,
} from "../../../../types/contentful";
import { parsePostDate } from "@/app/util/date";
import { encodeClassName } from "@/app/util/string";

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
  return (
    <Stack {...props}>
      <Stack mb={0.2}>
        <Typography>
          <Link
            fontWeight="bold"
            href={`/author/${encodeClassName(author.fields.name)}`}
          >
            {author.fields.name}
          </Link>
          <Typography textColor="text.tertiary">&nbsp;—&nbsp;</Typography>
          <Typography>{parsePostDate(publishedDate)}</Typography>
        </Typography>
      </Stack>
      <Stack flexDirection="row" justifyContent="space-between">
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
        <Stack flexDirection="row" alignItems="center" ml={4}>
          <Typography level="body-md">
            {readLength}&nbsp;minute&nbsp;read
          </Typography>
        </Stack>
      </Stack>
      <Stack mt={3}>
        {series && (
          <Typography>
            <Link
              fontWeight="bold"
              href={`/series/${encodeClassName(series.fields.name)}`}
            >
              {series.fields.name}
            </Link>
            &nbsp;series
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
