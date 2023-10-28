"use client";
import { ComponentProps } from "react";
import { IBM_Plex_Mono } from "next/font/google";
import { CopyBlock as CopyBlockLib, atomOneDark } from "react-code-blocks";
import { Stack } from "@mui/joy";

const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  fallback: ["monospace"],
  weight: "300",
});

function CopyBlock({
  theme = atomOneDark,
  ...props
}: ComponentProps<typeof CopyBlockLib>) {
  return (
    <Stack className={ibm.className}>
      <CopyBlockLib {...props} theme={theme} />
    </Stack>
  );
}

export default CopyBlock;
