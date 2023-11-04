import type { Entry, EntryFields } from "contentful";

export interface TypeComponentTag {
  internalName: string;
  name: string;
  internalOnly?: boolean;
}

export interface TypeComponentTagFields {
  internalName: EntryFields.Text;
  name: EntryFields.Text;
  internalOnly?: EntryFields.Boolean;
}

export type TypeComponentTagSkeleton = {
  fields: TypeComponentTagFields;
  contentTypeId: "componentTag";
};

export type TypeComponentTagEntry = Entry<
  TypeComponentTagSkeleton,
  undefined,
  string
>;

export const deserializeTag = (
  props: TypeComponentTagEntry
): TypeComponentTag => ({
  ...props.fields,
});
