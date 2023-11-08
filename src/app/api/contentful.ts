import { createClient } from "contentful";
import { Metadata } from "next";
import { formatISO } from "date-fns";
import {
  TypePageBlogPost,
  TypePageBlogPostSkeleton,
  deserializeBlogPost,
} from "./contentful/types/TypePageBlogPost";
import {
  TypeComponentSocialMediaBlockSkeleton,
  deserializeSocialMediaBlock,
} from "./contentful/types/TypeComponentSocialMediaBlock";
import { TypeComponentSeo, TypeComponentAuthor } from "./contentful/types";
import { calculateReadLength } from "../util/contentful";
import {
  TypeComponentTagSkeleton,
  deserializeTag,
} from "./contentful/types/TypeComponentTag";
import {
  TypeComponentSeriesSkeleton,
  deserializeSeries,
} from "./contentful/types/TypeComponentSeries";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
});

type DateType = `${number}-${number}-${number}T${number}:${number}:${number}Z`;

const getReadLength = (post: TypePageBlogPost | undefined) =>
  post ? Math.max(Math.floor(calculateReadLength(post.content)), 1) : 0;

export const getBlogPosts = async (limit = 10, page = 1) => {
  const response = await client.getEntries<TypePageBlogPostSkeleton>({
    content_type: "pageBlogPost",
    order: ["-fields.publishedDate"],
    "fields.publishedDate[lt]": formatISO(new Date()) as DateType,
    limit,
    include: 1,
    skip: (page - 1) * limit,
  } as any);
  delete response.includes;
  return {
    ...response,
    items: response.items.map((item) => {
      const { content, featuredImage, ...deserialized } =
        deserializeBlogPost(item);
      return {
        ...deserialized,
        readLength: getReadLength({ content, featuredImage, ...deserialized }),
      };
    }),
  };
};

export const getAllBlogPosts = async () => {
  const response = await client.getEntries<TypePageBlogPostSkeleton>({
    content_type: "pageBlogPost",
    order: ["-fields.publishedDate"],
    "fields.publishedDate[lt]": formatISO(new Date()) as DateType,
    include: 1,
  } as any);
  delete response.includes;
  return {
    ...response,
    items: response.items.map((item) => deserializeBlogPost(item)),
  };
};

export const getSocials = async () => {
  const response =
    await client.getEntries<TypeComponentSocialMediaBlockSkeleton>({
      content_type: "componentSocialMediaBlock",
      "fields.internalName[match]": "social media block - default",
    } as any);
  const [socials] = response.items;
  return deserializeSocialMediaBlock(socials);
};

export const getBlogPostBySlug = async (slug: string) => {
  const response = await client.getEntries<TypePageBlogPostSkeleton>({
    content_type: "pageBlogPost",
    "fields.slug[match]": slug,
    "fields.publishedDate[lt]": formatISO(new Date()) as DateType,
    include: 10,
  } as any);
  const [item] = response.items.filter(
    (item) => (item.fields.slug as string).toLowerCase() === slug.toLowerCase()
  );
  const deserialized = deserializeBlogPost(item);
  return {
    ...deserialized,
    readLength: getReadLength(deserialized),
  };
};

export const getBlogPostsByTagId = async (
  tagId: string,
  limit = 10,
  page = 1
) => {
  const response = await client.getEntries<TypePageBlogPostSkeleton>({
    content_type: "pageBlogPost",
    links_to_entry: tagId,
    order: ["-fields.publishedDate"],
    "fields.publishedDate[lt]": formatISO(new Date()) as DateType,
    limit,
    skip: (page - 1) * limit,
    include: 1,
  } as any);
  delete response.includes;
  return {
    ...response,
    items: response.items.map((item) => {
      const { content, featuredImage, ...deserialized } =
        deserializeBlogPost(item);
      return {
        ...deserialized,
        readLength: getReadLength({ content, featuredImage, ...deserialized }),
      };
    }),
  };
};

export const getTags = async () => {
  const response = await client.getEntries<TypeComponentTagSkeleton>({
    content_type: "componentTag",
    order: ["fields.name"],
  } as any);
  delete response.includes;
  return {
    ...response,
    items: response.items.map((item) => {
      const { internalName, ...deserialized } = deserializeTag(item);
      return deserialized;
    }),
  };
};

export const getTag = async (tag: string) => {
  const response = await client.getEntries<TypeComponentTagSkeleton>({
    content_type: "componentTag",
    "fields.name[match]": tag,
  } as any);
  const [item] = response.items.filter(
    (item) => (item.fields.name as string).toLowerCase() === tag.toLowerCase()
  );
  if (!item) {
    return undefined;
  }
  return { ...deserializeTag(item), id: item.sys.id };
};

export const getSeries = async () => {
  const response = await client.getEntries<TypeComponentSeriesSkeleton>({
    content_type: "componentSeries",
    order: ["fields.name"],
  } as any);
  delete response.includes;
  return {
    ...response,
    items: response.items.map((item) => {
      const { internalName, ...deserialized } = deserializeSeries(item);
      return deserialized;
    }),
  };
};

export const getSeriesItem = async (series: string) => {
  const response = await client.getEntries<TypeComponentSeriesSkeleton>({
    content_type: "componentSeries",
    "fields.name[match]": series,
  } as any);
  const [item] = response.items.filter(
    (item) =>
      (item.fields.name as string).toLowerCase() === series.toLowerCase()
  );
  if (!item) {
    return undefined;
  }
  return { ...deserializeSeries(item), id: item.sys.id };
};

export const getBlogPostsBySeriesId = async (
  seriesId: string,
  limit = 10,
  page = 1
) => {
  const response = await client.getEntries<TypePageBlogPostSkeleton>({
    content_type: "pageBlogPost",
    links_to_entry: seriesId,
    order: ["-fields.publishedDate"],
    "fields.publishedDate[lt]": formatISO(new Date()) as DateType,
    limit,
    skip: (page - 1) * limit,
    include: 1,
  } as any);
  delete response.includes;
  return {
    ...response,
    items: response.items.map((item) => {
      const { content, featuredImage, ...deserialized } =
        deserializeBlogPost(item);
      return {
        ...deserialized,
        readLength: getReadLength({ content, featuredImage, ...deserialized }),
      };
    }),
  };
};

export const getSurroundingBlogPosts = async (publishedDate: DateType) => {
  const [nextResponse, previousResponse] = await Promise.all([
    client.getEntries<TypePageBlogPostSkeleton>({
      content_type: "pageBlogPost",
      "fields.publishedDate[gt]": publishedDate,
      "fields.publishedDate[lt]": formatISO(new Date()) as DateType,
      order: ["-fields.publishedDate"],
      select: ["fields.slug", "fields.title"],
      limit: 1,
    } as any),
    client.getEntries<TypePageBlogPostSkeleton>({
      content_type: "pageBlogPost",
      "fields.publishedDate[lt]": publishedDate,
      order: ["-fields.publishedDate"],
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
