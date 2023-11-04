import type { Entry, EntryFields } from "contentful";

type CodeLanguages =
  | "bash"
  | "c"
  | "clojure"
  | "cpp"
  | "csharp"
  | "dart"
  | "elixir"
  | "elm"
  | "erlang"
  | "fsharp"
  | "go"
  | "graphql"
  | "groovy"
  | "haskell"
  | "html"
  | "java"
  | "javascript"
  | "jsx"
  | "julia"
  | "kotlin"
  | "lisp"
  | "makefile"
  | "matlab"
  | "objectivec"
  | "ocaml"
  | "php"
  | "python"
  | "r"
  | "ruby"
  | "rust"
  | "scala"
  | "sql"
  | "swift"
  | "tsx"
  | "typescript";

export interface TypeCode {
  text: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  language: CodeLanguages;
  wordWrap?: boolean;
}

export interface TypeCodeFields {
  text: EntryFields.Text;
  showLineNumbers?: EntryFields.Boolean;
  showCopyButton?: EntryFields.Boolean;
  language: CodeLanguages;
  wordWrap?: EntryFields.Boolean;
}

export type TypeCodeSkeleton = {
  fields: TypeCodeFields;
  contentTypeId: "componentCode";
};

export type TypeCodeEntry = Entry<TypeCodeSkeleton, undefined, string>;

export const deserializeCode = (props: TypeCodeEntry): TypeCode => ({
  ...props.fields,
});
