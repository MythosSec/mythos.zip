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
      <CopyBlock {...props} wrapLongLines={wordWrap}>
        {text}
      </CopyBlock>
    );
  }
  return (
    <CodeBlock {...props} wrapLongLines={wordWrap}>
      {text}
    </CodeBlock>
  );
}
