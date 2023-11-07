import { getSeries } from "@/app/api/contentful";
import { Stack, Typography } from "@mui/joy";
import SeriesLink from "./SeriesLink";

export default function Series({
  series,
}: {
  series: Awaited<ReturnType<typeof getSeries>>["items"];
}) {
  return (
    <Stack>
      <Typography level="h1">Series</Typography>
      <Stack mt={4}>
        {series.map((series) => (
          <SeriesLink key={series.name} series={series} />
        ))}
      </Stack>
    </Stack>
  );
}
