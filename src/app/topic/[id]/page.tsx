import { getTag, getBlogPostsByTagId, getTags } from "@/app/api/contentful";
import Tag from "@/app/components/tag/Tag";
import { decodeClassName, encodeClassName } from "@/app/util/string";
import { ResolvingMetadata, Metadata } from "next";
import { notFound } from "next/navigation";

export default async function TagPage({ params }: { params: { id: string } }) {
  const name = decodeClassName(params.id);
  const tag = await getTag(name);

  if (!tag) {
    notFound();
  }

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

  if (!tag) {
    return metadata as any;
  }

  return {
    ...(metadata as any),
    title: tag.name,
  };
}

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.items
    .filter(({ internalOnly }) => !internalOnly)
    .map(({ name }) => ({ id: encodeClassName(name) }));
}
