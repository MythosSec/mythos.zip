import { getBlogPostsBySeriesId, getSeriesItem } from "@/app/api/contentful";
import { decodeClassName } from "@/app/util/string";
import SeriesItem from "@/app/components/seriesItem/SeriesItem";
import { ResolvingMetadata, Metadata } from "next";

export default async function SeriesPage({
  params,
}: {
  params: { id: string };
}) {
  const name = decodeClassName(params.id);
  const series = await getSeriesItem(name);
  const posts = await getBlogPostsBySeriesId(series.id);

  return <SeriesItem name={series.name} id={series.id} initialPosts={posts} />;
}

export async function generateMetadata(
  {
    params: { id },
  }: {
    params: { id: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const name = decodeClassName(id);
  const series = await getSeriesItem(name);
  const metadata = await parent;
  return {
    ...(metadata as any),
    title: series.name,
  };
}
