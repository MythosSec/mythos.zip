import {
  getBlogPostBySlug,
  getSocials,
  parseMetadata,
  getSurroundingBlogPosts,
} from "@/app/api/contentful";
import Post from "@/app/components/post/Post";
import { calculateReadLength } from "@/app/util/contentful";
import { Metadata, ResolvingMetadata } from "next";

export default async function BlogPost({
  params: { id },
}: {
  params: { id: string };
}) {
  const post = await getBlogPostBySlug(id);
  const { next, previous } = await getSurroundingBlogPosts(
    post.publishedDate as Parameters<typeof getSurroundingBlogPosts>[0]
  );
  const socials = await getSocials();
  const readLength = Math.floor(calculateReadLength(post.content));
  return (
    <Post
      post={post}
      socials={socials}
      readLength={readLength}
      next={next}
      previous={previous}
    />
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
  const [metadata, post] = await Promise.all([parent, getBlogPostBySlug(id)]);
  return {
    ...(metadata as any),
    ...parseMetadata({
      ...post.seoFields,
      ...post.author,
    }),
  };
}
