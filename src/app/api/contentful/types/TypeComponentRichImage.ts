import type { Asset, Entry, EntryFields } from "contentful";

export interface TypeComponentRichImage {
  internalName: string;
  image: Asset;
  caption?: string;
  fullWidth?: boolean;
}

export interface TypeComponentRichImageFields {
  internalName: EntryFields.Text;
  image: Asset;
  caption?: EntryFields.Text;
  fullWidth?: EntryFields.Boolean;
}

export type TypeComponentRichImageSkeleton = {
  fields: TypeComponentRichImageFields;
  contentTypeId: "componentRichImage";
};

export type TypeComponentRichImageEntry = Entry<
  TypeComponentRichImageSkeleton,
  undefined,
  string
>;

export const deserializeRichImage = (
  props: TypeComponentRichImageEntry
): TypeComponentRichImage => ({
  ...props.fields,
});
