import React, { ReactNode } from "react";
import { Text, MARKS } from "@contentful/rich-text-types";
import { Typography } from "@mui/joy";

export default function PostContentTextNode({
  marks = [],
  value,
  depth = 0,
  nodeType,
}: Text & { depth?: number }) {
  let child: ReactNode = value;
  marks.forEach(({ type }) => {
    switch (type) {
      case MARKS.BOLD:
        child = <Typography fontWeight="bold">{child}</Typography>;
        break;
      case MARKS.ITALIC:
        child = <Typography fontStyle="italic">{child}</Typography>;
        break;
      case MARKS.SUBSCRIPT:
        child = <sub>{child}</sub>;
        break;
      case MARKS.SUPERSCRIPT:
        child = <sup>{child}</sup>;
        break;
      case MARKS.UNDERLINE:
        child = (
          <Typography sx={{ textDecoration: "underline" }}>{child}</Typography>
        );
        break;
    }
  });

  return child;
}
