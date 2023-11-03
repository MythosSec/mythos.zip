"use client";
import { Stack, useTheme } from "@mui/joy";
import { ICodeFields } from "../../../../../types/contentful";
import CodeBlock from "../../CodeBlock";
import CopyBlock from "../../CopyBlock";

export default function PostEntryCodeBlock({
  showCopyButton,
  text,
  wordWrap,
  ...props
}: ICodeFields) {
  const theme = useTheme();
  const styles = {
    [theme.breakpoints.down("sm")]: {
      mx: 0,
    },
  };

  if (showCopyButton) {
    return (
      <Stack my={4} mx={4} sx={styles}>
        <CopyBlock {...props}>{text}</CopyBlock>
      </Stack>
    );
  }
  return (
    <Stack my={4} mx={4} sx={styles}>
      <CodeBlock {...props} wrapLongLines={wordWrap}>
        {text}
      </CodeBlock>
    </Stack>
  );
}
