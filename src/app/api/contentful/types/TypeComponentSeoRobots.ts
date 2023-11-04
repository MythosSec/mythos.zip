import type { Entry, EntryFields } from "contentful";

export interface TypeComponentSeoRobots {
  internalName: string;
  follow: boolean;
  index: boolean;
  cache?: boolean;
  maxImagePreview: "large";
}

export interface TypeComponentSeoRobotsFields {
  internalName: EntryFields.Text;
  follow: EntryFields.Boolean;
  index: EntryFields.Boolean;
  cache?: EntryFields.Boolean;
  maxImagePreview: "large";
}

export type TypeComponentSeoRobotsSkeleton = {
  fields: TypeComponentSeoRobotsFields;
  contentTypeId: "componentSeoRobots";
};

export type TypeComponentSeoRobotsEntry = Entry<
  TypeComponentSeoRobotsSkeleton,
  undefined,
  string
>;

export const deserializeSeoRobots = (
  props: TypeComponentSeoRobotsEntry
): TypeComponentSeoRobots => ({
  ...props.fields,
});
