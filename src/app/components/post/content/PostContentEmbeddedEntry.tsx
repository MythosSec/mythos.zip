import { Block } from "@contentful/rich-text-types";
import PostEntrySectionHeader from "../entry/PostEntrySectionHeader";
import PostEntryRichImage from "../entry/PostEntryRichImage";
import PostEntryCodeBlock from "../entry/PostEntryCodeBlock";

export default function PostContentEmbeddedEntry({ data }: Block) {
  const type = data.target.sys.contentType.sys.id;
  switch (type) {
    case "componentSectionHeader":
      return <PostEntrySectionHeader {...data.target.fields} />;
    case "componentRichImage":
      return <PostEntryRichImage {...data.target.fields} />;
    case "code":
      return <PostEntryCodeBlock {...data.target.fields} />;
  }
}
