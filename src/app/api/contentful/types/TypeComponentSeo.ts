import type { Entry, EntryFields } from "contentful";
import {
  TypeComponentSeoOpenGraph,
  TypeComponentSeoOpenGraphEntry,
  deserializeSeoOpenGraph,
} from "./TypeComponentSeoOpenGraph";
import {
  TypeComponentSeoRobots,
  TypeComponentSeoRobotsEntry,
  deserializeSeoRobots,
} from "./TypeComponentSeoRobots";
import {
  TypeComponentSeoTwitter,
  TypeComponentSeoTwitterEntry,
  deserializeSeoTwitter,
} from "./TypeComponentSeoTwitter";

export interface TypeComponentSeo {
  internalName: string;
  applicationName: string;
  pageTitle: string;
  pageDescription?: string;
  keywords: string[];
  referrer: "origin-when-cross-origin";
  creator: string;
  publisher: string;
  robots: TypeComponentSeoRobots;
  twitter: TypeComponentSeoTwitter;
  openGraph: TypeComponentSeoOpenGraph;
}

export interface TypeComponentSeoFields {
  internalName: EntryFields.Text;
  applicationName: EntryFields.Text;
  pageTitle: EntryFields.Text;
  pageDescription?: EntryFields.Text;
  keywords: EntryFields.Text[];
  referrer: "origin-when-cross-origin";
  creator: EntryFields.Text;
  publisher: EntryFields.Text;
  robots: TypeComponentSeoRobotsEntry;
  twitter: TypeComponentSeoTwitterEntry;
  openGraph: TypeComponentSeoOpenGraphEntry;
}

export type TypeComponentSeoSkeleton = {
  fields: TypeComponentSeoFields;
  contentTypeId: "componentSeo";
};

export type TypeComponentSeoEntry = Entry<
  TypeComponentSeoSkeleton,
  undefined,
  string
>;

export const deserializeSeo = (
  props: TypeComponentSeoEntry
): TypeComponentSeo => ({
  ...props.fields,
  robots: deserializeSeoRobots(props.fields.robots),
  twitter: deserializeSeoTwitter(props.fields.twitter),
  openGraph: deserializeSeoOpenGraph(props.fields.openGraph),
});
