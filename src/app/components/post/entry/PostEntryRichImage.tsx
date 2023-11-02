import { Box, Typography } from "@mui/joy";
import { IComponentRichImageFields } from "../../../../../types/contentful";
import Image from "next/image";
import { AssetFile } from "contentful";

export default function PostEntryRichImage({
  image,
  caption,
}: IComponentRichImageFields) {
  const { title } = image.fields;
  const { url, details } = image.fields.file as AssetFile;
  const hasDetails = details?.image?.width && details?.image?.height;
  return (
    <Box flexDirection="row" position="relative" width="100%">
      <Image
        src={`https:${url}`}
        alt={title as string}
        sizes="100vw"
        width={0}
        height={0}
        style={{ width: "100%", height: "auto" }}
      />
      {caption && <Typography textAlign="center">{caption}</Typography>}
    </Box>
  );
}
