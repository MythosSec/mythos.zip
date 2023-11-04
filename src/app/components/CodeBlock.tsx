"use client";
import { ComponentProps } from "react";
import { CodeBlock as CodeBlockLib, atomOneLight } from "react-code-blocks";
import { Stack } from "@mui/joy";
import ClientOnly from "./ClientOnly";

function CodeBlock({
  theme = atomOneLight,
  ...props
}: ComponentProps<typeof CodeBlockLib>) {
  return (
    <ClientOnly>
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
        <CodeBlockLib {...props} theme={theme} />
      </Stack>
    </ClientOnly>
  );
}

export default CodeBlock;
