"use client";
import { ComponentProps } from "react";
import {
  CodeBlock as CodeBlockLib,
  atomOneLight,
  atomOneDark,
} from "react-code-blocks";
import { Stack, useColorScheme } from "@mui/joy";
import ClientOnly from "./ClientOnly";

function CodeBlock({
  ...props
}: Omit<ComponentProps<typeof CodeBlockLib>, "theme">) {
  const { mode } = useColorScheme();
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
        <CodeBlockLib
          {...props}
          theme={mode === "dark" ? atomOneLight : atomOneDark}
        />
      </Stack>
    </ClientOnly>
  );
}

export default CodeBlock;
