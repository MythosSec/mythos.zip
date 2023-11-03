import { Stack } from "@mui/joy";
import { ICodeFields } from "../../../../../types/contentful";
import CodeBlock from "../../CodeBlock";
import CopyBlock from "../../CopyBlock";

export default function PostEntryCodeBlock({
  showCopyButton,
  text,
  wordWrap,
  ...props
}: ICodeFields) {
  if (showCopyButton) {
    return (
      <Stack my={4}>
        <CopyBlock {...props}>{text}</CopyBlock>
      </Stack>
    );
  }
  return (
    <Stack my={4}>
      <CodeBlock {...props} wrapLongLines={wordWrap}>
        {text}
      </CodeBlock>
    </Stack>
  );
}
