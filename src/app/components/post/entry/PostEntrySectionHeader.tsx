"use client";
import { Typography } from "@mui/joy";
import { IComponentSectionHeaderFields } from "../../../../../types/contentful";
import { encodeClassName } from "@/app/util/string";
import { useContext, useEffect, useRef } from "react";
import PostContext from "../usePostContext";

export default function PostEntrySectionHeader({
  title,
}: IComponentSectionHeaderFields) {
  const { addRef } = useContext(PostContext);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (ref.current && addRef) {
      addRef(title, ref);
    }
  }, [ref, addRef, title]);

  return (
    <Typography
      ref={ref}
      level="h4"
      sx={{ "&:first-of-type": { mt: 0 } }}
      mt={8}
      mb={2}
      id={`#${encodeClassName(title)}`}
    >
      {title}
    </Typography>
  );
}
