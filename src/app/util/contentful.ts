import { Block, Inline, Text, BLOCKS } from "@contentful/rich-text-types";
import { encodeClassName } from "./string";
import { Document } from "@contentful/rich-text-types";

export function calculateReadLength(document: Document) {
  function traverse(
    node: Block | Text | Inline,
    data: { wordCount: number; imageCount: number } = {
      wordCount: 0,
      imageCount: 0,
    }
  ) {
    if ("content" in node) {
      node.content.forEach((node1) => traverse(node1, data));
    }
    if ("value" in node) {
      data.wordCount += node.value.split(" ").length;
    }
    if ("url" in node) {
      data.imageCount += 1;
    }
    return data;
  }

  const { wordCount, imageCount } = traverse(document);
  // https://thereadtime.com
  return wordCount / 238 + imageCount * 0.083;
}

export function findSectionHeadings(
  node: Block | Text | Inline,
  headings: { title: string; className: string }[] = []
) {
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
    node.content.forEach((props) => findSectionHeadings(props, headings));
  }

  return headings;
}
