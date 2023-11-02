import { getBlogPostBySlug, parseMetadata } from "@/app/api/contentful";
import Post from "@/app/components/post/Post";
import { Metadata } from "next";

export default async function BlogPost({
  params: { id },
}: {
  params: { id: string };
}) {
  const post = await getBlogPostBySlug(id);
  return <Post {...post.fields} />;
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const response = await getBlogPostBySlug(id);
  //   console.log(JSON.stringify(response, undefined, 4));
  return parseMetadata(response.fields.seoFields.fields);
}
