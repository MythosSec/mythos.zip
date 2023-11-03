import { Stack, StackProps, Typography } from "@mui/joy";
import { SocialMediaSkeleton } from "@/app/api/contentful";
import LinkList from "./LinkList";

const gutterWidth = 180;

export default function PostSocials({
  socials,
  ...props
}: StackProps & {
  socials: SocialMediaSkeleton["fields"];
}) {
  return (
    <Stack flexDirection="row" position="relative" {...props}>
      <Stack minWidth={gutterWidth}>
        <Typography level="title-lg" mt={1.5}>
          Follow me
        </Typography>
      </Stack>
      <Stack flexDirection="row" px={4}>
        <LinkList
          links={socials.fields
            .filter(({ fields: { enabled } }) => enabled)
            .map(({ fields: { link: url, name, enabled } }) => ({
              url,
              name,
              enabled,
            }))}
        />
      </Stack>
    </Stack>
  );
}
