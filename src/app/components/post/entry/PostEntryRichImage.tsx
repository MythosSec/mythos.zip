import { Box, Typography } from "@mui/joy";
import { IComponentRichImageFields } from "../../../../../types/contentful";
import { AssetFile } from "contentful";
import Image from "../../Image";

export default function PostEntryRichImage({
  image,
  caption,
}: IComponentRichImageFields) {
  const { title } = image.fields;
  const { url, details } = image.fields.file as AssetFile;
  const hasDetails = details?.image?.width && details?.image?.height;
  return (
    <Box flexDirection="row" position="relative" width="100%">
      <Image src={`https:${url}`} alt={title as string} />
      {caption && (
        <Typography textAlign="center" mt={2}>
          {caption}
        </Typography>
      )}
    </Box>
  );
}
