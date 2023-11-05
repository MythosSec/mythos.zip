import { getBlogPosts } from "./api/contentful";
import Posts from "./components/posts/Posts";
import { PostsContextProvider } from "./components/posts/usePostsContext";

export default async function Home() {
  const posts = await getBlogPosts();
  return (
    <PostsContextProvider>
      <Posts initialPosts={posts} />
    </PostsContextProvider>
  );
}
