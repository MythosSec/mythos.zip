"use client";
import { ComponentProps } from "react";
import { CodeBlock as CodeBlockLib, atomOneLight } from "react-code-blocks";
import { Stack } from "@mui/joy";
import ClientOnly from "./ClientOnly";

function CodeBlock({
  theme = atomOneLight,
  children,
  ...props
}: Omit<ComponentProps<typeof CodeBlockLib>, "text"> & { children: string }) {
  return (
    <ClientOnly>
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
        <CodeBlockLib {...props} theme={theme} text={children} />
      </Stack>
    </ClientOnly>
  );
}

export default CodeBlock;
