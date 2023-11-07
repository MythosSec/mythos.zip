"use client";
import { useCallback } from "react";
import { Stack, useTheme } from "@mui/joy";
import { getBlogPosts } from "@/app/api/contentful";
import PostsScroller from "./PostsScroller";
import PostsLinkLatest from "./PostsLinkLatest";
import useInfiniteScroll from "@/app/hooks/useInfiniteScroll";
import { TypePageBlogPost } from "@/app/api/contentful/types";
import DividerHeading from "../DividerHeading";
import About from "../About";
import { useMediaQuery } from "@mui/material";

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
  >({
    initialData: initialPosts.items,
    initialFinished:
      initialPosts.skip + initialPosts.limit >= initialPosts.total,
    fetch: fetchPosts,
  });
  const [latest, ...rest] = data.length > 0 ? data : initialPosts.items;

  return (
    <Stack>
      <PostsLinkLatest post={latest} />
      <Stack mt={12} flexDirection="row">
        <Stack mr={isSm ? 0 : 8}>
          <DividerHeading mb={4}>Articles</DividerHeading>
          <PostsScroller posts={rest} loading={loading} finished={finished} />
        </Stack>
        {!isSm && (
          <Stack ml={2} width="33.3333%">
            <DividerHeading mb={4}>About</DividerHeading>
            <About />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
