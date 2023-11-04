import { Document } from "@contentful/rich-text-types";
import type { Asset, Entry, EntryFields } from "contentful";
import {
  deserializeAuthor,
  type TypeComponentAuthor,
  type TypeComponentAuthorEntry,
} from "./TypeComponentAuthor";
import {
  deserializeSeo,
  type TypeComponentSeo,
  type TypeComponentSeoEntry,
} from "./TypeComponentSeo";
import {
  deserializeTag,
  type TypeComponentTag,
  type TypeComponentTagEntry,
} from "./TypeComponentTag";
import {
  TypeComponentSeries,
  TypeComponentSeriesEntry,
  deserializeSeries,
} from "./TypeComponentSeries";

export interface TypePageBlogPost {
  internalName: string;
  slug: string;
  title: string;
  shortDescription?: string;
  author: TypeComponentAuthor;
  showTableOfContents: boolean;
  series?: TypeComponentSeries;
  tags: TypeComponentTag[];
  publishedDate: string;
  content: Document;
  featuredImage: Asset;
  showFeaturedImage: boolean;
  seoFields: TypeComponentSeo;
}

export interface TypePageBlogPostFields {
  internalName: EntryFields.Text;
  slug: EntryFields.Text;
  title: EntryFields.Text;
  shortDescription?: EntryFields.Text;
  author: TypeComponentAuthorEntry;
  showTableOfContents: EntryFields.Boolean;
  series?: TypeComponentSeriesEntry;
  tags?: TypeComponentTagEntry[];
  publishedDate: EntryFields.Date;
  content: EntryFields.RichText;
  featuredImage: Asset;
  showFeaturedImage: EntryFields.Boolean;
  seoFields: TypeComponentSeoEntry;
}

export type TypePageBlogPostSkeleton = {
  fields: TypePageBlogPostFields;
  contentTypeId: "pageBlogPost";
};

export type TypePageBlogPostEntry = Entry<
  TypePageBlogPostSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  "en_US"
>;

export const deserializeBlogPost = (props: any): TypePageBlogPost =>
  props
    ? {
        ...props.fields,
        author: props.fields.author
          ? deserializeAuthor(props.fields.author)
          : undefined,
        series: props.fields.series
          ? deserializeSeries(props.fields.series)
          : undefined,
        tags: props.fields.tags
          ? props.fields.tags.map((tag: any) => deserializeTag(tag))
          : [],
        seoFields: props.fields.seoFields
          ? deserializeSeo(props.fields.seoFields)
          : undefined,
      }
    : undefined;
