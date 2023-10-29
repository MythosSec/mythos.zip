"use client";
import { ComponentProps } from "react";
import { IBM_Plex_Mono } from "next/font/google";
import { CodeBlock as CodeBlockLib, atomOneLight } from "react-code-blocks";
import { Stack } from "@mui/joy";
import ClientOnly from "./ClientOnly";

const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "500",
  fallback: ["monospace"],
});

function CodeBlock({
  theme = atomOneLight,
  children,
  ...props
}: Omit<ComponentProps<typeof CodeBlockLib>, "text"> & { children: string }) {
  return (
    <ClientOnly>
      <Stack className={ibm.className}>
        <CodeBlockLib {...props} theme={theme} text={children} />
      </Stack>
    </ClientOnly>
  );
}

export default CodeBlock;
