import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeComponentAuthor {
  internalName: string;
  name: string;
  avatar?: Asset;
}

export interface TypeComponentAuthorFields {
  internalName: EntryFields.Text;
  name: EntryFields.Text;
  avatar?: Asset;
}

export interface TypeComponentAuthorSkeleton {
  contentTypeId: "componentAuthor";
  fields: TypeComponentAuthorFields;
}

export type TypeComponentAuthorEntry = Entry<
  TypeComponentAuthorSkeleton,
  undefined,
  string
>;

export const deserializeAuthor = (
  props: TypeComponentAuthorEntry
): TypeComponentAuthor => ({
  ...props.fields,
});
