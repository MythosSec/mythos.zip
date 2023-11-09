import type { Metadata, Viewport } from "next";
import { Catamaran, Inconsolata } from "next/font/google";
import ThemeRegistry from "./ThemeRegistry";
import { Stack } from "@mui/joy";
import clsx from "clsx";
import { getSocials } from "./api/contentful";
import ContentRoot from "./components/ContentRoot";

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

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "dark",
};

const title = "Mythos Security";
const description = "Mythos Security";
const author = "Mythos";

export const metadata: Metadata = {
  title: { default: title, template: `%s | ${title}` },
  metadataBase: new URL(`https://${process.env.DOMAIN}`),
  description,
  applicationName: title,
  authors: [{ name: author }],
  creator: author,
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
  twitter: {
    title,
    description,
    creator: "@MythosSec",
    card: "summary_large_image",
    images: ["/share.png"],
  },
  openGraph: {
    title,
    description,
    siteName: title,
    type: "website",
    images: ["/share.png"],
  },
  appLinks: {
    web: {
      url: `https://${process.env.DOMAIN}`,
      should_fallback: true,
    },
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
            sx={{
              "@media(max-width: 600px)": {
                overflow: "hidden",
              },
            }}
          >
            <ContentRoot socials={socials}>{children}</ContentRoot>
          </Stack>
        </ThemeRegistry>
      </body>
    </html>
  );
}
