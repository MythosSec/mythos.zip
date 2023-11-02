import { Stack } from "@mui/joy";
import { BlogPostSkeleton } from "../../api/contentful";
import ScrollProgress from "../ScrollProgress";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";

export default function Post(post: BlogPostSkeleton["fields"]) {
  return (
    <>
      <ScrollProgress />
      <Stack>
        <PostHeader {...post} />
        <PostContent {...post.content} />
      </Stack>
    </>
  );
}
