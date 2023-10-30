"use client";
import { Box, BoxProps } from "@mui/joy";
import useScrollPercentage from "../hooks/useScrollPercentage";
import { useCallback } from "react";
import { documentHeight } from "../util/dom";

export default function ScrollProgress({
  color = "#fff",
  orientation = "vertical",
  size = 10,
  sx = {},
  ...props
}: Omit<BoxProps, "width" | "height"> & {
  orientation?: "vertical" | "horizontal";
  size?: number;
}) {
  const [progress, remaining] = useScrollPercentage();
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
        <Box
          width={size}
          height="100%"
          top={progressPct}
          position="absolute"
          sx={{
            background: color,
            transform: "scaleY(-1)",
          }}
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
      <Box
        height={size}
        width={progressPct}
        sx={{
          background: color,
          transform: "scaleY(-1)",
        }}
      />
    </Box>
  );
}
