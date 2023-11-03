"use client";
import { Stack, useTheme } from "@mui/joy";
import Header from "./Header";
import Footer from "./Footer";
import { SocialMediaSkeleton } from "../api/contentful";
import { ReactNode } from "react";

export default function ContentRoot({
  socials,
  children,
}: {
  socials: SocialMediaSkeleton["fields"];
  children: ReactNode;
}) {
  const theme = useTheme();
  return (
    <Stack
      zIndex={2}
      width="100%"
      height="100%"
      maxWidth={1200}
      mx={2}
      my={4}
      sx={{
        [theme.breakpoints.down("md")]: {
          px: 6,
        },
        [theme.breakpoints.down("sm")]: {
          px: 4,
        },
      }}
    >
      <Header mb={12} socials={socials} />
      <main>{children}</main>
      <Footer mt={30} />
    </Stack>
  );
}
