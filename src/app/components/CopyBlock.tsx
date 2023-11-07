"use client";
import { ComponentProps } from "react";
import {
  CopyBlock as CopyBlockLib,
  atomOneLight,
  atomOneDark,
} from "react-code-blocks";
import { Box, Stack, Typography, useColorScheme } from "@mui/joy";
import ClientOnly from "./ClientOnly";
import Sheet from "./Sheet";

function CopyBlock({
  showLineNumbers = false,
  text,
  ...props
}: Omit<ComponentProps<typeof CopyBlockLib>, "theme"> & {
  showLineNumbers?: boolean;
  text: string;
}) {
  const fullProps = { showLineNumbers, text, ...props };
  const { mode } = useColorScheme();
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
        <CopyBlockLib
          {...fullProps}
          theme={mode === "dark" ? atomOneLight : atomOneDark}
        />
      </Stack>
    </ClientOnly>
  );
}

export default CopyBlock;
