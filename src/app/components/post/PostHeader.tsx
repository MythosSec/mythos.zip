import { Stack, Typography } from "@mui/joy";

export default function PostHeader({
  title,
  shortDescription,
  publishedDate,
  readLength,
}: {
  title: string;
  shortDescription: string | undefined;
  publishedDate: string;
  readLength: number;
}) {
  return (
    <Stack>
      <Stack mb={6}>
        <Typography level="h1">{title}</Typography>
        {shortDescription && (
          <Typography level="body-lg" mt={4}>
            {shortDescription}
          </Typography>
        )}
      </Stack>
      <Stack flexDirection="row" justifyContent="flex-end" px="15%">
        <Stack mr={6}>
          <Typography>Date</Typography>
          <Typography fontWeight="bold">{publishedDate}</Typography>
        </Stack>
        <Stack>
          <Typography>Reading time</Typography>
          <Typography fontWeight="bold">
            {readLength} minute{readLength > 1 ? "s" : ""}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
