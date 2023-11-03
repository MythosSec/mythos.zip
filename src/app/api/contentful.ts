import { createClient } from "contentful";
import {
  IPageBlogPostFields,
  IComponentSeoFields,
  IComponentSocialMediaBlockFields,
} from "../../../types/contentful";
import { Metadata } from "next";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
});

export interface BlogPostSkeleton {
  contentTypeId: "pageBlogPost";
  fields: IPageBlogPostFields;
}

export interface SocialMediaSkeleton {
  contentTypeId: "componentSocialMediaBlock";
  fields: IComponentSocialMediaBlockFields;
}

export const getBlogPosts = () =>
  client.getEntries<BlogPostSkeleton>({
    content_type: "pageBlogPost",
  });

export const getSocials = async () => {
  const response = await client.getEntries<SocialMediaSkeleton>({
    content_type: "componentSocialMediaBlock",
    "fields.internalName[match]": "social media block - default",
  });
  const [socials] = response.items;
  return socials;
};

export const getBlogPost = (entryId: string) =>
  client.getEntry<BlogPostSkeleton>(entryId);

export const getBlogPostBySlug = async (slug: string) => {
  const response = await client.getEntries<BlogPostSkeleton>({
    content_type: "pageBlogPost",
    "fields.slug[match]": slug,
    include: 10,
  });
  const [item] = response.items.filter((item) => item.fields.slug === slug);
  return item;
};

export const parseMetadata = ({
  locale = "en_US",
  pageTitle,
  pageDescription,
  applicationName,
  referrer,
  keywords,
  creator,
  publisher,
  twitter,
  openGraph,
  robots,
}: IComponentSeoFields & { locale?: string }): Metadata => ({
  title: pageTitle,
  description: pageDescription,
  applicationName,
  referrer,
  keywords,
  creator,
  publisher,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: (robots.fields as any).index,
    follow: (robots.fields as any).follow,
    nocache: !(robots.fields as any).cache,
    googleBot: {
      index: (robots.fields as any).index,
      follow: (robots.fields as any).follow,
      "max-image-preview": (robots.fields as any).maxImagePreview,
    },
  },
  twitter: {
    title: (twitter.fields as any).title,
    description: (twitter.fields as any).description,
    siteId: (twitter.fields as any).siteId,
    creator: (twitter.fields as any).creator,
    creatorId: (twitter.fields as any).creatorId,
    card: (twitter.fields as any).card,
  },
  openGraph: {
    title: (openGraph.fields as any).title,
    description: (openGraph.fields as any).description,
    siteName: (openGraph.fields as any).siteName,
    locale,
    type: "website",
  },
  appLinks: {
    web: {
      url: `https://${process.env.DOMAIN}`,
      should_fallback: true,
    },
  },
});
