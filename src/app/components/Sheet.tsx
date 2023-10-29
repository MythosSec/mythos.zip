import { Sheet as JoySheet, SheetProps } from "@mui/joy";

export default function Sheet({
  sx = {},
  variant = "glass",
  ...props
}: Omit<SheetProps, "variant"> & {
  variant?: SheetProps["variant"] | "glass";
}) {
  if (variant === "glass") {
    return (
      <JoySheet
        sx={{
          background: "rgba(0, 0, 0, 0.05)",
          borderRadius: 4,
          boxShadow: "0 4px 30px rgba(0,0,0, 0.01)",
          backdropFilter: "blur(2px)",
          border: "1px solid rgba(255, 255, 255, 0.01)",
          ...sx,
        }}
        {...props}
      />
    );
  }

  return (
    <JoySheet sx={{ borderRadius: 4, ...sx }} variant={variant} {...props} />
  );
}
