import {
  getBlogPostBySlug,
  getSocials,
  parseMetadata,
  getSurroundingBlogPosts,
} from "@/app/api/contentful";
import Post from "@/app/components/post/Post";
import { Metadata, ResolvingMetadata } from "next";

export default async function BlogPost({
  params: { id },
}: {
  params: { id: string };
}) {
  const post = await getBlogPostBySlug(id);
  const [{ next, previous }, socials] = await Promise.all([
    getSurroundingBlogPosts(
      post.publishedDate as Parameters<typeof getSurroundingBlogPosts>[0]
    ),
    getSocials(),
  ]);
  return <Post post={post} socials={socials} next={next} previous={previous} />;
}

export async function generateMetadata(
  {
    params: { id },
  }: {
    params: { id: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const [metadata, post] = await Promise.all([parent, getBlogPostBySlug(id)]);
  return {
    ...(metadata as any),
    ...parseMetadata({
      ...post.seoFields,
      ...post.author,
    }),
  };
}
