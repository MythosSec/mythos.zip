import { Stack } from "@mui/joy";
import { getSeries } from "../api/contentful";
import Series from "../components/series/Series";
import { ResolvingMetadata, Metadata } from "next";

export default async function SeriesPage() {
  const series = await getSeries();
  return (
    <Stack>
      <Series series={series.items} />
    </Stack>
  );
}

export async function generateMetadata(
  {
    params: { id },
  }: {
    params: { id: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const metadata = await parent;
  return {
    ...(metadata as any),
    title: "Series | MythosSec",
  };
}
