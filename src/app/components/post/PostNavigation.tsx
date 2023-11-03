import { BlogPostSkeleton } from "@/app/api/contentful";
import { Link, Stack, StackProps, Typography } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { articleRoute } from "@/app/routes";

export default function PostNavigation({
  next,
  previous,
  ...props
}: StackProps & {
  previous: BlogPostSkeleton["fields"] | undefined;
  next: BlogPostSkeleton["fields"] | undefined;
}) {
  return (
    <Stack flexDirection="row" justifyContent="space-between" {...props}>
      <Stack>
        {previous && (
          <Link href={articleRoute(previous.slug)}>
            <Stack>
              <Typography
                level="title-lg"
                startDecorator={<ArrowBackIcon htmlColor="text.primary" />}
              >
                Previous Article
              </Typography>
              <Typography>{previous.title}</Typography>
            </Stack>
          </Link>
        )}
      </Stack>
      <Stack>
        {next && (
          <Link href={articleRoute(next.slug)}>
            <Stack>
              <Typography
                level="title-lg"
                endDecorator={<ArrowForwardIcon htmlColor="text.primary" />}
              >
                Next Article
              </Typography>
              <Typography textAlign="right">{next.title}</Typography>
            </Stack>
          </Link>
        )}
      </Stack>
    </Stack>
  );
}
