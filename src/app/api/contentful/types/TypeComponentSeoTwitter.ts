import type { Entry, EntryFields } from "contentful";

export interface TypeComponentSeoTwitter {
  internalName: string;
  title: string;
  description: string;
  siteId?: string;
  creator?: string;
  creatorId?: string;
  card: "app" | "player" | "summary" | "summary_large_image";
}

export interface TypeComponentSeoTwitterFields {
  internalName: EntryFields.Text;
  title: EntryFields.Text;
  description: EntryFields.Text;
  siteId?: EntryFields.Text;
  creator?: EntryFields.Text;
  creatorId?: EntryFields.Text;
  card: "app" | "player" | "summary" | "summary_large_image";
}

export type TypeComponentSeoTwitterSkeleton = {
  fields: TypeComponentSeoTwitterFields;
  contentTypeId: "componentSeoTwitter";
};

export type TypeComponentSeoTwitterEntry = Entry<
  TypeComponentSeoTwitterSkeleton,
  undefined,
  string
>;

export const deserializeSeoTwitter = (
  props: TypeComponentSeoTwitterEntry
): TypeComponentSeoTwitter => ({
  ...props.fields,
});
