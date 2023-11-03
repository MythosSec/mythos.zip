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
      color: "var(--joy-palette-text-primary)",
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
    JoyTypography: {
      styleOverrides: {
        root: {
          textShadow: "#000 0px 1px 1px",
        },
      },
    },
  },
});

export default Theme;
