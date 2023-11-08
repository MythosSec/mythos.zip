"use client";
import { Stack, styled } from "@mui/joy";
import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";
import Canvas from "./Canvas";
import ScrollProgress from "./ScrollProgress";
import { TypeComponentSocials } from "../api/contentful/types";
import ClientOnly from "./ClientOnly";

const Main = styled("main")`
  flex: 1;
`;

export default function ContentRoot({
  socials,
  children,
}: {
  socials: TypeComponentSocials[];
  children: ReactNode;
}) {
  return (
    <Stack
      zIndex={2}
      width="100%"
      height="100%"
      maxWidth={1200}
      minHeight="100vh"
      pl={4}
      pr={6}
      my={4}
      sx={(theme) => ({
        [theme.breakpoints.down("md")]: {
          pl: 6,
          pr: 8,
        },
        [theme.breakpoints.down("sm")]: {
          pl: 4,
          pr: 6,
        },
      })}
    >
      <Stack zIndex={2} flex={1}>
        <Header mb={12} socials={socials} />
        <Main>
          <ScrollProgress />
          {children}
        </Main>
        <Footer pt={10} mt={30} mb={8} />
      </Stack>
      <ClientOnly>
        <Canvas />
      </ClientOnly>
    </Stack>
  );
}
