import type { Entry, EntryFields, EntrySkeletonType } from "contentful";
import type {
  TypeComponentSocials,
  TypeComponentSocialsEntry,
} from "./TypeComponentSocials";

export interface TypeComponentSocialMediaBlock {
  internalName: string;
  name: string;
  fields: TypeComponentSocials[];
}

export interface TypeComponentSocialMediaBlockFields {
  internalName: EntryFields.Text;
  name: EntryFields.Text;
  fields: TypeComponentSocialsEntry[];
}

export type TypeComponentSocialMediaBlockSkeleton = EntrySkeletonType<
  TypeComponentSocialMediaBlockFields,
  "componentSocialMediaBlock"
>;

export type TypeComponentSocialMediaBlockEntry = Entry<
  TypeComponentSocialMediaBlockSkeleton,
  undefined,
  string
>;

export const deserializeSocialMediaBlock = (
  props: any
): TypeComponentSocialMediaBlock["fields"] =>
  props.fields.fields.map((prop: any) => prop.fields);
