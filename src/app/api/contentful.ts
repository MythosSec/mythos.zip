import { createClient } from "contentful";
import { Metadata } from "next";
import { formatISO } from "date-fns";
import {
  TypePageBlogPostSkeleton,
  deserializeBlogPost,
} from "./contentful/types/TypePageBlogPost";
import {
  TypeComponentSocialMediaBlockSkeleton,
  deserializeSocialMediaBlock,
} from "./contentful/types/TypeComponentSocialMediaBlock";
import { TypeComponentSeo, TypeComponentAuthor } from "./contentful/types";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
});

type DateType = `${number}-${number}-${number}T${number}:${number}:${number}Z`;

export const getBlogPosts = () =>
  client.getEntries<TypePageBlogPostSkeleton>({
    content_type: "pageBlogPost",
  });

export const getSocials = async () => {
  const response =
    await client.getEntries<TypeComponentSocialMediaBlockSkeleton>({
      content_type: "componentSocialMediaBlock",
      "fields.internalName[match]": "social media block - default",
    } as any);
  const [socials] = response.items;
  return deserializeSocialMediaBlock(socials);
};

export const getBlogPost = (entryId: string) =>
  client.getEntry<TypePageBlogPostSkeleton>(entryId);

export const getBlogPostBySlug = async (slug: string) => {
  const response = await client.getEntries<TypePageBlogPostSkeleton>({
    content_type: "pageBlogPost",
    "fields.slug[match]": slug,
    "fields.publishedDate[lt]": formatISO(new Date()) as DateType,
    include: 10,
  } as any);
  const [item] = response.items.filter((item) => item.fields.slug === slug);
  return deserializeBlogPost(item);
};

export const getSurroundingBlogPosts = async (publishedDate: DateType) => {
  const [nextResponse, previousResponse] = await Promise.all([
    client.getEntries<TypePageBlogPostSkeleton>({
      content_type: "pageBlogPost",
      "fields.publishedDate[gt]": publishedDate,
      "fields.publishedDate[lt]": formatISO(new Date()) as DateType,
      select: ["fields.slug", "fields.title"],
      limit: 1,
    } as any),
    client.getEntries<TypePageBlogPostSkeleton>({
      content_type: "pageBlogPost",
      "fields.publishedDate[lt]": publishedDate,
      select: ["fields.slug", "fields.title"],
      limit: 1,
    } as any),
  ]);
  const [next] = nextResponse.items;
  const [previous] = previousResponse.items;
  return {
    next: deserializeBlogPost(next),
    previous: deserializeBlogPost(previous),
  };
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
  name: author,
}: TypeComponentSeo & TypeComponentAuthor & { locale?: string }): Metadata => ({
  title: pageTitle,
  description: pageDescription,
  applicationName,
  referrer,
  authors: [{ name: author }],
  keywords,
  creator,
  publisher,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: robots.index,
    follow: robots.follow,
    nocache: !robots.cache,
    googleBot: {
      index: robots.index,
      follow: robots.follow,
      "max-image-preview": robots.maxImagePreview,
    },
  },
  twitter: {
    title: twitter.title,
    description: twitter.description,
    siteId: twitter.siteId,
    creator: twitter.creator,
    creatorId: twitter.creatorId,
    card: twitter.card,
  },
  openGraph: {
    title: openGraph.title,
    description: openGraph.description,
    siteName: openGraph.siteName,
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
