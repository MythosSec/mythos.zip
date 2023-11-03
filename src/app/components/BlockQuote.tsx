import { Stack, Box } from "@mui/joy";
import { ReactNode } from "react";

export default function BlockQuote({ children }: { children: ReactNode }) {
  return (
    <Stack flexDirection="column" alignItems="center" my={12}>
      <Stack
        flexDirection="row"
        textAlign="center"
        alignItems="center"
        fontStyle="italic"
        position="relative"
        sx={{
          "& p": {
            margin: 0,
            ":before": {
              position: "absolute",
              left: -30,
              top: -15,
              content: '"“"',
              fontSize: "3rem",
              height: 20,
              color: "#fff",
            },
            ":after": {
              position: "absolute",
              right: -26,
              bottom: 47,
              content: '"„"',
              fontSize: "3rem",
              height: 10,
              color: "#fff",
            },
          },
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
}
