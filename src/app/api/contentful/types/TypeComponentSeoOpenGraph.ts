import type { Entry, EntryFields } from "contentful";

export interface TypeComponentSeoOpenGraph {
  internalName: string;
  title: string;
  description: string;
  siteName: string;
}

export interface TypeComponentSeoOpenGraphFields {
  internalName: EntryFields.Text;
  title: EntryFields.Text;
  description: EntryFields.Text;
  siteName: EntryFields.Text;
}

export type TypeComponentSeoOpenGraphSkeleton = {
  fields: TypeComponentSeoOpenGraphFields;
  contentTypeId: "componentSeoOpenGraph";
};

export type TypeComponentSeoOpenGraphEntry = Entry<
  TypeComponentSeoOpenGraphSkeleton,
  undefined,
  string
>;

export const deserializeSeoOpenGraph = (
  props: TypeComponentSeoOpenGraphEntry
): TypeComponentSeoOpenGraph => ({
  ...props.fields,
});
