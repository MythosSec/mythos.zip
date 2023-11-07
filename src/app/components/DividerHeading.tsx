import { Stack, Typography, Divider, StackProps } from "@mui/joy";
import { ReactNode } from "react";

export default function DividerHeading({
  children,
  ...props
}: { children: string | ReactNode } & StackProps) {
  return (
    <Stack flexDirection="row" {...props}>
      <Typography level="body-sm">{children}</Typography>
      <Stack ml={2} justifyContent="center" width="100%">
        <Divider sx={{ width: "100%" }} />
      </Stack>
    </Stack>
  );
}
