"use client";
import { ComponentProps } from "react";
import { IBM_Plex_Mono } from "next/font/google";
import { CopyBlock as CopyBlockLib, atomOneLight } from "react-code-blocks";
import { Box, Stack, Typography } from "@mui/joy";
import ClientOnly from "./ClientOnly";
import Sheet from "./Sheet";

const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  fallback: ["monospace"],
  weight: "500",
});

function CopyBlock({
  theme = atomOneLight,
  children,
  ...props
}: Omit<ComponentProps<typeof CopyBlockLib>, "text"> & { children: string }) {
  return (
    <ClientOnly
      fallback={
        <Sheet variant="plain" sx={{ p: "0.25rem" }}>
          <Box py="2px">
            {children.split("\n").map((_, index) => (
              <Typography className={ibm.className} key={index}>
                &nbsp;
              </Typography>
            ))}
          </Box>
        </Sheet>
      }
    >
      <Stack className={ibm.className}>
        <CopyBlockLib {...props} theme={theme} text={children} />
      </Stack>
    </ClientOnly>
  );
}

export default CopyBlock;
