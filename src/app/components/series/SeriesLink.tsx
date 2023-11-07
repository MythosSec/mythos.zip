import { getSeries } from "@/app/api/contentful";
import { seriesItemRoute } from "@/app/routes";
import { Link, LinkProps, Stack, Typography } from "@mui/joy";

export default function SeriesLink({
  series: { name },
  ...props
}: { series: Awaited<ReturnType<typeof getSeries>>["items"][0] } & LinkProps) {
  return (
    <Link href={seriesItemRoute(name)} {...props}>
      <Stack>
        <Typography level="h3">{name}</Typography>
      </Stack>
    </Link>
  );
}
