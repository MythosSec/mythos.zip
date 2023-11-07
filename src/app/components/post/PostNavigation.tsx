import { Link, Stack, StackProps, Typography } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { articleRoute, homeRoute } from "@/app/routes";
import { TypePageBlogPost } from "@/app/api/contentful/types";

export default function PostNavigation({
  next,
  previous,
  ...props
}: StackProps & {
  previous: TypePageBlogPost | undefined;
  next: TypePageBlogPost | undefined;
}) {
  return (
    <Stack flexDirection="row" justifyContent="space-between" {...props}>
      <Stack width="50%">
        {previous && (
          <Link href={articleRoute(previous.slug)} pr={1}>
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
        {!previous && (
          <Link href={homeRoute()} pr={1}>
            <Stack>
              <Typography
                level="title-lg"
                startDecorator={<ArrowBackIcon htmlColor="text.primary" />}
              >
                Home
              </Typography>
              <Typography>This is the start</Typography>
            </Stack>
          </Link>
        )}
      </Stack>
      <Stack width="50%" alignItems="flex-end">
        {next && (
          <Link href={articleRoute(next.slug)} pl={1}>
            <Stack alignItems="flex-end">
              <Typography
                level="title-lg"
                textAlign="right"
                endDecorator={<ArrowForwardIcon htmlColor="text.primary" />}
              >
                Next Article
              </Typography>
              <Typography textAlign="right">{next.title}</Typography>
            </Stack>
          </Link>
        )}
        {!next && (
          <Link href={homeRoute()} pl={1}>
            <Stack alignItems="flex-end">
              <Typography
                level="title-lg"
                textAlign="right"
                endDecorator={<ArrowForwardIcon htmlColor="text.primary" />}
              >
                Home
              </Typography>
              <Typography textAlign="right">This is the end</Typography>
            </Stack>
          </Link>
        )}
      </Stack>
    </Stack>
  );
}
