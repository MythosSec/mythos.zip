"use client";
import { Divider, Stack, Theme, styled, useTheme } from "@mui/joy";
import { BlogPostSkeleton, SocialMediaSkeleton } from "../../api/contentful";
import ScrollProgress from "../ScrollProgress";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import { PostContextProvider } from "./usePostContext";
import PostTags from "./PostTags";
import PostSocials from "./PostSocials";
import PostNavigation from "./PostNavigation";
import { useMediaQuery } from "@mui/material";

const StyledStack = styled(Stack)<{ theme: Theme }>`
  & .left-gutter {
    min-width: 180px;

    ${({ theme }) => theme.breakpoints.down("md")} {
      min-width: 130px;
    }

    ${({ theme }) => theme.breakpoints.down("sm")} {
      padding: 0;
    }
  }

  & .right-gutter {
    width: 100%;

    ${({ theme }) => theme.breakpoints.down("sm")} {
      padding: 0;
    }
  }
`;

export default function Post({
  readLength,
  socials,
  post,
  next,
  previous,
}: {
  readLength: number;
  socials: SocialMediaSkeleton["fields"];
  post: BlogPostSkeleton["fields"];
  next: BlogPostSkeleton["fields"];
  previous: BlogPostSkeleton["fields"];
}) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <PostContextProvider>
      <ScrollProgress />
      <StyledStack theme={theme}>
        <PostHeader
          mb={6}
          title={post.title}
          shortDescription={post.shortDescription}
          series={post.series}
          publishedDate={post.publishedDate}
          author={post.author}
          readLength={readLength}
        />
        <PostContent
          document={post.content}
          featuredImage={post.featuredImage}
          showFeaturedImage={post.showFeaturedImage}
          showTableOfContents={post.showTableOfContents}
        />
        {isSm && <Divider sx={{ mt: 6 }} />}
        <PostTags mt={isSm ? 6 : 10} tags={post.tags} />
        <PostSocials mt={6} socials={socials} />
        <Divider sx={{ mt: isSm ? 6 : 12 }} />
        <PostNavigation mt={8} next={next} previous={previous} />
      </StyledStack>
    </PostContextProvider>
  );
}
