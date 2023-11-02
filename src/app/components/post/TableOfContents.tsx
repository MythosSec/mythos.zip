import { useMemo, useCallback } from "react";
import {
  Block,
  Document,
  Inline,
  Text,
  BLOCKS,
} from "@contentful/rich-text-types";
import { encodeClassName } from "@/app/util/string";
import { Link, Stack, StackProps, Typography } from "@mui/joy";

interface HeadingItem {
  title: string;
  className: string;
}

export default function TableOfContents({
  document,
  ...props
}: StackProps & { document: Document }) {
  console.log("toc");
  const findHeadings = useCallback(
    (node: Block | Text | Inline, headings: HeadingItem[] = []) => {
      console.log(node.nodeType);
      if (node.nodeType === BLOCKS.EMBEDDED_ENTRY) {
        const type = node.data.target.sys.contentType.sys.id;
        if (type === "componentSectionHeader") {
          const title = node.data.target.fields.title;
          headings.push({
            title,
            className: encodeClassName(title),
          });
        }
      }
      if ("content" in node) {
        node.content.forEach((props) => findHeadings(props, headings));
      }

      return headings;
    },
    []
  );

  const headings = useMemo(() => {
    const result = findHeadings(document);
    console.log(result);
    return result;
  }, [document]);

  return (
    <Stack {...props}>
      <Typography mb={4} level="title-lg">
        Content
      </Typography>
      {headings.map(({ title, className }) => (
        <Link key={className} href={`#${className}`}>
          {title}
        </Link>
      ))}
    </Stack>
  );
}
