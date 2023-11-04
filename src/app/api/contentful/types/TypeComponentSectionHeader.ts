import type { Entry, EntryFields } from "contentful";

export interface TypeComponentSectionHeader {
  internalName: string;
  title: string;
  tableOfContentsTitle?: string;
}

export interface TypeComponentSectionHeaderFields {
  internalName: EntryFields.Text;
  title: EntryFields.Text;
  tableOfContentsTitle?: EntryFields.Text;
}

export type TypeComponentSectionHeaderSkeleton = {
  fields: TypeComponentSectionHeaderFields;
  contentTypeId: "componentSectionHeader";
};

export type TypeComponentSectionHeaderEntry = Entry<
  TypeComponentSectionHeaderSkeleton,
  undefined,
  string
>;

export const deserializeSectionHeader = (
  props: TypeComponentSectionHeaderEntry
): TypeComponentSectionHeader => ({ ...props.fields });
