import { extendTheme } from "@mui/joy";

const chakraTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: "#319795",
          solidHoverBg: "#2C7A7B",
          solidActiveBg: "#285E61",
          outlinedColor: "#2C7A7B",
          outlinedBorder: "#2C7A7B",
          outlinedHoverBorder: undefined,
          outlinedHoverBg: "#E6FFFA",
          outlinedActiveBg: "#B2F5EA",
        },
        focusVisible: "rgba(66, 153, 225, 0.6)",
      },
    },
  },
  focus: {
    default: {
      outlineWidth: "3px",
    },
  },
  fontFamily: {
    body: "Inter, var(--chakra-fontFamily-fallback)",
  },
});

export default chakraTheme;
