import { getTags } from "@/app/api/contentful";
import { tagRoute } from "@/app/routes";
import { Link, LinkProps, Stack, Typography } from "@mui/joy";

export default function TagLink({
  tag: { name },
  ...props
}: { tag: Awaited<ReturnType<typeof getTags>>["items"][0] } & LinkProps) {
  return (
    <Link href={tagRoute(name)} {...props}>
      <Stack>
        <Typography level="h3">{name}</Typography>
      </Stack>
    </Link>
  );
}
