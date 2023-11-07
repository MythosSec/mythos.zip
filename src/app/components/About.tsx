import { Stack, StackProps, Typography } from "@mui/joy";

export default function About(props: StackProps) {
  return (
    <Stack {...props}>
      <Typography level="h4">Mythos Security</Typography>
      <Typography>
        Welcome to Mythos Security. Here you'll find my musings on topics
        related to cybersecurity, software and technology.
      </Typography>
    </Stack>
  );
}
