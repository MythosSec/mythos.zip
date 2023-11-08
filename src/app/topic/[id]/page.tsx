import { getTag, getBlogPostsByTagId } from "@/app/api/contentful";
import Tag from "@/app/components/tag/Tag";
import { decodeClassName } from "@/app/util/string";
import { ResolvingMetadata, Metadata } from "next";

export default async function TagPage({ params }: { params: { id: string } }) {
  const name = decodeClassName(params.id);
  const tag = await getTag(name);
  const posts = await getBlogPostsByTagId(tag.id);

  return <Tag name={tag.name} id={tag.id} initialPosts={posts} />;
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
  const tag = await getTag(name);
  const metadata = await parent;
  return {
    ...(metadata as any),
    title: tag.name,
  };
}
