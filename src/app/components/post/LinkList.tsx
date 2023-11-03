import { Box, Link, Stack, Typography } from "@mui/joy";

export default function LinkList({
  links,
}: {
  links: { name: string; url: string }[];
}) {
  return links.map(({ name, url }, index) => (
    <Stack key={name}>
      <Link href={url} level="h4" target="_blank" rel="noreferrer noopener">
        <Typography whiteSpace="nowrap">{name}</Typography>
        {index < links.length - 1 && (
          <Typography level="h4" mx={1} sx={{ opacity: 0.12 }}>
            /
          </Typography>
        )}
      </Link>
    </Stack>
  ));
}
