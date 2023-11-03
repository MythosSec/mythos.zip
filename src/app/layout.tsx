import type { Metadata } from "next";
import { Catamaran, Inconsolata } from "next/font/google";
import ThemeRegistry from "./ThemeRegistry";
import Canvas from "./components/Canvas";
import { Stack } from "@mui/joy";
import Header from "./components/Header";
import clsx from "clsx";
import Footer from "./components/Footer";
import { getSocials } from "./api/contentful";

// inspiration
// https://www.awwwards.com/inspiration/blog-blog-blog-mohamed-essam-portfolio
// https://www.thepoorcoder.com/how-to-make-nextjs-image-component-responsive/

const body = Catamaran({ variable: "--font-body", subsets: ["latin"] });
const display = body;
const monospace = Inconsolata({
  variable: "--font-monospace",
  subsets: ["latin"],
  weight: "600",
});

export const metadata: Metadata = {
  title: "MythosSec",
  description: "MythosSec",
  applicationName: "Mythos",
  authors: [{ name: "Mythos" }],
  creator: "Mythos",
  manifest: "/site.webmanifest",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
    shortcut: ["/apple-touch-icon.png"],
    other: [
      {
        rel: "icon",
        type: "image/png",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/mstile-150x150.png",
        sizes: "150x150",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/favicon-32x32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/favicon-16x16.png",
        sizes: "16x16",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const socials = await getSocials();
  return (
    <html lang="en">
      <body
        className={clsx(body.variable, display.variable, monospace.variable)}
      >
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
              <Header mb={12} socials={socials.fields} />
              <main>{children}</main>
              <Footer mt={30} />
            </Stack>
          </Stack>
        </ThemeRegistry>
      </body>
    </html>
  );
}
