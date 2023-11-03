import NextImage, { ImageProps } from "next/image";
import { Stack, StackProps } from "@mui/joy";

export default function Image({
  stackProps: { sx = {}, ...stackProps } = { sx: {} },
  sizes = "100vw",
  fill = false,
  width = 0,
  height = 0,
  style = {},
  ...imageProps
}: ImageProps & { stackProps?: StackProps }) {
  return (
    <Stack sx={{ overflow: "hidden", borderRadius: 8, ...sx }} {...stackProps}>
      <NextImage
        sizes={sizes}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        style={{
          width: width ? width : "100%",
          height: fill ? undefined : "auto",
          ...style,
        }}
        fill={fill}
        {...imageProps}
      />
    </Stack>
  );
}
