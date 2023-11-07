import { getBlogPostsBySeriesId, getSeriesItem } from "@/app/api/contentful";
import { decodeClassName } from "@/app/util/string";
import SeriesItem from "@/app/components/seriesItem/SeriesItem";

export default async function SeriesPage({
  params,
}: {
  params: { id: string };
}) {
  const name = decodeClassName(params.id);
  const series = await getSeriesItem(name);
  const posts = await getBlogPostsBySeriesId(series.id);

  return <SeriesItem name={name} id={series.id} initialPosts={posts} />;
}
