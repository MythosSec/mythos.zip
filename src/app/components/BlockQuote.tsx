import { Stack, Box } from "@mui/joy";
import { ReactNode } from "react";

export default function BlockQuote({
  children,
}: {
  children: ReactNode | string;
}) {
  return (
    <Stack flexDirection="column" alignItems="center" my={4}>
      <Stack flexDirection="row" textAlign="center" fontStyle="italic">
        <Box
          position="relative"
          sx={{
            ":before": {
              position: "absolute",
              left: -30,
              top: -15,
              content: '"“"',
              fontSize: "3rem",
              height: 20,
            },
            ":after": {
              position: "absolute",
              right: -23,
              bottom: 52,
              content: '"„"',
              fontSize: "3rem",
              height: 10,
            },
          }}
        >
          {children}
        </Box>
      </Stack>
    </Stack>
  );
}
