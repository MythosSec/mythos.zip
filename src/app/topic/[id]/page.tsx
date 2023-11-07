import { getTag, getBlogPostsByTagId } from "@/app/api/contentful";
import Tag from "@/app/components/tag/Tag";
import { decodeClassName } from "@/app/util/string";

export default async function TagPage({ params }: { params: { id: string } }) {
  const name = decodeClassName(params.id);
  const tag = await getTag(name);
  const posts = await getBlogPostsByTagId(tag.id);

  return <Tag name={name} id={tag.id} initialPosts={posts} />;
}
