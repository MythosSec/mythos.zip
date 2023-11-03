import {
  getBlogPostBySlug,
  getSocials,
  parseMetadata,
} from "@/app/api/contentful";
import Post from "@/app/components/post/Post";
import { calculateReadLength } from "@/app/util/contentful";
import { Metadata } from "next";

export default async function BlogPost({
  params: { id },
}: {
  params: { id: string };
}) {
  const post = await getBlogPostBySlug(id);
  const socials = await getSocials();
  const readLength = Math.floor(calculateReadLength(post.fields.content));
  return (
    <Post post={post.fields} socials={socials.fields} readLength={readLength} />
  );
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const response = await getBlogPostBySlug(id);
  //   console.log(JSON.stringify(response, undefined, 4));
  return parseMetadata((response.fields.seoFields as any).fields);
}
