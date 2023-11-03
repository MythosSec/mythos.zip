import { Link, Typography } from "@mui/joy";

export default function LinkList({
  links,
}: {
  links: { name: string; url: string }[];
}) {
  return links
    .map(({ name, url }, index) => (
      <>
        <Link
          key={`${name}${1}`}
          href={url}
          level="h4"
          target="_blank"
          rel="noreferrer noopener"
        >
          {name}
        </Link>
        {index !== links.length - 1 && (
          <Typography
            key={`${name}${2}`}
            component="span"
            level="h4"
            mx={1}
            sx={{ opacity: 0.12 }}
          >
            /
          </Typography>
        )}
      </>
    ))
    .flat();
}
