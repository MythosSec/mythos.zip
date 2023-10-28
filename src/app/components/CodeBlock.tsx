"use client";
import { ComponentProps } from "react";
import { IBM_Plex_Mono } from "next/font/google";
import { CodeBlock as CodeBlockLib, atomOneDark } from "react-code-blocks";
import { Stack } from "@mui/joy";

const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "300",
  fallback: ["monospace"],
});

function CodeBlock({
  theme = atomOneDark,
  ...props
}: ComponentProps<typeof CodeBlockLib>) {
  return (
    <Stack className={ibm.className}>
      <CodeBlockLib {...props} theme={theme} />
    </Stack>
  );
}

export default CodeBlock;
