"use client";
import { Sheet as JoySheet, SheetProps, useColorScheme } from "@mui/joy";

export default function Sheet({
  sx = {},
  variant = "glass",
  blur = 1.5,
  background = "light",
  ...props
}: Omit<SheetProps, "variant"> & {
  variant?: SheetProps["variant"] | "glass";
  blur?: number;
  background?: "dark" | "light";
}) {
  const { mode } = useColorScheme();
  if (variant === "glass" && mode === "dark") {
    return (
      <JoySheet
        sx={{
          background:
            background === "dark"
              ? "rgba(0, 0, 0, 0.05)"
              : "rgba(255,255,255, 0.02)",
          borderRadius: 8,
          boxShadow: "0 4px 30px rgba(0,0,0, 0.01)",
          backdropFilter: `blur(${blur}px)`,
          border: "1px solid rgba(255, 255, 255, 0.01)",
          ...sx,
        }}
        {...props}
      />
    );
  }

  return (
    <JoySheet
      sx={{ borderRadius: 8, ...sx }}
      variant={variant === "glass" ? "outlined" : variant}
      {...props}
    />
  );
}
