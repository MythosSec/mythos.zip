import { extendTheme } from "@mui/joy";
import Link from "./components/Link";

const Theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          "50": "#f5f3ff",
          "100": "#ede9fe",
          "200": "#ddd6fe",
          "300": "#c4b5fd",
          "400": "#a78bfa",
          "500": "#8b5cf6",
          "600": "#7c3aed",
          "700": "#6d28d9",
          "800": "#5b21b6",
          "900": "#4c1d95",
        },
        text: {
          primary: "var(--joy-palette-common-white)",
          secondary: "var(--joy-palette-common-white)",
        },
      },
    },
    light: {
      palette: {
        primary: {
          "50": "#f5f3ff",
          "100": "#ede9fe",
          "200": "#ddd6fe",
          "300": "#c4b5fd",
          "400": "#a78bfa",
          "500": "#8b5cf6",
          "600": "#7c3aed",
          "700": "#6d28d9",
          "800": "#5b21b6",
          "900": "#4c1d95",
        },
        text: {
          secondary: "var(--joy-palette-neutral-800)",
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: "4rem",
    },
    h2: {
      fontSize: "3.3rem",
    },
    h3: {
      fontSize: "2.5rem",
    },
    h4: {
      fontSize: "2rem",
    },
    "body-sm": {
      fontSize: "var(--joy-fontSize-lg, 1.125rem)",
      lineHeight: "var(--joy-lineHeight-lg, 1.5)",
      color: "var(--joy-palette-text-primary)",
    },
    "body-md": {
      fontSize: "var(--joy-fontSize-xl, 1.25rem)",
      lineHeight: "var(--joy-lineHeight-lg, 1.55556)",
    },
    "body-lg": {
      fontSize: "var(--joy-fontSize-xl2, 1.5rem)",
      lineHeight: "var(--joy-lineHeight-lg, 1.66667)",
    },
  },
  fontFamily: {
    body: "var(--font-body)",
    display: "var(--font-display)",
    code: "var(--font-monospace)",
  },
  components: {
    JoyLink: {
      defaultProps: {
        component: Link(),
        underline: "none",
        textColor: "text.primary",
      },
    },
    JoySwitch: {
      styleOverrides: {
        track: {
          background: "transparent",
          border: `1px solid var(--joy-palette-text-primary)`,
        },
        thumb: {
          background: "var(--joy-palette-text-primary)",
        },
      },
    },
    JoyButton: {
      styleOverrides: {
        root: {
          background: "transparent",
          color: "var(--joy-palette-text-primary)",
          border: `1px solid var(--joy-palette-text-primary)`,
          "&:hover": {
            background: "transparent",
          },
        },
      },
    },
  },
});

export default Theme;
