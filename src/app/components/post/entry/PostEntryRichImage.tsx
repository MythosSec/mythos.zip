import { Box, Typography } from "@mui/joy";
import { AssetFile } from "contentful";
import Image from "../../Image";
import { TypeComponentRichImage } from "@/app/api/contentful/types";

export default function PostEntryRichImage({
  image,
  caption,
}: TypeComponentRichImage) {
  const { title } = image.fields;
  const { url, details } = image.fields.file as AssetFile;
  const hasDetails = details?.image?.width && details?.image?.height;
  return (
    <Box flexDirection="row" position="relative" width="calc(100%-64px)" mx={4}>
      <Image src={`https:${url}`} alt={title as string} />
      {caption && (
        <Typography textAlign="center" mt={2}>
          {caption}
        </Typography>
      )}
    </Box>
  );
}
