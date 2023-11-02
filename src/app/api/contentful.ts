import { createClient } from "contentful";
import {
  IPageBlogPostFields,
  IComponentSeoFields,
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

export const getBlogPosts = () =>
  client.getEntries<BlogPostSkeleton>({
    content_type: "pageBlogPost",
  });

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
    index: robots.fields.index,
    follow: robots.fields.follow,
    nocache: !robots.fields.cache,
    googleBot: {
      index: robots.fields.index,
      follow: robots.fields.follow,
      "max-image-preview": robots.fields.maxImagePreview,
    },
  },
  twitter: {
    title: twitter.fields.title,
    description: twitter.fields.description,
    siteId: twitter.fields.siteId,
    creator: twitter.fields.creator,
    creatorId: twitter.fields.creatorId,
    card: twitter.fields.card,
  },
  openGraph: {
    title: openGraph.fields.title,
    description: openGraph.fields.description,
    siteName: openGraph.fields.siteName,
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
