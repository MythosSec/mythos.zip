import type { Entry, EntryFields } from "contentful";

export interface TypeComponentSocials {
  internalName: EntryFields.Text;
  name: EntryFields.Text;
  enabled: EntryFields.Boolean;
  link: EntryFields.Text;
}

export interface TypeComponentSocialsFields {
  internalName: EntryFields.Text;
  name: EntryFields.Text;
  enabled: EntryFields.Boolean;
  link: EntryFields.Text;
}

export type TypeComponentSocialsSkeleton = {
  fields: TypeComponentSocialsFields;
  contentTypeId: "componentSocials";
};

export type TypeComponentSocialsEntry = Entry<
  TypeComponentSocialsSkeleton,
  undefined,
  string
>;

export const deserializeSocials = (
  props: TypeComponentSocialsEntry
): TypeComponentSocials => ({
  ...props.fields,
});
