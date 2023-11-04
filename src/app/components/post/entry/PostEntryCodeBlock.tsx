"use client";
import { Stack, useTheme } from "@mui/joy";
import CodeBlock from "../../CodeBlock";
import CopyBlock from "../../CopyBlock";
import { TypeCode } from "@/app/api/contentful/types";

export default function PostEntryCodeBlock({
  showCopyButton,
  wordWrap,
  ...props
}: TypeCode) {
  console.log(props);
  const theme = useTheme();
  const styles = {
    [theme.breakpoints.down("sm")]: {
      mx: 0,
    },
  };

  if (showCopyButton) {
    return (
      <Stack my={4} mx={4} sx={styles}>
        <CopyBlock {...props} />
      </Stack>
    );
  }
  return (
    <Stack my={4} mx={4} sx={styles}>
      <CodeBlock {...props} wrapLongLines={wordWrap} />
    </Stack>
  );
}
