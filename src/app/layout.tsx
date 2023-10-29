import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import ThemeRegistry from "./ThemeRegistry";
import Canvas from "./components/Canvas";
import { Stack } from "@mui/joy";
import Header from "./components/Header";
import clsx from "clsx";

const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const display = localFont({
  src: "../../public/Bagotalos.woff2",
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "MythosSec",
  description: "MythosSec",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(body.className, display.variable)}>
        <ThemeRegistry options={{ key: "joy" }}>
          <Stack
            position="relative"
            justifyContent="center"
            alignContent="center"
            flexDirection="row"
          >
            <Canvas />
            <Stack
              zIndex={2}
              width="100%"
              height="100%"
              maxWidth={1200}
              mx={2}
              my={4}
            >
              <Header mb={4} />
              <main>{children}</main>
            </Stack>
          </Stack>
        </ThemeRegistry>
      </body>
    </html>
  );
}
