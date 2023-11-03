"use client";
import { ComponentProps } from "react";
import { CopyBlock as CopyBlockLib, atomOneLight } from "react-code-blocks";
import { Box, Stack, Typography } from "@mui/joy";
import ClientOnly from "./ClientOnly";
import Sheet from "./Sheet";

function CopyBlock({
  theme = atomOneLight,
  children,
  showLineNumbers = false,
  ...props
}: Omit<ComponentProps<typeof CopyBlockLib>, "text"> & {
  children: string;
  showLineNumbers?: boolean;
}) {
  return (
    <ClientOnly
      fallback={
        <Sheet variant="plain" sx={{ p: "0.25rem" }}>
          <Box py="2px">
            {children.split("\n").map((_, index) => (
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
          mx: 4,
          "& > div": {
            p: 2,
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
          {...props}
          theme={theme}
          text={children}
          showLineNumbers={showLineNumbers}
        />
      </Stack>
    </ClientOnly>
  );
}

export default CopyBlock;
