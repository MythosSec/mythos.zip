import { Divider, Stack } from "@mui/joy";
import { BlogPostSkeleton, SocialMediaSkeleton } from "../../api/contentful";
import ScrollProgress from "../ScrollProgress";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import { PostContextProvider } from "./usePostContext";
import PostTags from "./PostTags";
import PostSocials from "./PostSocials";
import PostNavigation from "./PostNavigation";

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
  return (
    <PostContextProvider>
      <ScrollProgress />
      <Stack>
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
        <PostTags mt={10} tags={post.tags} />
        <PostSocials mt={6} socials={socials} />
        <Divider sx={{ mt: 12 }} />
        <PostNavigation mt={8} next={next} previous={previous} />
      </Stack>
    </PostContextProvider>
  );
}
