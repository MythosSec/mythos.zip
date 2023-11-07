"use client";
import { useCallback } from "react";
import { Stack } from "@mui/joy";
import { getBlogPosts } from "@/app/api/contentful";
import PostsScroller from "./PostsScroller";
import PostsLinkLatest from "./PostsLinkLatest";
import useInfiniteScroll from "@/app/hooks/useInfiniteScroll";
import { TypePageBlogPost } from "@/app/api/contentful/types";
import DividerHeading from "../DividerHeading";
import About from "../About";

export default function Posts({
  initialPosts,
}: {
  initialPosts: Awaited<ReturnType<typeof getBlogPosts>>;
}) {
  const fetchPosts = useCallback(async (limit: number, page: number) => {
    const response = await fetch(
      `/api/v1/getBlogPosts?page=${page}&limit=${limit}`
    );
    const data = await response.json();
    return data;
  }, []);

  const { data, loading, finished } = useInfiniteScroll<
    Omit<TypePageBlogPost, "content" | "featuredImage">,
    Awaited<ReturnType<typeof getBlogPosts>>
  >({ initialData: initialPosts.items, fetch: fetchPosts });
  const [latest, ...rest] = data.length > 0 ? data : initialPosts.items;

  return (
    <Stack>
      <PostsLinkLatest post={latest} />
      <Stack mt={12} flexDirection="row">
        <Stack mr={8}>
          <DividerHeading mb={4}>Articles</DividerHeading>
          <PostsScroller posts={rest} loading={loading} finished={finished} />
        </Stack>
        <Stack ml={2} width="30%">
          <DividerHeading mb={4}>About</DividerHeading>
          <About />
        </Stack>
      </Stack>
    </Stack>
  );
}
