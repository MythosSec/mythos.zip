"use client";
import { Box, Typography, useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import { AssetFile } from "contentful";
import Image from "../../Image";
import { TypeComponentRichImage } from "@/app/api/contentful/types";

export default function PostEntryRichImage({
  image,
  caption,
}: TypeComponentRichImage) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const { title } = image.fields;
  const { url, details } = image.fields.file as AssetFile;
  return (
    <Box
      flexDirection="row"
      position="relative"
      width="calc(100%-64px)"
      mx={isSm ? 0 : 4}
    >
      <Image src={`https:${url}`} alt={title as string} />
      {caption && (
        <Typography textAlign="center" mt={2}>
          {caption}
        </Typography>
      )}
    </Box>
  );
}
