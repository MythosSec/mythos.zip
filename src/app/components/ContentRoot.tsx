"use client";
import { Stack, useTheme } from "@mui/joy";
import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";
import { TypeComponentSocials } from "../api/contentful/types";

export default function ContentRoot({
  socials,
  children,
}: {
  socials: TypeComponentSocials[];
  children: ReactNode;
}) {
  const theme = useTheme();
  return (
    <Stack
      zIndex={2}
      width="100%"
      height="100%"
      maxWidth={1200}
      pl={4}
      pr={6}
      my={4}
      sx={{
        [theme.breakpoints.down("md")]: {
          pl: 6,
          pr: 8,
        },
        [theme.breakpoints.down("sm")]: {
          pl: 4,
          pr: 6,
        },
      }}
    >
      <Header mb={12} socials={socials} />
      <main>{children}</main>
      <Footer pt={10} mt={30} mb={8} />
    </Stack>
  );
}
