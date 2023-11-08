"use client";
import { Box, BoxProps } from "@mui/joy";
import useScrollPercentage from "../hooks/useScrollPercentage";
import { useCallback, useEffect, useState } from "react";
import { documentHeight } from "../util/dom";
import Sheet from "./Sheet";
import { useWindowSize } from "@uidotdev/usehooks";
import useDocumentSize from "../hooks/useDocumentSize";

export default function ScrollProgress({
  orientation = "vertical",
  size = 14,
  sx = {},
  ...props
}: Omit<BoxProps, "width" | "height"> & {
  orientation?: "vertical" | "horizontal";
  size?: number;
}) {
  const [show, setShow] = useState(false);
  const [progress] = useScrollPercentage();
  const { height } = useWindowSize();
  const { height: docHeight } = useDocumentSize();

  useEffect(() => {
    if (height && docHeight) {
      setShow(docHeight > height);
    }
  }, [height, docHeight]);

  const progressPct = `${progress}%`;
  const onClick = useCallback((event: React.MouseEvent) => {
    if (event.button !== 0) {
      return;
    }
    if (orientation === "vertical") {
      window.scrollTo({
        top:
          (documentHeight() - window.innerHeight) *
          (event.clientY / window.innerHeight),
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top:
          (documentHeight() - window.innerHeight) *
          (event.clientX / window.innerWidth),
        behavior: "smooth",
      });
    }
  }, []);

  if (!show) {
    return null;
  }

  if (orientation === "vertical") {
    return (
      <Box
        position="fixed"
        top={0}
        right={0}
        width={size}
        height="100%"
        zIndex={100}
        sx={{
          cursor: "pointer",
          ...sx,
        }}
        {...props}
        onMouseDown={onClick}
      >
        <Sheet
          variant="glass"
          sx={{ height: "100%", width: size, borderRadius: 0 }}
          background="light"
        />
        <Box
          width={size}
          height="100%"
          top={progressPct}
          position="absolute"
          sx={(theme) => ({
            background: theme.palette.text.primary,
            transform: "scaleY(-1)",
          })}
        />
      </Box>
    );
  }

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      height={size}
      zIndex={100}
      width="100%"
      sx={{
        cursor: "pointer",
        ...sx,
      }}
      {...props}
      onMouseDown={onClick}
    >
      <Sheet
        variant="glass"
        sx={{ height: size, width: "100%", borderRadius: 0 }}
        background="light"
      />
      <Box
        height={size}
        width={progressPct}
        sx={(theme) => ({
          background: theme.palette.text.primary,
          transform: "scaleY(-1)",
        })}
      />
    </Box>
  );
}
