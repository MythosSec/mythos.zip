"use client";
import { useCallback } from "react";
import { Divider, Stack, useTheme } from "@mui/joy";
import { getBlogPosts } from "@/app/api/contentful";
import { useMediaQuery } from "@mui/material";
import PostsScroller from "./PostsScroller";
import PostsLinkLatest from "./PostsLinkLatest";
import useInfiniteScroll from "@/app/hooks/useInfiniteScroll";
import { TypePageBlogPost } from "@/app/api/contentful/types";

export default function Posts({
  initialPosts,
}: {
  initialPosts: Awaited<ReturnType<typeof getBlogPosts>>;
}) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

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
      <Divider sx={{ my: isSm ? 6 : 12 }} />
      <Stack>
        <PostsScroller posts={rest} loading={loading} finished={finished} />
      </Stack>
    </Stack>
  );
}
