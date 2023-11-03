import { Stack, StackProps } from "@mui/joy";
import { Document } from "@contentful/rich-text-types";
import PostContentDocument from "./content/PostContentDocument";
import TableOfContents from "./TableOfContents";
import Sheet from "../Sheet";
import { Asset } from "contentful";
import Image from "../Image";

const gutterWidth = 180;

export default function PostContent({
  document,
  featuredImage,
  showFeaturedImage = false,
  showTableOfContents = true,
  ...props
}: StackProps & {
  document: Document;
  featuredImage: Asset;
  showFeaturedImage?: boolean;
  showTableOfContents?: boolean;
}) {
  return (
    <Stack flexDirection="row" position="relative" {...props}>
      {showTableOfContents && (
        <Stack position="fixed">
          <TableOfContents document={document} mt={6} />
        </Stack>
      )}
      <Stack minWidth={gutterWidth} />
      <Stack>
        {featuredImage && showFeaturedImage && (
          <Stack mb={8}>
            <Image
              src={`https:${featuredImage.fields.file!.url}`}
              alt={(featuredImage.fields.title as string) || ""}
              sizes="100vw"
              width={0}
              height={0}
              style={{ width: "100%", height: "auto" }}
            />
          </Stack>
        )}
        <Sheet variant="glass" sx={{ p: 4 }}>
          <PostContentDocument {...document} />
        </Sheet>
      </Stack>
    </Stack>
  );
}
