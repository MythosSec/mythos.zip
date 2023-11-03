import { Stack } from "@mui/joy";
import { BlogPostSkeleton, SocialMediaSkeleton } from "../../api/contentful";
import ScrollProgress from "../ScrollProgress";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import { PostContextProvider } from "./usePostContext";
import PostTags from "./PostTags";
import PostSocials from "./PostSocials";

export default function Post({
  readLength,
  socials,
  post,
}: {
  readLength: number;
  socials: SocialMediaSkeleton["fields"];
  post: BlogPostSkeleton["fields"];
}) {
  return (
    <PostContextProvider>
      <ScrollProgress />
      <Stack>
        <PostHeader mb={6} {...post} readLength={readLength} />
        <PostContent
          document={post.content}
          featuredImage={post.featuredImage}
          showFeaturedImage={post.showFeaturedImage}
          showTableOfContents={post.showTableOfContents}
        />
        <PostTags mt={12} tags={post.tags} />
        <PostSocials mt={6} socials={socials} />
      </Stack>
    </PostContextProvider>
  );
}
