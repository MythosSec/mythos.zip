import { getBlogPosts } from "./api/contentful";
import Posts from "./components/posts/Posts";

export default async function Home() {
  const posts = await getBlogPosts();
  return <Posts initialPosts={posts} />;
}
