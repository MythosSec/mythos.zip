import type { Entry, EntryFields } from "contentful";
import type {
  TypeComponentSeo,
  TypeComponentSeoFields,
} from "./TypeComponentSeo";
import type {
  TypePageBlogPost,
  TypePageBlogPostFields,
} from "./TypePageBlogPost";

export interface TypePageLanding {
  internalName: string;
  seoFields?: TypeComponentSeo;
  featuredBlogPost?: TypePageBlogPost;
}

export interface TypePageLandingFields {
  internalName: EntryFields.Text;
  seoFields?: TypeComponentSeoFields;
  featuredBlogPost?: TypePageBlogPostFields;
}

export type TypePageLandingSkeleton = {
  fields: TypePageLandingFields;
  contentTypeId: "pageLanding";
};

export type TypePageLandingEntry = Entry<
  TypePageLandingSkeleton,
  undefined,
  string
>;

export const deserializeLanding = (
  props: TypePageLandingEntry
): TypePageLanding => ({
  ...props.fields,
});
