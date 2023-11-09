import {
  getBlogPostBySlug,
  getSocials,
  parseMetadata,
  getSurroundingBlogPosts,
  getAllBlogPosts,
} from "@/app/api/contentful";
import Post from "@/app/components/post/Post";
import { encodeClassName } from "@/app/util/string";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

export default async function BlogPost({
  params: { id },
}: {
  params: { id: string };
}) {
  const post = await getBlogPostBySlug(id);
  if (post.readLength === 0) {
    notFound();
  }

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
  if (post.readLength === 0) {
    return metadata as any;
  }
  return {
    ...(metadata as any),
    ...parseMetadata({
      ...post.seoFields,
      ...post.author,
      imageUrl: post.featuredImage.fields.file?.url as string,
    }),
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.items.map(({ slug }) => ({ id: encodeClassName(slug) }));
}
