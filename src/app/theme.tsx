"use client";
import { extendTheme } from "@mui/joy";
import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";

const LinkComponent = forwardRef<HTMLAnchorElement, LinkProps>(
  function LinkComponent(props, ref) {
    return <Link ref={ref} {...props} />;
  }
);

const theme = extendTheme({
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
      letterSpacing: 1,
    },
    h2: {
      fontSize: "3.3rem",
      letterSpacing: 1,
    },
    h3: {
      fontSize: "2.5rem",
      letterSpacing: 1,
    },
    h4: {
      fontSize: "2rem",
      letterSpacing: 1,
    },
  },
  fontFamily: {
    display: "var(--font-display)",
    code: "var(--font-monospace)",
  },
  components: {
    JoyLink: {
      defaultProps: {
        component: LinkComponent,
        underline: "none",
        textColor: "text.primary",
      },
      styleOverrides: {
        root: {
          "&:visited": {
            color: "inherit",
          },
        },
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

export default theme;
