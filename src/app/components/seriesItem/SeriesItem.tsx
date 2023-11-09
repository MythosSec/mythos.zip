"use client";
import { useCallback } from "react";
import { Button, Link, Stack, Typography } from "@mui/joy";
import { getBlogPosts } from "@/app/api/contentful";
import useInfiniteScroll from "@/app/hooks/useInfiniteScroll";
import { TypePageBlogPost } from "@/app/api/contentful/types";
import PostsScroller from "../posts/PostsScroller";
import { homeRoute } from "@/app/routes";

export default function SeriesItem({
  name,
  id,
  initialPosts,
}: {
  name: string;
  id: string;
  initialPosts: Awaited<ReturnType<typeof getBlogPosts>>;
}) {
  const fetchPosts = useCallback(async (limit: number, page: number) => {
    const response = await fetch(
      `/api/v1/getBlogPostsBySeriesId?seriesId=${id}&page=${page}&limit=${limit}`
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
  const rest = data.length > 0 ? data : initialPosts.items;

  return (
    <Stack>
      <Typography>Series</Typography>
      <Typography level="h1" ml={-0.3} mb={15}>
        {name}
      </Typography>
      {initialPosts.items.length === 0 && (
        <>
          <Typography>No articles to see here.</Typography>
          <Link href={homeRoute()} mt={1}>
            <Button>Home</Button>
          </Link>
        </>
      )}
      {initialPosts.items.length > 0 && (
        <PostsScroller
          posts={rest}
          loading={loading}
          finished={finished}
          showSeries={false}
        />
      )}
    </Stack>
  );
}
