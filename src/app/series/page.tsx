import { Stack } from "@mui/joy";
import { getSeries } from "../api/contentful";
import Series from "../components/series/Series";

export default async function SeriesPage() {
  const series = await getSeries();
  return (
    <Stack>
      <Series series={series.items} />
    </Stack>
  );
}
