import type { Entry, EntryFields } from "contentful";

export interface TypeComponentSeries {
  internalName: string;
  name: string;
}

export interface TypeComponentSeriesFields {
  internalName: EntryFields.Text;
  name: EntryFields.Text;
}

export type TypeComponentSeriesSkeleton = {
  fields: TypeComponentSeriesFields;
  contentTypeId: "componentSeries";
};

export type TypeComponentSeriesEntry = Entry<
  TypeComponentSeriesSkeleton,
  undefined,
  string
>;

export const deserializeSeries = (
  props: TypeComponentSeriesEntry
): TypeComponentSeries => ({
  ...props.fields,
});
