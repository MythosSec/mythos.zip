"use client";
import { ComponentProps } from "react";
import { CopyBlock as CopyBlockLib, atomOneLight } from "react-code-blocks";
import { Box, Stack, Typography } from "@mui/joy";
import ClientOnly from "./ClientOnly";
import Sheet from "./Sheet";

function CopyBlock({
  theme = atomOneLight,
  showLineNumbers = false,
  text,
  ...props
}: ComponentProps<typeof CopyBlockLib> & {
  showLineNumbers?: boolean;
  text: string;
}) {
  const fullProps = { theme, showLineNumbers, text, ...props };
  return (
    <ClientOnly
      fallback={
        <Sheet variant="plain" sx={{ p: "0.25rem" }}>
          <Box py="2px">
            {text.split("\n").map((_, index) => (
              <Typography
                sx={{ fontFamiy: "var(--font-monospace)" }}
                key={index}
              >
                &nbsp;
              </Typography>
            ))}
          </Box>
        </Sheet>
      }
    >
      <Stack
        sx={{
          "& > div": {
            p: 2,
            overflow: "scroll",
          },
          "& button": {
            border: "2px solid transparent",
            cursor: "pointer",
          },
          "& button svg": {
            fill: "#131313",
          },
          "& button:hover": {
            opacity: 1,
          },
        }}
      >
        <CopyBlockLib {...fullProps} />
      </Stack>
    </ClientOnly>
  );
}

export default CopyBlock;
