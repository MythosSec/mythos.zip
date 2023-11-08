import {
  getBlogPostsBySeriesId,
  getSeriesItem,
  getSeries,
} from "@/app/api/contentful";
import { decodeClassName, encodeClassName } from "@/app/util/string";
import SeriesItem from "@/app/components/seriesItem/SeriesItem";
import { ResolvingMetadata, Metadata } from "next";
import { notFound } from "next/navigation";

export default async function SeriesPage({
  params,
}: {
  params: { id: string };
}) {
  const name = decodeClassName(params.id);
  const series = await getSeriesItem(name);

  if (!series) {
    notFound();
  }

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

  if (!series) {
    return metadata as any;
  }

  return {
    ...(metadata as any),
    title: series.name,
  };
}

export async function generateStaticParams() {
  const series = await getSeries();
  return series.items.map(({ name }) => ({ id: encodeClassName(name) }));
}
