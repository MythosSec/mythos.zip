import { Stack } from "@mui/joy";
import { Document } from "@contentful/rich-text-types";
import PostContentDocument from "./content/PostContentDocument";
import TableOfContents from "./TableOfContents";
import Sheet from "../Sheet";

export default function PostContent(document: Document) {
  return (
    <Stack flexDirection="row" position="relative">
      <Stack position="fixed">
        <TableOfContents document={document} mt={3.5} />
      </Stack>
      <Stack minWidth={190} />
      <Sheet variant="glass" sx={{ px: 4, py: 2 }}>
        <PostContentDocument {...document} />
      </Sheet>
    </Stack>
  );
}
