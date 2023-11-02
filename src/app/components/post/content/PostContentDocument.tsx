import PostContentNode from "./PostContentNode";
import { Document } from "@contentful/rich-text-types";

export default function PostContentDocument(document: Document) {
  return document.content.map((node, index) => (
    <PostContentNode key={index} {...node} />
  ));
}
